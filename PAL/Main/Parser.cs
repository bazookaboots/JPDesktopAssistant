using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PAL.Core
{
    class Command
    {
        public string platform;
        public string action;
        public string arg;

        public void Print()
        {
            Console.WriteLine("CMD:" + action + " " + arg + " on " + platform);
        }
    }

    class Parser
    {
        Hashtable verbs;    
        Hashtable platforms;
        public Parser()
        {
            //Initialize Keywords table
            verbs = new Hashtable();
            platforms = new Hashtable();
            InitTables();
        }
        void InitTables()
        {
            //all keys are lowercase!
            verbs.Add("open", "opening");
            verbs.Add("play", "playing");
            verbs.Add("launch", "launching");
            verbs.Add("stream", "streaming");
            verbs.Add("call", "calling");
            verbs.Add("search", "searching for");
            verbs.Add("google", "googling");

            platforms.Add("youtube", "youtube");
            platforms.Add("google", "youtube");
            platforms.Add("spotify", "spotify");
            // Bailey remove this when you're done playing with it 
            platforms.Add("images", "images");
            platforms.Add("crunchyroll", "crunchyroll");
            platforms.Add("wikipedia", "wikipedia");
        }

        public Queue Tokenize(string Transcript)
        {
            // Strip all punctuation from the transcript and ensure everything is lowercase
            string cleaned = Transcript.Where(c => !char.IsPunctuation(c)).Aggregate("", (current, c) => current + c).ToLower();
            // Split the string into indvidual words
            string[] words = cleaned.Split(' ');
            //push the transcript onto a queue
            Queue readText = new Queue();
            foreach (String word in words)
            {
                readText.Enqueue(word);
            }
            return readText;
        }

        public Command Parse(Queue transcript)
        {
            Command cmd = new Command();
            bool argflag = false;
            foreach (string word in transcript)
            {
                if (word == "on") argflag = false;
                if (argflag)
                {
                    cmd.arg += word + " ";
                }
                if (verbs.ContainsKey(word))
                {
                    cmd.action = word;
                    argflag = true;
                }
                if (platforms.ContainsKey(word))
                {
                    cmd.platform = word;
                }
            }
            return cmd;
        }
    }
}
