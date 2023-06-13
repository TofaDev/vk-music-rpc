import { ConsoleColor } from "../enum/ConsoleColor";
import { IConfiguration } from "../interface/IConfiguration";
import { Logger } from "../utils/Logger";
import { VkPageParser } from "../vk/VkPageParser";
import { DiscordRPC } from "./DiscordRPC";

export class DiscordActivityManager {

    private discordRPC: DiscordRPC
    private config: IConfiguration
    constructor(discordRPC: DiscordRPC, config: IConfiguration) {
        this.config = config

        this.discordRPC = discordRPC
    }

        if(song != null && songStatus == SongStatus.PLAYING) {
            
            const songText = `${song.artist} - ${song.songName}`

            if (songText.length >= 128) return

            Logger.log(`Сейчас играет: ${songText}`, ConsoleColor.GREEN)

            this.discordRPC.setActivity({
                details: this.config.activity.text.nowPlaying,
                state: songText
            })

        } else {
            this.discordRPC.setActivity()
        }
        
    }
}