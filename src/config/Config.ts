import fse from "fs-extra";
import { Promt } from "../cli/Promt";
import { ConsoleColor } from "../enum/ConsoleColor";
import { IConfiguration } from "../interface/IConfiguration";
import { Logger } from "../utils/Logger";

export default class Config {
  private rawConfig: IConfiguration | undefined;

  public create(config: IConfiguration): void {
    if (this.exists()) throw new Error(`Конфиг уже существует!`);

    fse.writeFileSync(this.getConfigPath(), JSON.stringify(config, null, 4));
  }

  public get(): IConfiguration | null | undefined {
    if (!this.exists()) return null;

    return this.rawConfig;
  }

  public exists(): boolean {
    return fse.existsSync(this.getConfigPath());
  }

  public getConfigPath(): string {
    return `${process.cwd()}/config.json`;
  }

  private setRawConfig(): void {
    let config = JSON.parse(
      fse.readFileSync(this.getConfigPath(), "utf-8")
    ) as IConfiguration;

    this.rawConfig = config;
  }

  public async initializeConfig(promt: Promt): Promise<void> {
    if (this.exists()) return this.setRawConfig();

    let config: IConfiguration = {
      clientId: "1043146504606597142",
      debug: null,
      websocketPort: 8112,
      discordButtons: [
        {
          label: "Разработчик",
          url: "https://github.com/TofaDev",
        },
      ],
      activity: {
        images: {
          largeImageKey: "vk_compact_logo",
          smallImageKey: "vk_compact_logo",
        },
        text: {
          firstLine: "В данный момент музыка",
          secondLine: "Не играет",

          nowPlaying: "Сейчас играет на %source%:",

          largeImageHint: "И зачем ты сюда навелся",
          smallImageHint: "Чееееел",
        },
      },
      musicSource: {
        vk: "Вконтакте",
        yandex: "Я. Музыка",
      },
    };

    config.debug = false;

    this.create(config);

    Logger.log(
      `Конфигурация программы создана по пути: ${this.getConfigPath()} \n. Вы можете вручную его отредактировать, либо удалить чтобы пройти процедуру настройки снова`,
      ConsoleColor.GREEN
    );
    Logger.log(
      `Программа была обновлена до версии 1.1.0, рекомендуется удалить старый config.json для корректной работы`,
      ConsoleColor.YELLOW
    );

    this.rawConfig = config;
  }
}
