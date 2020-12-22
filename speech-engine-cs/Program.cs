using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Numerics;
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
            Console.WriteLine("0:" + "Attempting request.");
            List<string> results = (List<string>) await StreamingMicRecognizeAsync(5);

            // Break the results of the request into chunks.
            string[] chunks = results[0].Split(' ', '.');
            for (int i = 0; i < chunks.Length; i++)
            {
                chunks[i] = chunks[i].ToLower();
            }

            // Parse through the chunks to recognize command. 
            if (chunks.Contains("open") || chunks.Contains("start") || chunks.Contains("launch"))
            {
                Console.WriteLine("Here");
                switch (chunks[1])
                {
                    case "outlook":
                        System.Diagnostics.Process.Start(@"C:\Users\Morgan Anderson\Family\Personal\Morgan\Education\Work\OregonTech\Classes\Junior Project\JPDesktopAssistant\speech-engine-cs\Scripts\StartOutlook.bat");
                        break;

                    case "canvas":
                        System.Diagnostics.Process.Start(@"C:\Users\Morgan Anderson\Family\Personal\Morgan\Education\Work\OregonTech\Classes\Junior Project\JPDesktopAssistant\speech-engine-cs\Scripts\StartCanvas.bat");
                        break;

                    case "discord":
                        System.Diagnostics.Process.Start(@"C:\Users\Morgan Anderson\Family\Personal\Morgan\Education\Work\OregonTech\Classes\Junior Project\JPDesktopAssistant\speech-engine-cs\Scripts\StartDiscord.bat");
                        break;

                    case "overwatch":
                        System.Diagnostics.Process.Start(@"C:\Users\Morgan Anderson\Family\Personal\Morgan\Education\Work\OregonTech\Classes\Junior Project\JPDesktopAssistant\speech-engine-cs\Scripts\StartOverwatch.bat");
                        break;

                    default:
                        break;
                }
            }

            Console.WriteLine("0:" + "Request complete.");
        }

        static async Task<object> StreamingMicRecognizeAsync(int seconds)
        {
            List<string> transcripts = new List<string>();
            // Verifies API credentials.
            //System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", Path.GetFullPath("../../GoogleKey.json"));
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
                            ProfanityFilter = false,
                        },
                        InterimResults = false,
                    }
                }); ;

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
                            // Actual console write.
                            Console.WriteLine("1:" + alternative.Transcript);
                            transcripts.Add(alternative.Transcript);
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
            Console.WriteLine("0:" + "Speak now.");
            await Task.Delay(TimeSpan.FromSeconds(seconds));
           
            // Stop recording and shut down.
            waveIn.StopRecording();
            lock (writeLock)
            {
                writeMore = false;
            }

            await streamingCall.WriteCompleteAsync();
            await printResponses;
            return transcripts;
        }
    }
}
