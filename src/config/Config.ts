import fse from "fs-extra"
import { Promt } from "../cli/Promt"
import { ConsoleColor } from "../enum/ConsoleColor"
import { IConfiguration } from "../interface/IConfiguration"
import { Logger } from "../utils/Logger"

export default class Config {

    private rawConfig: IConfiguration | undefined

    public create(config: IConfiguration): void {
        if(this.exists()) throw new Error(`Конфиг уже существует!`)

        fse.writeFileSync(this.getConfigPath(), JSON.stringify(config, null, 4))
    }

    public get(): IConfiguration | null | undefined {
        if(!this.exists()) return null

        return this.rawConfig
    }

    public exists(): boolean {

    return fse.existsSync(this.getConfigPath())

   }


   public getConfigPath(): string {
    return `${process.cwd()}/config.json`
   }

   private setRawConfig(): void {
    let config = JSON.parse(fse.readFileSync(this.getConfigPath(), 'utf-8')) as IConfiguration

    this.rawConfig = config
   }

   public async initializeConfig(promt: Promt): Promise<void> {

    if(this.exists()) return this.setRawConfig()
    
    let config: IConfiguration = {
        clientId: null,
        debug: null,
        userPage: null,
        updateFrequency: null,
        discordButtons: [
            {
                label: "Разработчик",
                url: "https://github.com/TofaDev"
            }
        ],
        activity: {
            images: {
                largeImageKey: 'vk_compact_logo',
                smallImageKey: 'vk_compact_logo'
            },
            text: {
                firstLine: "В данный момент музыка",
                secondLine: "Не играет",

                nowPlaying: "Сейчас играет:",

                largeImageHint: "И зачем ты сюда навелся",
                smallImageHint: "Чееееел"
            }
        }
    }

    const getUserPage = await promt.askUser({
        question: "Введите ссылку на страницу вк, куда транслируется музыка (личная страница/паблик)",
        requiredAnswerType: "string"
    })

    config.userPage = getUserPage

    const getUpdateFrequency = await promt.askUser({
        question: "Введите частоту обновления текущего трека (в секундах, не рекомендуется ставить меньше 5)",
        requiredAnswerType: "number"
    })


    config.updateFrequency = getUpdateFrequency * 1000

    config.discordButtons.push({
        label: "Моя страница ВКонтакте",
        url: getUserPage
    })

    config.debug = false
    config.clientId = "1043146504606597142"

    this.create(config)

    Logger.log(`Конфигурация программы создана по пути: ${this.getConfigPath()} \n. Вы можете вручную его отредактировать, либо удалить чтобы пройти процедуру настройки снова`,
     ConsoleColor.GREEN)

    this.rawConfig = config
    }

}