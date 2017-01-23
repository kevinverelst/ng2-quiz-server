export interface QuestionDTOWrapper{
    questions: QuestionDTO[]
}

export interface QuestionDTO {
    question: string;
    answers: string[];
    correctAnswer: number;
}
