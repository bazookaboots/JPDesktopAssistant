using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Remote;

namespace PAL.Core
{
    class Program
    {
        static async Task Main(string[] args)
        {
            //Listener waiting for stuff from GUI 

            //Listener waiting for stuff from speech listener
            //SpeechListener PAL = new SpeechListener();
            //List<string> results = (List<string>)await PAL.Start(10);
            //Console.WriteLine(results.First()); 

            IWebDriver driver = new ChromeDriver(@"C:\WebDriver\bin");
            driver.Navigate().GoToUrl(@"https://www.google.com");
            driver.FindElement(By.Name("q")).SendKeys("Mommy Milkers");
            driver.FindElement(By.Name("q")).SendKeys(Keys.Enter);
            driver.Navigate().GoToUrl(@"https://www.youtube.com");
            driver.FindElement(By.Name("search_query")).SendKeys("Ignition Remix");
            driver.FindElement(By.Name("search_query")).SendKeys(Keys.Enter);
            driver.FindElement(By.Name("Ignition (Remix)")).Click();

            //driver.Quit();
        }
    }
}
