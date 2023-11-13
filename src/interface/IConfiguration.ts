export interface IDiscordButtons {
  label: string;
  url: string;
}

export interface IConfiguration {
  debug: boolean | null;
  discordButtons: IDiscordButtons[];
  websocketPort: number;
  clientId: string;

  activity: {
    images: {
      largeImageKey: string;
      smallImageKey: string;
    };
    text: {
      firstLine: string;
      secondLine: string;

      nowPlaying: string;

      largeImageHint: string;
      smallImageHint: string;
    };
  };

  musicSource: {
    yandex: string;
    vk: string;
  };
}
