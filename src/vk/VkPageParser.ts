import fetch from 'node-fetch';

import { ConsoleColor } from '../enum/ConsoleColor';
import { ISong } from '../interface/ISong';
import { Logger } from '../utils/Logger';

export class VkPageParser {

    private url: string

    constructor(url: string) {
        this.url = url
    }

    public async getCurrentSong(): Promise<ISong | null> {

        try {
            const request = await fetch(this.url)
            const rawHTML = await request.text()

            if(this.isClosedProfile(rawHTML)) {
                Logger.log(`Программа не может получить песню которая сейчас играет, по причине того что вы закрыли профиль для незарегистрированных пользователей. Вомзожноые решения: 1) Настроить доступ к профилю всем в настройках приватности 2) Транслировать муызку в паблик`, ConsoleColor.RED)
                return null
            }
        
            const musicDivRegex = new RegExp(/<div\s+class="pp_status">[\S\s]*?<\/div>/gi)

            const matches = rawHTML.match(musicDivRegex)

            if(!matches) return null // В статусе не музыка

            const strippedMusicWithoutTags = matches[0].replace(/(<\/?[^>]+>)/gi, '')

            const rawSong = strippedMusicWithoutTags.split("—")

            if(!rawSong[1]) return null // В статусе не музыка

            return {
                artist: rawSong[0],
                songName: rawSong[1]
            } as ISong
            
            
            
        } catch (e) {
            Logger.log(`Ошибка при получении текущей песни с ВКонтакте`, ConsoleColor.RED)
            return null
            
        }
    }

    private isClosedProfile(html: string): boolean {

        return html.includes("Страница доступна только авторизованным пользователям")
    }
}