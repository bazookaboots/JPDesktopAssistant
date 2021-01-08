using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace YouTubeAutomation
{
    class ExecuteCommand
    {
        // you might as well use those methods from your helper class
        [DllImport("User32.dll")]
        private static extern int SetForegroundWindow(IntPtr point);
        [DllImport("user32.dll")]
        private static extern IntPtr PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);
        // the keystroke signals. you can look them up at the msdn pages
        private static uint WM_KEYDOWN = 0x100, WM_KEYUP = 0x101;

        public static void PlayVideo(string videoID)
        {
            //Process[] local = Process.GetProcesses();
            string videoUrlChunk = "https://www.youtube.com/watch?v=";

            System.Diagnostics.Process.Start(videoUrlChunk + videoID);
            
            /*foreach (Process app in local)
            {
                if (app.ProcessName == "chrome")
                {
                    Console.WriteLine(app.MainWindowTitle);
                    var handler = app.MainWindowHandle;
                    SetForegroundWindow(handler);
                    Console.WriteLine("Press space to pause.");
                    Console.ReadKey();
                    PostMessage(handler, WM_KEYDOWN, (IntPtr)' ', IntPtr.Zero);
                    System.Threading.Thread.Sleep(100);
                    Console.WriteLine("Press space to play.");
                    Console.ReadKey();
                    PostMessage(handler, WM_KEYUP, (IntPtr)' ', IntPtr.Zero);
                }
            }*/
        }

        public static void OpenChannel(string channelID)
        {
            string channelUrlChunk = "https://www.youtube.com/channel/";
            System.Diagnostics.Process.Start(channelUrlChunk + channelID);
           
        }

        public static void OpenPlaylist(string playlistID)
        {
            string playlistUrlChunk = "https://www.youtube.com/playlist?list=";
            System.Diagnostics.Process.Start(playlistUrlChunk);
        }
    }
}
