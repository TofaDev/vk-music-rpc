import { ConsoleColor } from "../enum/ConsoleColor";
import { IConfiguration } from "../interface/IConfiguration";
import { Logger } from "../utils/Logger";
import { VkPageParser } from "../vk/VkPageParser";
import { DiscordRPC } from "./DiscordRPC";

export class DiscordActivityManager {

    private discordRPC: DiscordRPC
    private vkParser: VkPageParser
    private config: IConfiguration

    private currentSongPlayed: string

    constructor(discordRPC: DiscordRPC, config: IConfiguration) {
        this.config = config
        this.currentSongPlayed = ""

        this.discordRPC = discordRPC
        this.vkParser = new VkPageParser(config.userPage!)
    }

    public startScheduler(ms: number): void {

        this.updateActivity()

        setInterval(() => {
            this.updateActivity()
        }, ms)
    }

    private async updateActivity(): Promise<void> {

        const song = await this.vkParser.getCurrentSong()
        
        if(song != null) {
            
            const songText = `${song.artist} - ${song.songName}`

            if (songText.length >= 128) return

            if(songText != this.currentSongPlayed) {
                this.currentSongPlayed = songText

                Logger.log(`Сейчас играет: ${songText}`, ConsoleColor.GREEN)

            this.discordRPC.setActivity({
                details: this.config.activity.text.nowPlaying,
                state: songText
            })
            }
        } else if (this.currentSongPlayed != "none") {

            this.discordRPC.setActivity()
            this.currentSongPlayed = "none"
        }
        
    }
}