import { ConsoleColor } from "../enum/ConsoleColor";

export class Logger {

    public static log(message: string, color?: ConsoleColor): void {

        const text = color == undefined ? message : ConsoleColor.getColoredText(message, color)

        console.log(text)

    }
}