const spawn = require('child_process').spawn;

function spawnEngine() {
    console.log('spawn function called');
    const subprocess = spawn('D:\Projects\JPDesktopAssistant\speech-engine-cs\bin\Debug\SpeechToText.exe', {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore']
    } );

    console.log(subprocess.connected);

    subprocess.unref();
}