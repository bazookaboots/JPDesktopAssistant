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
        static async Task Main(string[] args)
        {
            SpeechListener PAL = new SpeechListener();
            List<string> results = (List<string>)await PAL.Start(10);
        }
    }
}
