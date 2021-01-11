const spawn = require('child_process').spawn;


function spawnEngine() {

    //debuging line to verify function runs
    console.log('spawn function called');

    //spawns the subprocess that stores the engine
    const subprocess = spawn('Main.exe', {
        cwd: "..\\PAL\\Main\\bin\\Debug",
        detached: true
    });

    // Registers a function to be ran when the subprocess give the exit signal
    subprocess.on('exit', 
        // This is the function ran when the exit signal is given
        (code) => {
            console.log(`Child process exited with code ${code}`);
        }
    );

    // Registers a function to be ran when data is sent over the stdout(used for data) channel
    subprocess.stdout.on('data', 
        // This is the function that is ran when it detects data being sent
        (data) => {
            opCode = data.slice(0,1)
            data = data.slice(2)
            switch(parseInt(opCode)) {
                case 0:
                    console.log("console message: " + data )
                case 1:
                    text = document.getElementById("text")
                    text.innerHTML = data
                    console.log("data was: " + data);
                    break;
                default:
                    console.log("opCode not recognized (either the message sent by the engine has no opCode or it is one unfamiliar");
            }
        }
    );

    // Registers a function to be ran when data is sent over the stderr(used for errors) channel
    subprocess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    console.log(subprocess.pid)
    
}