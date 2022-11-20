import RPC, { Client } from "discord-rpc"
import { ConsoleColor } from "../enum/ConsoleColor"
import { IConfiguration } from "../interface/IConfiguration"
import { Logger } from "../utils/Logger"

export class DiscordRPC {

    private config: IConfiguration

    constructor(config: IConfiguration) {
        this.config = config
    }

    private rpcClient: Client | undefined

    public async initializeRpcClient(clientId: string): Promise<void> {

        const rpc = new RPC.Client({
            transport: 'ipc'
        })

        try {
            await rpc.login({ clientId})

            this.rpcClient = rpc

        } catch (e) {
            Logger.log("Не удалось авторизоваться в дискорде, скорее всего он не запущен", ConsoleColor.RED)
            
            process.exit(0)
        }

        await this.waitToReady(rpc)        
        
    }

    private waitToReady(rpc: Client): Promise<void> {

        return new Promise((resolve) => {

            let isStarted: boolean

            Logger.log(`Запускаем RPC клиент...`, ConsoleColor.YELLOW)

            setTimeout(() => {

               if(isStarted) return

               Logger.log(`Не удалось подключиться к дискорду`, ConsoleColor.RED)

                process.exit(0)
            }, 10000)

            isStarted = true

            Logger.log(`RPC клиент запущен!`, ConsoleColor.GREEN)

            return resolve()
            

            // По неизвестной мне причине этот ивент попросту не отрабатывает на линуксе, лол (временный костыль до того момента как найду решение)

        //     rpc.on('ready', () => {
                
        //         onReady()

        //         isStarted = true

        //         return resolve()
        //     })
    })
}

    public setActivity(params?: RPC.Presence): void {

        if(!this.rpcClient) return;

        this.rpcClient.setActivity({
            buttons: this.config.discordButtons,
            startTimestamp: Date.now(),
            largeImageKey: this.config.activity.images.largeImageKey,
            smallImageKey: this.config.activity.images.smallImageKey,
            instance: false,

            details: params?.details ?? this.config.activity.text.firstLine,
            state: params?.state ?? this.config.activity.text.secondLine,

            smallImageText: params?.smallImageText ?? this.config.activity.text.smallImageHint,
            largeImageText: params?.largeImageText ?? this.config.activity.text.largeImageHint,
        })

    }

}