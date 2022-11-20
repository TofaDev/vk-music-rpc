export interface IDiscordButtons {
    label: string
    url: string
}

export interface IConfiguration {
    clientId: string | null
    userPage: string | null
    debug: boolean | null
    discordButtons: IDiscordButtons[]
    updateFrequency: number | null

    activity: {
        images: {
            largeImageKey: string
            smallImageKey: string
        },
        text: {
            firstLine: string
            secondLine: string

            nowPlaying: string

            largeImageHint: string
            smallImageHint: string
        }
    }
}