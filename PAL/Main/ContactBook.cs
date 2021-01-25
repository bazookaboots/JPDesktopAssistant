using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Main
{
    struct ContactProbability 
    {
        Contact contact;
        double probability;
        public ContactProbability(Contact contact,double probability)
        {
            this.contact = contact;
            this.probability = probability;
        }
    }

    class Contact
    {
        private string _identifier;
        public string Name   // property
        {
            get { return _identifier; }   // get method
            set { _identifier = value; }  // set method
        }
        private string _service;
        public string Service   // property
        {
            get { return _service; }   // get method
            set { _service = value; }  // set method
        }
        private string _serviceName;
        public string Servicename   // property
        {
            get { return _serviceName; }   // get method
            set { _serviceName = value; }  // set method
        }

        public Contact(string identifier, string service, string serviceName)
        {
            this._identifier = identifier;
            this._service = service;
            this._serviceName = serviceName;
        }
    }
    class ContactBook
    {
        private List<Contact> contacts;
        public ContactBook()
        {

        }
        public ContactBook(string contactString)
        {
            this.contacts = this.parseContactString(contactString);
        }

        private List<Contact> parseContactString(string data)
        {
            List<Contact> contacts = new List<Contact>();
            string[] entrys = data.Split(':');
            foreach( string entry in entrys)
            {
                string[] entryData = entry.Split(',');
                if (entryData.Length == 3 &&
                    entryData[0] != "" &&
                    entryData[1] != "" &&
                    entryData[2] != "")
                {
                    contacts.Add(new Contact(entryData[0].ToUpper(), entryData[1], entryData[2]));
                }
                else throw new Exception("Invalid entry detected");
            }
            return contacts;
        }
        public Contact searchExact(string name)
        {
            return this.contacts.Find((contact) => contact.Name == name.ToUpper() );
        }

        public Contact searchBest(string name)
        {
            Contact result = null;
            double highestProb = 0.0;
            foreach (Contact contact in this.contacts)
            {
                double newProb = this.CalculateSimilarity(name, contact.Name);
                if (newProb > highestProb)
                {
                    result = contact;
                    highestProb = newProb;
                }
            }
            return result;

        }

        public List<ContactProbability> searchApprox(string name, double thres)
        {
            List<ContactProbability> results = new List<ContactProbability>();
            foreach(Contact contact in this.contacts)
            {
                double prob = this.CalculateSimilarity(name, contact.Name);
                if(prob >= thres)
                {
                    results.Add(new ContactProbability(contact, prob));
                }
            }
            return results;

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
        private double calculateSimilarity(string source, string target)
        {
            if ((source == null) || (target == null)) return 0.0;
            if ((source.Length == 0) || (target.Length == 0)) return 0.0;
            if (source == target) return 1.0;

            int stepsToSame = computeLevenshteinDistance(source, target);
            return (1.0 - ((double)stepsToSame / (double)Math.Max(source.Length, target.Length)));
        }
    }
}
