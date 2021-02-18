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

namespace PAL.Core
{
    
    class Program
    {
        public static async Task<string> GetConsole()
        {
            //Listener waiting for stuff from GUI 
            // Beep beep boop boop remember to stop and take a poop!
            //Listener waiting for stuff from speech listener
            SpeechListener PAL = new SpeechListener();
            string results = ((List<string>)await PAL.Start(10)).First();
            Console.WriteLine(results.First());

            //send results to parser for processing
            Parser parser = new Parser();
            Queue transcript = parser.Tokenize(results);

            //pass tokenized string to parser, which returns a command to execute
            Command cmd = parser.Parse(transcript);
            cmd.Print();

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
    }
}
