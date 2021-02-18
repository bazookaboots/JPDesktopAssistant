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
using Google.Apis.YouTube.v3;
using Google.Apis.Services;
//using MMBot.Spotify;
//using SpotiFire;

namespace PAL.Core
{
    class Executer
    {
        public async Task ExecuteCommand(Command cmd)
        {
            //cmd.Print();
            //Console.WriteLine("Here");

            //IWebDriver driver = new ChromeDriver(@"C:\Users\baygo\Documents\GitHub\JPDesktopAssistant\PAL\Main\WebDriver\bin");
            switch (cmd.platform)
            {
                case "youtube":
                    /*driver.Manage().Window.Maximize();
                    driver.Navigate().GoToUrl(@"https://www.youtube.com/results?search_query=" + cmd.arg);
                    driver.FindElement(By.Id("video-title")).Click();*/
                    var youtubeService = new YouTubeService(new BaseClientService.Initializer()
                    {
                        ApiKey = "AIzaSyBzWeIae0ygOk1163fSAmhDOhI8zpa9xbY",
                        ApplicationName = this.GetType().ToString()
                    });
                    var searchListRequest = youtubeService.Search.List("snippet");
                    searchListRequest.Q = cmd.arg; // Replace with your search term.
                    searchListRequest.MaxResults = 1;

                    // Call the search.list method to retrieve results matching the specified query term.
                    var searchListResponse = await searchListRequest.ExecuteAsync();

                    List<string> videos = new List<string>();
                    List<string> channels = new List<string>();
                    List<string> playlists = new List<string>();

                    // Add each result to the appropriate list, and then display the lists of
                    // matching videos, channels, and playlists.
                    foreach (var searchResult in searchListResponse.Items)
                    {
                        switch (searchResult.Id.Kind)
                        {
                            case "youtube#video":
                                var url = @"https://www.youtube.com/watch?v=" + searchResult.Id.VideoId;
                                Process.Start("chrome.exe", url);
                                break;

                            case "youtube#channel":
                                channels.Add(String.Format("{0} ({1})", searchResult.Snippet.Title, searchResult.Id.ChannelId));
                                break;

                            case "youtube#playlist":
                                playlists.Add(String.Format("{0} ({1})", searchResult.Snippet.Title, searchResult.Id.PlaylistId));
                                break;
                        }
                    }

                    Console.WriteLine(String.Format("Videos:\n{0}\n", string.Join("\n", videos)));
                    //Console.WriteLine(String.Format("Channels:\n{0}\n", string.Join("\n", channels)));
                    //Console.WriteLine(String.Format("Playlists:\n{0}\n", string.Join("\n", playlists)));

                    break;

                case "google":
                    /*driver.Manage().Window.Maximize();
                    driver.Navigate().GoToUrl(@"https://www.google.com");
                    driver.FindElement(By.Name("q")).SendKeys(cmd.arg);
                    driver.FindElement(By.Name("q")).SendKeys(Keys.Enter);*/

                    break;

                case "images":
                    /*driver.Manage().Window.Maximize();
                    driver.Navigate().GoToUrl(@"https://www.google.com/imghp?hl=en");
                    driver.FindElement(By.Name("q")).SendKeys(cmd.arg);
                    driver.FindElement(By.Name("q")).SendKeys(Keys.Enter);*/

                    break;

                case "spotify":
                    //SpotifyPlayer player = new SpotifyPlayer(new MMBot.Robot());
                    break;

                default:
                    Console.WriteLine("Uh oh spaghettios");
                    break;
            }
        }
    }
}
