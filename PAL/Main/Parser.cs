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
        public string browser;

        public void Print()
        {
            Console.WriteLine("0:" + "CMD:" + action + " " + arg + " on " + platform + " with " + browser);
        }
    }

    class Parser
    {
        Hashtable verbs;    
        Hashtable platforms;
        public Parser()
        {
            //Initialize Keyword tables
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
            //verbs.Add("google", "googling");

            platforms.Add("youtube", "youtube");
            platforms.Add("google", "youtube");
            platforms.Add("spotify", "spotify");
            // Bailey remove this when you're done playing with it 
            // ...or not --Eren
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
            cmd.browser = "chrome";
            bool argflag = false;
            foreach (string word in transcript)
            {
                if (word == "on" || word == "with") argflag = false;
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
                if (!argflag && calculateSimilarity(word, "overlay") > 0.8 )
                {
                    cmd.browser = "overlay";
                }
            }
            return cmd;
        }

        //look for a multi-token term in a transcript
        public bool IsPhrase(string phrase, Queue transcript)
        {
            Queue targetPhrase = Tokenize(phrase);
            if (targetPhrase.Count > transcript.Count) return false;
            foreach (string word in targetPhrase)
            {
                if (word != (string)transcript.Dequeue()) return false;
            }
            return true;
        }

        /// <summary>
        /// Returns the number of steps required to transform the source string
        /// into the target string.
        /// </summary>
        private int computeLevenshteinDistance(string source, string target)
        {
            if ((source == null) || (target == null)) return 0;
            if ((source.Length == 0) || (target.Length == 0)) return 0;
            if (source == target) return source.Length;

            int sourceWordCount = source.Length;
            int targetWordCount = target.Length;

            // Step 1
            if (sourceWordCount == 0)
                return targetWordCount;

            if (targetWordCount == 0)
                return sourceWordCount;

            int[,] distance = new int[sourceWordCount + 1, targetWordCount + 1];

            // Step 2
            for (int i = 0; i <= sourceWordCount; distance[i, 0] = i++) ;
            for (int j = 0; j <= targetWordCount; distance[0, j] = j++) ;

            for (int i = 1; i <= sourceWordCount; i++)
            {
                for (int j = 1; j <= targetWordCount; j++)
                {
                    // Step 3
                    int cost = (target[j - 1] == source[i - 1]) ? 0 : 1;

                    // Step 4
                    distance[i, j] = Math.Min(Math.Min(distance[i - 1, j] + 1, distance[i, j - 1] + 1), distance[i - 1, j - 1] + cost);
                }
            }

            return distance[sourceWordCount, targetWordCount];
        }

        /// <summary>
        /// Calculate percentage similarity of two strings
        /// <param name="source">Source String to Compare with</param>
        /// <param name="target">Targeted String to Compare</param>
        /// <returns>Return Similarity between two strings from 0 to 1.0</returns>
        /// </summary>
        public double calculateSimilarity(string source, string target)
        {
            if ((source == null) || (target == null)) return 0.0;
            if ((source.Length == 0) || (target.Length == 0)) return 0.0;
            if (source == target) return 1.0;

            int stepsToSame = computeLevenshteinDistance(source, target);
            return (1.0 - ((double)stepsToSame / (double)Math.Max(source.Length, target.Length)));
        }
    }
}
