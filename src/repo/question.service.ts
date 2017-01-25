import {FirebaseService} from "../common/firebase.service";
import {Question} from "../models/question";
import * as firebase from "firebase-admin";


export class QuestionService {

    collectionName: string = 'questions';
    private questions = [];

    constructor() {

    }

    get(): admin.Promise<Question[]> {

        let db = firebase.database();
        return db.ref('questions').once('value', (questionDTOWrapper) => {

            console.log('questionDTOWrapper: ', questionDTOWrapper);
            let questions: Question[] = [];
            for (let questionDTO in questionDTOWrapper) {
                questions.push(Object.assign(new Question(), questionDTO))
            }

            console.log('questions: ', questions);
            return questions;
        });

        // return FirebaseService.getFirebaseRef(this.collectionName)
        //     .once('value', (questionDTOWrapper) => {
        //         let questions: Question[] = [];
        //         for (let questionDTO in questionDTOWrapper) {
        //             questions.push(Object.assign(new Question(), questionDTO))
        //         }
        //         return questions;
        //     });
    }
}
