import { App } from "./app";

export class Server {
    static start ():void {
        const app = new App(3000)
        app.init()
        app.start()
    }
    static startTestE2E() {
        const api = new App()
        api.init()
        const app = api.getAppExpress()
        return app
    }
}

Server.start()