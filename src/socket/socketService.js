import io from "socket.io-client";

// const SOCKET_URL = "http://appsdemo.pro:3000";  // Use http instead of https, and specify port 3000
const SOCKET_URL = "http://www.yourappdemo.com:3020";

class WSService {
    initiaize = async () => {
        console.log("in socket")
        try {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket']
            })
            // console.log("is connecting?", this.socket.connected)

            this.socket.on("connect", (data) => {
                console.log("===== socket connected ====")
            })

            this.socket.on("disconnect", (data) => {
                console.log("===== socket disconnected ====")
            })

            this.socket.on("error", (data) => {
                console.log("===== socket error ====")
            })

            // console.log("intializing socket", this.socket)

        } catch (error) {
            console.log("socket is not connected", error)

        }
    }


    emit(event, data = {}){
        this.socket.emit(event, data)
    }

    on(event, cb){
        this.socket.on(event, cb)
    }

    removeListener(listenerName){
        this.socket.removeListener(listenerName)
    }
}

const socketServices = new WSService()

export default socketServices