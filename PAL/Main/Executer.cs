using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using System.Threading.Tasks;

namespace PAL.Core
{
    class Executer
    {
        public void ExecuteCommand(Command cmd)
        {
            cmd.Print();
            Console.WriteLine("Here");

            IWebDriver driver = new ChromeDriver(@"C:\Users\baygo\Documents\GitHub\JPDesktopAssistant\PAL\Main\WebDriver\bin");
            switch (cmd.platform)
            {
                case "youtube":
                    driver.Manage().Window.Maximize();
                    driver.Navigate().GoToUrl(@"https://www.youtube.com/results?search_query=" + cmd.arg);
                    driver.FindElement(By.Id("video-title")).Click();
                    break;

                case "google":
                    driver.Manage().Window.Maximize();
                    driver.Navigate().GoToUrl(@"https://www.google.com");
                    driver.FindElement(By.Name("q")).SendKeys(cmd.arg);
                    driver.FindElement(By.Name("q")).SendKeys(Keys.Enter);
                    break;

                case "images":
                    driver.Manage().Window.Maximize();
                    driver.Navigate().GoToUrl(@"https://www.google.com/imghp?hl=en");
                    driver.FindElement(By.Name("q")).SendKeys(cmd.arg);
                    driver.FindElement(By.Name("q")).SendKeys(Keys.Enter);
                    break;
                default:
                    Console.WriteLine("Uh oh spaghettios");
                    break;
            }
        }
    }
}
