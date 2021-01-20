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
            await Task.Run(
                () => 
                {
                    Console.WriteLine(msg);
                }
                );
        }


        static async Task Main(string[] args)
        {
            //Listener waiting for stuff from GUI

            string message = await GetConsole();
            WriteConsole(message);
            //Listener waiting for stuff from speech listener

        
        }
    }
}
