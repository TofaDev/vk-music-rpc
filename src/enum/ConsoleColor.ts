import colors from "@colors/colors/safe"

export enum ConsoleColor {
    RED = 'red',
    YELLOW = 'yellow',
    GREEN = 'green'

}

export namespace ConsoleColor {

    export const getColoredText = (text: string, color: ConsoleColor): string => {

        switch (color) {
            case ConsoleColor.GREEN:
                return colors.green(text)
            case ConsoleColor.RED:
                return colors.red(text)
            case ConsoleColor.YELLOW:
                return colors.yellow(text)
            default:
                throw new Error(`Указан неизвестный цвет!`)
        }
    }
}