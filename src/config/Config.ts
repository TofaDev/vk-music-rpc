import fse from "fs-extra"
import {Promt} from "../cli/Promt"
import {ConsoleColor} from "../enum/ConsoleColor"
import {IConfiguration} from "../interface/IConfiguration"
import {Logger} from "../utils/Logger"

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
        clientId: "1043146504606597142",
        debug: null,
        websocketPort: 8112,
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

    config.debug = false

    this.create(config)

       Logger.log(`Конфигурация программы создана по пути: ${this.getConfigPath()} \n. Вы можете вручную его отредактировать, либо удалить чтобы пройти процедуру настройки снова`,
      ConsoleColor.GREEN)
        Logger.log(`Обращаю ваше внимание на то, что программа потерпела серьезные изменения на новой версии 1.0.0, поэтому для её работы требуется установить расширение. Подробную инструкцию Вы можете найти на странице проекта`,
       ConsoleColor.YELLOW)

    this.rawConfig = config
    }

}