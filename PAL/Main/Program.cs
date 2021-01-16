using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PAL.Core
{
    class Program
    {
        static async Task Main(string[] args)
        {
            //Listener waiting for stuff from GUI 

            //Listener waiting for stuff from speech listener
            SpeechListener PAL = new SpeechListener();
            List<string> results = (List<string>)await PAL.Start(10);
        }
    }
}
