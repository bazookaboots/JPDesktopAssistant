const spawn = require('child_process').spawn;


function spawnEngine() {
    console.log('spawn function called');
    const subprocess = spawn('SpeechToText.exe', {
        cwd: "..\\speech-engine-cs\\bin\\Debug",
        detached: true
    });

    subprocess.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
    subprocess.stdout.on('data', (data) => {
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
    });
    subprocess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    console.log(subprocess.pid)
    
}