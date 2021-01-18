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
            //### Account Testing Stuff ###//
            //Account account = new Account();
            //account.PullConfig("testemail@test.com");
            //account.CreateNewUser("BigBabyJesus", "testemail@test.com", "password");
            //account.Login("testemail@test.com", "password");
            //account.Logout("testemail@test.com");
            //############################//

            //### Config Testing Stuff ###//
            //Account account = new Account();
            //account.PushConfig("testemail@test.com");
            //account.UpdateConfig("testoption1", "passedon", "test");
            //############################//

            SpeechListener PAL = new SpeechListener();
            List<string> results = (List<string>)await PAL.Start(10);
        }
    }
}
