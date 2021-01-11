using System;
using System.Data.SQLite;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using ElectronCgi.DotNet;
using Google.Cloud.Speech.V1;
using System.Collections;
using System.Speech.Synthesis;

namespace SpeechToText
{
    class Program
    {
        // Very top of the asyncronous call chain. Program begins here.
        static async Task Main(string[] args)
        {
            // Set "GoogleKey.json" to API environment variable
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "..\\..\\GoogleKey.json");


            // Send API output to STDout.
            Console.WriteLine("0:" + "Attempting request.");
            List<string> results = (List<string>) await StreamingMicRecognizeAsync(100);

            // "Hey Pal"
            // Command is heard -> ListenToCommand(15) -> parse output for command -> ExecuteCommand(command)
            Console.WriteLine("0:" + "Request complete.");
        }

        static async Task<object> StreamingMicRecognizeAsync(int seconds)
        {
            //Initialize Keywords table
            Hashtable keywords = new Hashtable();
            Hashtable validArgs = new Hashtable();
            InitTables();

            List<string> transcripts = new List<string>();
            // Verifies API credentials.
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
                            //send to parser for processing
                            Parse(alternative.Transcript);
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


            //idk if this is ideal, but it performed as expecte d, tasks are weird

            //keys and data are added here, in the fututre this could read a database or text file.
            void InitTables()
            {
                //all keys are lowercase!
                keywords.Add("open", "opening");
                keywords.Add("play", "playing");
                keywords.Add("launch", "launching");
                keywords.Add("stream", "streaming");
                keywords.Add("call", "calling");
                keywords.Add("search", "searching for");

                validArgs.Add("youtube","youtube");
            }

            void Parse(string Transcript)
            {
                var synthesizer = new SpeechSynthesizer();
                synthesizer.SetOutputToDefaultAudioDevice();

                // Strip all punctuation from the transcript and ensure everything is lowercase
                string tempp = Transcript.Where(c => !char.IsPunctuation(c)).Aggregate("", (current, c) => current + c).ToLower();
                // Split the string into indvidual words
                string[] temp = tempp.Split(' ');
                //push the transcript onto a queue
                Queue readText = new Queue();
                foreach (String word in temp)
                {
                    readText.Enqueue(word);
                    Console.WriteLine(word);
                }

                //now attempt to find commands in said queue
                foreach (String word in readText)
                {
                    if (keywords.ContainsKey(word))
                    {
                        Console.WriteLine(keywords[word]);
                        //readText.Dequeue();
                        if (validArgs.ContainsKey(readText.Peek()))
                        {
                            //synthesizer.Speak(keywords[word] + " " + validArgs[readText.Peek()]);
                        }

                    }
                }
            }
        }
    }
}

