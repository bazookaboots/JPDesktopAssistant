const spawn = require('child_process').spawnSync;

function spawnEngine() {
    console.log('spawn function called');
    const subprocess = spawn('..\\speech-engine-cs\\bin\\Debug\\SpeechToText.exe', {
        detached: true
    } );
    var output = "";
    while(output == "")
    {
        output = String(subprocess.stdout)
    }
    console.log("output was: " +output)
    console.log(subprocess.pid)
}