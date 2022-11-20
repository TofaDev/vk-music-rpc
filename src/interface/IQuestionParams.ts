export type Types = 'string' | 'number' | 'integer' | 'array' | 'boolean' | 'object' | 'null' | 'any';

export interface IQuestionParams {
    question: string,
    requiredAnswerType?: Types

}