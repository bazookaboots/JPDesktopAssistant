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

            var synthesizer = new SpeechSynthesizer();
            synthesizer.SetOutputToDefaultAudioDevice();

            if (vocal) synthesizer.Speak("Pal is alive.");
            if (vocal && listenting) synthesizer.Speak("Just call if you need me.");

            while (pal)
            {

                if (active)
                {
                    //Initialize Google Listener
                    SpeechListener PAL = new SpeechListener();
                    string results;
                    try
                    {
                        results = ((List<string>)await PAL.Start(8)).First();
                    }
                    catch 
                    {
                        results = " ";
                    }
                    Console.WriteLine(results.First());

                    //send results to parser for processing
                    Parser parser = new Parser();
                    Queue transcript = parser.Tokenize(results);

                    //pass tokenized string to parser, which returns a command to execute
                    Command cmd = parser.Parse(transcript);
                    cmd.Print();

                    //attempt to execute the generated command
                    try
                    {
                        new Executer().ExecuteCommand(cmd).Wait();
                    }
                    catch (AggregateException e)
                    {
                        foreach (var ex in e.InnerExceptions)
                        {
                            Console.WriteLine("ERROR: " + ex.Message);
                        }
                    }
                }
                else if (listenting) // heyPal Functionality
                {
                    //if (recognizer.Result.Text.ToLowerInvariant().ToString() == "hey pal")
                    {
                        if (vocal) synthesizer.Speak("Yes master?");
                        active = true;
                    }
                }
                else 
                { 
                //keypress could also set active flag
                }
            }
            
        }
    }
}
