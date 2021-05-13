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

//THESE LAUNCH ARGS ARE MANDATORY FOR RUNNING PAL STANDALONE
//USE THESE AS COMMAND ARGUMENTS (see dropdown to the right of the start button)
//"true" "true" "true" "false" "Pal is alive." "Just call if you need me." "Yes Master?" "It is done." "I do not understand." "seeya meatsack." "hey pal" "halt" "3" "8"

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
            //settings defined and loaded from args here
            bool pal = true; //controls whether this process should continue running in background
            bool vocal = true; //determines whether pal should speak back or not
            bool listenting = true; // controls always-on, always-listening functionality (hey pal)
            bool active = false; // when true, pal will immediately enter cmd prompt on launch

            //Status messages
            string bootMsg = args[4]; //plays on launch
            string listeningMsg = args[5]; //plays if passive listening is active
            string cmdPromptMsg = args[6]; //plays when "hey pal" is heard
            string cmdDoneMsg = args[7]; //plays when a command executes with no exceptions
            string cmdErrMsg = args[8]; //plays when a command returns an exception
            string killMsg = args[9]; //plays when pal is kill

            //Command Phrases
            string cmdPhrase = args[10];
            string killPhrase = args[11];
            string OverlayOpenPhrase = "Toggle Overlay";
            string OverlayMinimizePhrase = "Minimize overlay";

            //durations for listening
            int passiveInterval = Convert.ToInt32(args[12]); //interval for catching "hey pal" or "halt"
            int activeInterval = Convert.ToInt32(args[13]); //interval for speaking full commands 
            int requestDuration = passiveInterval; //current setting (this is changed frequently, not good for settings)

            var synthesizer = new SpeechSynthesizer();
            synthesizer.SetOutputToDefaultAudioDevice();

            if (vocal) synthesizer.Speak(bootMsg);
            if (vocal && listenting) synthesizer.Speak(listeningMsg);

            while (pal)
            {
                //Initialize Google Listener
                SpeechListener PAL = new SpeechListener();
                string results;
                try
                {
                    results = ((List<string>)await PAL.Start(requestDuration, vocal && active, cmdPromptMsg)).First();
                }
                catch 
                {
                    results = " ";
                }

                //send results to parser for processing
                Parser parser = new Parser();
                string full = results.Where(c => !char.IsPunctuation(c)).Aggregate("", (current, c) => current + c).ToLower();
                Queue transcript = parser.Tokenize(results);
                
                if (parser.calculateSimilarity(full, killPhrase) > 0.8 )
                {
                    if (vocal) synthesizer.Speak(killMsg);
                    pal = false;
                }

                if (parser.calculateSimilarity(full, OverlayOpenPhrase) > 0.8)
                {
                    Console.WriteLine("2: " + "OverlayToggle");
                }

                if (parser.calculateSimilarity(full, OverlayMinimizePhrase) > 0.8)
                {
                    Console.WriteLine("2: " + "MinimizeOverlay");
                }

                if (!active)
                {
                    //Console.WriteLine(parser.calculateSimilarity(full, "hey pal"));
                    if (parser.calculateSimilarity(full, cmdPhrase) > 0.5) 
                    {
                        active = true;
                        requestDuration = activeInterval; //give user time to speak
                        Console.WriteLine("1: " + "Pal has noticed you!");
                    }
                    
                    //if (active && vocal) synthesizer.Speak(cmdPromptMsg);
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
                        if (vocal) synthesizer.Speak(cmdDoneMsg);
                    }
                    catch (AggregateException e)
                    {
                        foreach (var ex in e.InnerExceptions)
                        {
                            Console.WriteLine("0: " + ex.Message);
                        }
                        if (vocal) synthesizer.Speak(cmdErrMsg);
                    }
                    active = false;
                    requestDuration = passiveInterval; //go back to short term listening
                }
            }
            
        }
    }
}
