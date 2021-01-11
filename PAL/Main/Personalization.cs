using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Diagnostics;

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
        1 = Invalid password.
        2 = Email already exists.
        -1 = Unknown issue.
        **************************************************************/
        public int CreateNewUser(string username, string email, string password)
        {
            int valid = -1;
            try
            {
                using (SqlConnection new_account_check = new SqlConnection(connectionString))
                {
                    new_account_check.Open();
                    if (new_account_check.State == System.Data.ConnectionState.Open)
                    {
                        using (SqlCommand new_account_check_command = new_account_check.CreateCommand())
                        {
                            //Query command to see if the email exists already.
                            var new_account_check_string = "SELECT * FROM morgananderson2.users WHERE email = @email";
                            new_account_check_command.CommandText = new_account_check_string;
                            new_account_check_command.Parameters.AddWithValue("email", email);

                            //Start reading.
                            using (SqlDataReader reader = new_account_check_command.ExecuteReader())
                            {
                                //If the password is too short, require the user to try again.
                                if (password.Length < 8)
                                {
                                    valid = 1;
                                    Console.WriteLine("Error: Password must be at least 8 characters long.");
                                }
                                //If the email already exists, require the user to try again.
                                else if (reader.Read())
                                {
                                    valid = 2;
                                    Console.WriteLine("Error: That email already exists.");
                                }
                                //If all credentials are valid, create a new user in the database.
                                else
                                {
                                    valid = 0;
                                    new_account_check.Close();
                                    using (SqlConnection new_account = new SqlConnection(connectionString))
                                    {
                                        new_account.Open();
                                        if (new_account.State == System.Data.ConnectionState.Open)
                                        {
                                            using (SqlCommand new_account_command = new_account.CreateCommand())
                                            {
                                                var new_account_string = "INSERT INTO morgananderson2.users VALUES(@username, @email, @password, @logged_in)";
                                                new_account_command.CommandText = new_account_string;
                                                new_account_command.Parameters.AddWithValue("username", username);
                                                new_account_command.Parameters.AddWithValue("email", email);
                                                new_account_command.Parameters.AddWithValue("password", password);
                                                new_account_command.Parameters.AddWithValue("logged_in", 1);
                                                new_account_command.ExecuteNonQuery();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception eSql)
            {
                valid = -1;
                Console.WriteLine("Exception: " + eSql.Message);
            }

            return valid;
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
        1 = Invalid username or password.
        2 = User is already logged in somewhere else.
        -1 = Unknown issue.
        **************************************************************/
        public int Login(string email, string password)
        {
            int valid = -1;
            try
            {
                using (SqlConnection login_check = new SqlConnection(connectionString))
                {
                    login_check.Open();
                    if (login_check.State == System.Data.ConnectionState.Open)
                    {
                        using (SqlCommand login_check_command = login_check.CreateCommand())
                        {
                            //Query command to see if the credentials are correct.
                            var login_check_string = "SELECT * FROM morgananderson2.users WHERE email = @email and password = @password";
                            login_check_command.CommandText = login_check_string;
                            login_check_command.Parameters.AddWithValue("email", email);
                            login_check_command.Parameters.AddWithValue("password", password);

                            //Start reading.
                            using (SqlDataReader reader = login_check_command.ExecuteReader())
                            {
                                //If credentials are invalid.
                                if (!reader.Read())
                                {
                                    valid = 1;
                                    Console.WriteLine("Error: The provided credentials are invalid.");
                                }
                                //If the user is already logged in.
                                else if (reader.GetInt32(3) != 0)
                                {
                                    valid = 2;
                                }
                                //If all credentials are valid, retrieve user info.
                                else
                                {
                                    valid = 0;
                                    login_check.Close();
                                    using (SqlConnection login = new SqlConnection(connectionString))
                                    {
                                        login.Open();
                                        if (login.State == System.Data.ConnectionState.Open)
                                        {
                                            using (SqlCommand login_command = login.CreateCommand())
                                            {
                                                var login_string = "UPDATE morgananderson2.users SET logged_in = 1 WHERE email = @email";
                                                login_command.CommandText = login_string;
                                                login_command.Parameters.AddWithValue("email", email);
                                                login_command.ExecuteNonQuery();
                                            }
                                        }
                                    }

                                    //Retrieve user data (future).
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception eSql)
            {
                Console.WriteLine("Exception: " + eSql.Message);
            }

            return valid;
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
    }
}
