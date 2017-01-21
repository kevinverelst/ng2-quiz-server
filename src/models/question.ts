import {QuestionDTO} from "./dto/questionDTO";
import * as moment from "moment";
export class Question implements QuestionDTO {
    question: string;
    answers: string[];
    correctAnswer: number;

    // Added fields
    dateCreated: string = moment().toString();
    createdBy: string = 'Wazaa';

}