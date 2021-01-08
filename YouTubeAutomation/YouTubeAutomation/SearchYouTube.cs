using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;

namespace YouTubeAutomation
{
    internal class SearchYouTube
    {
        [STAThread]
        static void Main(string[] args)
        {
            bool done = false;

            while (!done)
            {
                Console.WriteLine("YouTube Data API: Search");
                Console.WriteLine("========================");

                string search;

                using (Process p = new Process())
                {
                    // Relative paths are tricky to me for some reason.
                    // You'll need to use the executable in the bin folder for the speech-engine
                    p.StartInfo.FileName = @"C:\Users\baygo\Documents\GitHub\JPDesktopAssistant\speech-engine-cs\bin\Debug\SpeechToText.exe";
                    p.StartInfo.UseShellExecute = false;
                    p.StartInfo.RedirectStandardOutput = true;
                    p.Start();

                    StreamReader reader = p.StandardOutput;
                    search = reader.ReadToEnd();
                }

                Console.WriteLine(search);

                
                search = Console.ReadLine();

                /*try
                {
                    new Search().RunYouTubeSearch(search).Wait();
                }
                catch (AggregateException ex)
                {
                    foreach (var e in ex.InnerExceptions)
                    {
                        Console.WriteLine("Error: " + e.Message);
                    }
                }*/

                Console.WriteLine("Press any key to search again or press E to exit.");
                string exit = Console.ReadLine();
                if (exit == "e")
                {
                    done = true;
                }
            }
        }

        public async Task RunYouTubeSearch(string command)
        {
            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = "AIzaSyBzWeIae0ygOk1163fSAmhDOhI8zpa9xbY",
                ApplicationName = this.GetType().ToString()
            });

            var searchListRequest = youtubeService.Search.List("snippet");
            Console.WriteLine("Search for a video by keyword: ");
            searchListRequest.Q = command; // Replace with your search term.
            
            searchListRequest.MaxResults = 1;

            // Call the search.list method to retrieve results matching the specified query term.
            var searchListResponse = await searchListRequest.ExecuteAsync();

            //List<string> videos = new List<string>();
            //List<string> channels = new List<string>();
            //List<string> playlists = new List<string>();

            // Add each result to the appropriate list, and then display the lists of
            // matching videos, channels, and playlists.
            foreach (var searchResult in searchListResponse.Items)
            {
                switch (searchResult.Id.Kind)
                {
                    case "youtube#video":
                        //videos.Add(String.Format("{0} ({1})", searchResult.Snippet.Title, searchResult.Id.VideoId));
                        ExecuteCommand.PlayVideo(searchResult.Id.VideoId);
                        break;

                    case "youtube#channel":
                        //channels.Add(String.Format("{0} ({1})", searchResult.Snippet.Title, searchResult.Id.ChannelId));
                        ExecuteCommand.OpenChannel(searchResult.Id.ChannelId);
                        break;

                    case "youtube#playlist":
                        //playlists.Add(String.Format("{0} ({1})", searchResult.Snippet.Title, searchResult.Id.PlaylistId));
                        ExecuteCommand.OpenPlaylist(searchResult.Id.PlaylistId);
                        break;
                }
            }

            //Console.WriteLine(String.Format("Videos:\n{0}\n", string.Join("\n", videos)));
            //Console.WriteLine(String.Format("Channels:\n{0}\n", string.Join("\n", channels)));
            //Console.WriteLine(String.Format("Playlists:\n{0}\n", string.Join("\n", playlists)));
        }
    }
}
