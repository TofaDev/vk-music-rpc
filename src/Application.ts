import { Promt } from "./cli/Promt"
import Config from "./config/Config"
import { DiscordActivityManager } from "./discord/DiscordActivityManager"
import { DiscordRPC } from "./discord/DiscordRPC"
import {WebsocketServer} from "./extension/WebsocketServer";

export default new class Application {
    
    private promt: Promt
    private config: Config

    constructor() {
        this.promt = new Promt()
        this.config = new Config()

        this.start()
    }


    private async start(): Promise<void> {

       await this.config.initializeConfig(this.promt) // После возвращения промиса конфигурация будет 100% существовать

        const config = this.config.get()!
       
        const discordRPC = new DiscordRPC(config)
        await discordRPC.initializeRpcClient(config.clientId!);

        const activityManager = new DiscordActivityManager(discordRPC, config)

        const websocketClient = new WebsocketServer(config.websocketPort, activityManager)
        await websocketClient.start()




    }


}