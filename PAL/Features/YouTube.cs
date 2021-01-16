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

namespace PAL.Features
{
    class SearchYouTube
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


            // Add each result to the appropriate list, and then display the lists of
            // matching videos, channels, and playlists.
            foreach (var searchResult in searchListResponse.Items)
            {
                switch (searchResult.Id.Kind)
                {
                    case "youtube#video":
                        //ExecuteCommand.PlayVideo(searchResult.Id.VideoId);
                        break;

                    case "youtube#channel":
                        //ExecuteCommand.OpenChannel(searchResult.Id.ChannelId);
                        break;

                    case "youtube#playlist":
                        //ExecuteCommand.OpenPlaylist(searchResult.Id.PlaylistId);
                        break;
                }
            }
        }
    }
}
