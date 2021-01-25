using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

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
            //string input = GetConsole();
            //if(input == "")
            //{
            //  initialize without contact book  
            //  new SpeechListener()
            //}
            //else
            //{
            //  intialize with contact book
            //  new SpeechListener(contacts)
            //}   
            //Listener waiting for stuff from speech listener
            SpeechListener PAL = new SpeechListener();
            List<string> results = (List<string>)await PAL.Start(10);
            Console.WriteLine(results.First()); 

        }
    }
}
