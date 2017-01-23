import {FirebaseService} from "../common/firebase.service";
import {IRepo} from "./IRepo";
import {Question} from "../models/question";
import {isBoolean} from "util";

export class QuestionService implements IRepo<Question> {

    collectionName: string = 'questions';
    private questions = [];

    constructor() {

    }


    get(): admin.Promise<Question[]> {
        return FirebaseService.getFirebaseRef(this.collectionName)
            .once('value', (questionDTOWrapper) => {
                let questions: Question[] = [];
                questionDTOWrapper.forEach((questionDTO) => {
                    questions.push(Object.assign(new Question(), questionDTO))
                });
                return questions;
            });
    }
}
