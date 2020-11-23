using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ElectronCgi.DotNet;
using Google.Cloud.Speech.V1;

namespace SpeechToText
{
    class Program
    {
        // Very top of the asyncronous call chain. Program begins here.
        static async Task Main(string[] args)
        {
            // Send API output to STDout.
            object res = await StreamingMicRecognizeAsync(60);
            Console.WriteLine(res);
        }

        static async Task<object> StreamingMicRecognizeAsync(int seconds)
        {
            // Verifies API credentials.
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", Path.GetFullPath("../../GoogleKey.json"));
            // Speech client.
            var speech = SpeechClient.Create();
            // Call to API.
            var streamingCall = speech.StreamingRecognize();
            // Write the initial request with the config.
            await streamingCall.WriteAsync(
                new StreamingRecognizeRequest()
                {
                    StreamingConfig = new StreamingRecognitionConfig()
                    {
                        Config = new RecognitionConfig()
                        {
                            Encoding =
                            RecognitionConfig.Types.AudioEncoding.Linear16,
                            SampleRateHertz = 16000,
                            LanguageCode = "en",
                            MaxAlternatives = 1,
                            EnableAutomaticPunctuation = true,
                        },
                        InterimResults = false,
                    }
                });

            // Print responses as they arrive.
            Task printResponses = Task.Run(async () =>
            {
                var responseStream = streamingCall.GetResponseStream();
                while (await responseStream.MoveNextAsync())
                {
                    StreamingRecognizeResponse response = responseStream.Current;
                    foreach (StreamingRecognitionResult result in response.Results)
                    {
                        foreach (SpeechRecognitionAlternative alternative in result.Alternatives)
                        {
                            // Actually console write.
                            Console.WriteLine(alternative.Transcript);

                        }
                    }
                }
            });

            // Read from the microphone and stream to API.
            object writeLock = new object();
            bool writeMore = true;
            var waveIn = new NAudio.Wave.WaveInEvent();
            waveIn.DeviceNumber = 0;
            waveIn.WaveFormat = new NAudio.Wave.WaveFormat(16000, 1);
            waveIn.DataAvailable +=
                (object sender, NAudio.Wave.WaveInEventArgs args) =>
                {
                    lock (writeLock)
                    {
                        if (!writeMore)
                        {
                            return;
                        }

                        streamingCall.WriteAsync(
                            new StreamingRecognizeRequest()
                            {
                                AudioContent = Google.Protobuf.ByteString
                                    .CopyFrom(args.Buffer, 0, args.BytesRecorded)
                            }).Wait();
                    }
                };

            waveIn.StartRecording();
            Console.WriteLine("Speak now.");
            await Task.Delay(TimeSpan.FromSeconds(seconds));
           
            // Stop recording and shut down.
            waveIn.StopRecording();
            lock (writeLock)
            {
                writeMore = false;
            }

            await streamingCall.WriteCompleteAsync();
            await printResponses;
            return 0;
        }
    }
}
