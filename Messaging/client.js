const io = require("socket.io-client"),
const ioClient = io.connect("http://localhost:8000", 1111);

ioClient.on("getmessage", (msg) => console.info(msg));

test();

function test() {
    const message = {
        messageid: Date.now(),
        message: "This is a test",
        toid: 1111,
        fromid: 2222
    }

    ioClient.emit("sendmessage", message)

}