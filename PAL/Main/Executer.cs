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
                    driver.Navigate().GoToUrl(@"https://www.youtube.com");
                    driver.FindElement(By.Name("search_query")).SendKeys(cmd.arg);
                    driver.FindElement(By.Name("search_query")).SendKeys(Keys.Enter);
                    break;

                case "google":
                    driver.Navigate().GoToUrl(@"https://www.google.com");
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
