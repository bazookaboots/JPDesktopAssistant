const { ConnectionBuilder } = require('electron-cgi');

const connection = new ConnectionBuilder()
        .connectTo('dotnet', 'run', '--project', 'DotNetConsoleProjectWithElectronCgiDotNetNugetPackage')
        .build();

connection.onDisconnect = () => {
    console.log('Lost connection to the .Net process');
};

connection.send('greeting', 'John', (error, theGreeting) => {
    if (error) {
        console.log(error); //serialized exception from the .NET handler
        return;
    }

    console.log(theGreeting); // will print "Hello John!"
});

//alternatively use async/await, in an async function:
try{
    const greeting = await connection.send('greeting', 'John');
    console.log(greeting);
}catch (err) {
    console.log(err); //err is the serialized exception thrown in the .NET handler for the greeting request
}

connection.close();