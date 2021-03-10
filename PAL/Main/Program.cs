using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using OpenQA.Selenium.Remote;
using System.Collections;
using System.Speech.Synthesis;
using System.Speech.Recognition;

namespace PAL.Core
{
    class Program
    {
        public static async Task<string> GetConsole()
        {
            string input = await Task.Run(()=> Console.ReadLine());
            return input;
        }

        public static async Task WriteConsole(string msg)
        {
            await Task.Run(() => Console.WriteLine(msg));
        }
        static async Task Main(string[] args)
        {
            //boolean settings defined here, 
            //these can be moved elsewhere to connect/read from gui as long as they can be accessed in this scope
            bool pal = true; //controls whether this process should continue running in background
            bool vocal = true; //determines whether pal should speak back or not
            bool listenting = true; // controls always-on, always-listening functionality (hey pal)
            bool active = false; // when true, pal will respond to commands (set in hey Pal scope or hotkey scope)
            int requestDuration = 3; //how long the user should have to speak (this is changed frequently, not good for settings)

            var synthesizer = new SpeechSynthesizer();
            synthesizer.SetOutputToDefaultAudioDevice();

            if (vocal) synthesizer.Speak("Pal is alive.");
            if (vocal && listenting) synthesizer.Speak("Just call if you need me.");

            while (pal)
            {
                //Initialize Google Listener
                SpeechListener PAL = new SpeechListener();
                string results;
                try
                {
                    results = ((List<string>)await PAL.Start(requestDuration)).First();
                }
                catch 
                {
                    results = " ";
                }

                //send results to parser for processing
                Parser parser = new Parser();
                Queue transcript = parser.Tokenize(results);

                if (!active)
                {
                    active = parser.IsPhrase("hey pal", transcript);
                    if (active && vocal) 
                    {
                        synthesizer.Speak("Yes Master?");
                        requestDuration = 8; //give user time to speak
                    }
                }
                else
                {
                    //pass tokenized string to parser, which returns a command to execute
                    Command cmd = parser.Parse(transcript);
                    cmd.Print();

                    //attempt to execute the generated command
                    try
                    {
                        new Executer().ExecuteCommand(cmd).Wait();
                        if (vocal) synthesizer.Speak("It is done.");
                    }
                    catch (AggregateException e)
                    {
                        foreach (var ex in e.InnerExceptions)
                        {
                            Console.WriteLine("ERROR: " + ex.Message);
                        }
                    }
                    active = false;
                    requestDuration = 3; //go back to short term listening
                }
            }
            
        }
    }
}
