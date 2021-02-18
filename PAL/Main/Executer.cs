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
            var url = "";
            switch (cmd.platform)
            {
                case "youtube":
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
                                url = @"https://www.youtube.com/watch?v=" + searchResult.Id.VideoId;
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
                    break;

                case "google":
                    url = @"http://www.google.com/search?q=" + cmd.arg;
                    Process.Start("chrome.exe", url);
                    break;

                case "images":
                    break;

                case "spotify":
                    break;

                case "crunchyroll":
                    url = @"https://www.crunchyroll.com/" + cmd.arg.Replace(' ', '-').TrimEnd('-');
                    Process.Start("chrome.exe", url);
                    break;

                case "wikipedia":
                    url = @"https://en.wikipedia.org/wiki/" + cmd.arg.Replace(' ', '_');
                    Process.Start("chrome.exe", url);
                    break;

                default:
                    Console.WriteLine("Uh oh spaghettios");
                    break;
            }
        }
    }
}
