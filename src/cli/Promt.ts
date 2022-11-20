import promtLib from "prompt" 
import { IQuestionParams } from "../interface/IQuestionParams"

export class Promt {

    constructor() {
        this.initialize()
    }

    private async initialize(): Promise<void> {

        promtLib.message = "Настройка RPC клиента"

        promtLib.start({
            noHandleSIGINT: true
        })

    }

    public async askUser(questionParams: IQuestionParams): Promise<any> {

        const {question, requiredAnswerType} = questionParams

        return new Promise((resolve, reject) => {
            promtLib.get({
                
                description: question,
                required: true,
                type: requiredAnswerType

            }, (err, result) => {
                if(err) reject(err)

                resolve(result.question)
            })
        })
    }
    
}