using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Remote;
using System.Collections;

namespace PAL.Core
{
    class Program
    {
        static async Task Main(string[] args)
        {
            //Listener waiting for stuff from GUI 

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

            // Relative paths are hard.
            //IWebDriver driver = new ChromeDriver(@"C:\Users\baygo\Documents\GitHub\JPDesktopAssistant\PAL\Main\WebDriver\bin");
            //driver.Navigate().GoToUrl(@"https://www.google.com");
            //driver.FindElement(By.Name("q")).SendKeys("Mommy Milkers");
            //driver.FindElement(By.Name("q")).SendKeys(Keys.Enter);
            //driver.Navigate().GoToUrl(@"https://www.youtube.com");
            //driver.FindElement(By.Name("search_query")).SendKeys("Ignition Remix");
            //driver.FindElement(By.Name("search_query")).SendKeys(Keys.Enter);
            //driver.FindElement(By.Name("Ignition (Remix)")).Click();

            //driver.Quit();
        }
    }
}
