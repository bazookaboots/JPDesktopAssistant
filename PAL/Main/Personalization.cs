using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Configuration;

/**************************************************************
Personal Notes:
* GUI

* Main
* Personalization
* Tokenizer
* Parser
* Executer       
**************************************************************/

namespace PAL.Core
{
    class Account
    {
        private string connectionString = "server=aura.cset.oit.edu, 5433; " + "database=morgananderson2;" + "UID=morgananderson2;" + "password=morgananderson2;";

        /**************************************************************
        Function: CreateNewUser

        Purpose: This function will be called by the GUI when the user
        clicks on a "create account" button after entering credentials.

        Precondition: The user needs to have inputed a username, email,
        and password, then click a button to initiate this function.
        The username, email, and password need to be passed into the
        function as strings.
    
        Postcondition: After the function has ran, it will return a int.
        0 = Completed sucessfully.
        1 = Email already exists.
        2 = Invalid password.
        -1 = Unknown issue.
        **************************************************************/
        public int CreateNewUser(string username, string email, string password)
        {
            try
            {
                using (SqlConnection newAccountSQLConnection = new SqlConnection(connectionString))
                {
                    newAccountSQLConnection.Open();

                    using (SqlCommand newAccountSQLCommand = newAccountSQLConnection.CreateCommand())
                    {
                        var newAccountTestCommand = "SELECT * FROM morgananderson2.users WHERE email = @emailcheck";
                        newAccountSQLCommand.CommandText = newAccountTestCommand;
                        newAccountSQLCommand.Parameters.AddWithValue("emailcheck", email);

                        using (SqlDataReader newAccountSQLReader = newAccountSQLCommand.ExecuteReader())
                        {
                            if (newAccountSQLReader.Read())
                            {
                                return 1;
                            }
                            if (password.Length > 8)
                            {
                                return 2;
                            }
                        }

                        var newAccountInsertCommand = "INSERT INTO morgananderson2.users VALUES(@username, @email, @password, @logged_in)";
                        newAccountSQLCommand.CommandText = newAccountInsertCommand;
                        newAccountSQLCommand.Parameters.AddWithValue("username", username);
                        newAccountSQLCommand.Parameters.AddWithValue("email", email);
                        newAccountSQLCommand.Parameters.AddWithValue("password", BCrypt.Net.BCrypt.HashPassword(password));
                        newAccountSQLCommand.Parameters.AddWithValue("logged_in", 1);
                        newAccountSQLCommand.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception eSql)
            {
                Console.WriteLine("Exception: " + eSql.Message);
                return -1;
            }

            return 0;
        }

        /**************************************************************
        Function: Login

        Purpose: This function will be called by the GUI when the user
        clicks on a "login" button after entering credentials.

        Precondition: The user needs to have inputed a email and password,
        then click a button to initiate this function.
        The email and password need to be passed into the function as
        strings.
    
        Postcondition: After the function has ran, it will return a int.
        0 = Completed sucessfully.
        1 = Invalid email.
        2 = Invalid password.
        3 = User is already logged in somewhere else.
        -1 = Unknown issue.
        **************************************************************/
        public int Login(string email, string password)
        {
            try
            {
                using (SqlConnection loginSQLConnection = new SqlConnection(connectionString))
                {
                    loginSQLConnection.Open();

                    using (SqlCommand loginSQLCommand = loginSQLConnection.CreateCommand())
                    {
                        var loginTestCommand = "SELECT * FROM morgananderson2.users WHERE email = @emailcheck";
                        loginSQLCommand.CommandText = loginTestCommand;
                        loginSQLCommand.Parameters.AddWithValue("emailcheck", email);
                        loginSQLCommand.Parameters.AddWithValue("password", BCrypt.Net.BCrypt.HashPassword(password));

                        using (SqlDataReader loginSQLReader = loginSQLCommand.ExecuteReader())
                        {
                            if (!loginSQLReader.Read())
                            {
                                return 1;
                            }
                            if (!BCrypt.Net.BCrypt.Verify(password, loginSQLReader.GetString(2)))
                            {
                                return 2;
                            }
                            if (loginSQLReader.GetInt32(3) != 0)
                            {
                                return 3;
                            }
                        }

                        var loginSuccessCommand = "UPDATE morgananderson2.users SET logged_in = 1 WHERE email = @email";
                        loginSQLCommand.CommandText = loginSuccessCommand;
                        loginSQLCommand.Parameters.AddWithValue("email", email);
                        loginSQLCommand.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception eSql)
            {
                Console.WriteLine("Exception: " + eSql.Message);
                return -1;
            }

            return 0;
        }

        /**************************************************************
        Function: Logout

        Purpose: This function will be called by the GUI when the user
        clicks on a "logout" button.

        Precondition: The email to log out of passed as a string.

        Postcondition: None.
        **************************************************************/
        public void Logout(string email)
        {
            try
            {
                using (SqlConnection logout = new SqlConnection(connectionString))
                {
                    logout.Open();
                    if (logout.State == System.Data.ConnectionState.Open)
                    {
                        using (SqlCommand logout_command = logout.CreateCommand())
                        {
                            var logout_string = "UPDATE morgananderson2.users SET logged_in = 0 WHERE email = @email";
                            logout_command.CommandText = logout_string;
                            logout_command.Parameters.AddWithValue("email", email);
                            logout_command.ExecuteNonQuery();
                        }
                    }
                }
            }
            catch (Exception eSql)
            {
                Console.WriteLine("Exception: " + eSql.Message);
            }
        }

        public void PushConfig(string email)
        {
            try
            {
                using (SqlConnection pushConfigSQLConnection = new SqlConnection(connectionString))
                {
                    pushConfigSQLConnection.Open();

                    using (SqlCommand pushConfigSQLCommand = pushConfigSQLConnection.CreateCommand())
                    {
                       //Config otion sync here.
                        var pushConfigCommand= "UPDATE morgananderson2.users SET testoption1 = @testoption1 WHERE email = @email";
                        pushConfigSQLCommand.CommandText = pushConfigCommand;
                        pushConfigSQLCommand.Parameters.AddWithValue("email", email);
                        pushConfigSQLCommand.Parameters.AddWithValue("testoption1", "testing");
                        pushConfigSQLCommand.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception eSql)
            {
                Console.WriteLine("Exception: " + eSql.Message);
            }
        }

        public void PullConfig(string email)
        {
            try
            {
                using (SqlConnection pullConfigSQLConnection = new SqlConnection(connectionString))
                {
                    pullConfigSQLConnection.Open();

                    using (SqlCommand pullConfigSQLCommand = pullConfigSQLConnection.CreateCommand())
                    {
                        var pullConfigCommand = "SELECT * FROM morgananderson2.users WHERE email = @email";
                        pullConfigSQLCommand.CommandText = pullConfigCommand;
                        pullConfigSQLCommand.Parameters.AddWithValue("email", email);

                        using (SqlDataReader pullConfigSQLReader = pullConfigSQLCommand.ExecuteReader())
                        {
                            pullConfigSQLReader.Read();
                            string example = pullConfigSQLReader.GetString(4);
                        }
                    }
                }
            }
            catch (Exception eSql)
            {
                Console.WriteLine("Exception: " + eSql.Message);
            }
        }

        public void UpdateConfig(string key, string value, string email)
        {
            //Set option in config.
            PushConfig(email);
        }
    }
}
