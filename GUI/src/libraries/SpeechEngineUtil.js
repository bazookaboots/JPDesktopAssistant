const spawn = require('child_process').spawn;

//NOTES FOR EREN
const { overlayWin } = require('./WindowUtil')


class PalEngineController {
    constructor() {
        if (!PalEngineController.instance) {
            PalEngineController.instance = this
            this.subprocess = null
        }
    }

    //FOR EREN create update settings function
    //kill engine
    //restart engine with settings

    start() {
        //TODO: look for existing process named Main
        if (this.subprocess == null) {
            console.log("in engine call")
            //Check for PAL engine  on machine
            //spawns the subprocess that stores the engine
            this.subprocess = spawn('Main.exe', 
            [
                "true",
                "true",
                "true",
                "false",
                "Pal is alive.",
                "Just call if you need me.",
                "Yes Master?",
                "It is done.",
                "I do not understand.",
                "seeya meatsack.",
                "hey pal",
                "halt",
                "3",
                "8"
            ], {
                cwd: "..\\PAL\\Main\\bin\\Debug",
                detached: true,
            });

            console.log(this.subprocess.pid)

            // Registers a function to be ran when the subprocess give the exit signal
            this.subprocess.on('exit',
                // This is the function ran when the exit signal is given
                (code) => {
                    console.log(`Child process exited with code ${code}`);
                }
            );

            // Registers a function to be ran when data is sent over the stdout(used for data) channel            
            this.subprocess.stdout.on('data',
                // This is the function that is ran when it detects data being sent
                (data) => {
                    console.log(data.toString())
                    let opCode = data.slice(0, 1)
                    data = data.slice(2)
                    switch (parseInt(opCode)) {
                        case 0:
                            console.log("console message: " + data)
                            break;
                        case 1:
                            
                            console.log("data was: " + data);
                            break;
                        case 2:
                            //NOTES FOR EREN
                            //overlayController.open("https://youtube.com")
                            console.log("overlay url was: " + data);
                            overlayWin.start(data.toString())
                            
                            break;
                        default:
                            console.log("ERROR: Invalid OpCode data was: "+data);
                    }
                }
            );

            // Registers a function to be ran when data is sent over the stderr(used for errors) channel
            this.subprocess.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            //this.subprocess.stdin.write("hello me\n")            
        }

    }

    isOn(){
        if(this.subprocess == null){
            console.log("isOn function is called false");
            return false
        }
        else {
            console.log("isOn function is called true");
            return true
        }
    }

}

const palEngine = new PalEngineController()

module.exports = {
    palEngine: palEngine,
}