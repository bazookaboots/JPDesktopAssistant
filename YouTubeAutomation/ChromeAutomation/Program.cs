using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using System.Threading;

namespace ChromeAutomation
{
    class Program
    {
        // you might as well use those methods from your helper class
        [DllImport("User32.dll")]
        private static extern int SetForegroundWindow(IntPtr point);
        [DllImport("user32.dll")]
        private static extern IntPtr PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);
        // the keystroke signals. you can look them up at the msdn pages
        private static uint WM_KEYDOWN = 0x100, WM_KEYUP = 0x101;

        static void Main(string[] args)
        {
            try
            {
                new Search().Run("Yellowline Song").Wait();
            }
            catch (AggregateException ex)
            {
                foreach (var e in ex.InnerExceptions)
                {
                    Console.WriteLine("Error: " + e.Message);
                }
            }


            Process[] local = Process.GetProcesses();
            string url = "https://www.youtube.com/watch?v=doEwWzMz99A";
            string urlChunk = "https://www.youtube.com/watch?v=";
            foreach (Process app in local)
            {
                if (app.ProcessName == "chrome")
                {
                    urlChunk += app.Id.ToString();
                    Console.WriteLine(urlChunk);

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
            }
        }
    }
}
