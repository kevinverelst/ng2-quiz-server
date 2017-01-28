import {Router, Request, Response, NextFunction} from 'express';
import * as firebase from "firebase-admin";
import {serviceAccount} from "../serviceAccount";
import {FirebaseService} from "../common/firebase.service";
import {Question} from "../models/question";
import {QuestionDTO} from "../models/dto/questionDTO";
import {QuestionService} from "../repo/question.service";

const QUESTIONS = [{id: 1}];

export class QuestionRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: "https://ng-quiz-462b4.firebaseio.com"
        });
    }

    public create(req: Request, res: Response) {
        let questionDTO: QuestionDTO = req.body;
        let question: Question = Object.assign(new Question(), questionDTO);
        FirebaseService.getFirebaseRef('questions').push({
            question: question.question,
            answers: question.answers,
            correctAnswer: question.correctAnswer,
            dateCreated: question.dateCreated,
            createdBy: question.createdBy
        }, function (error) {
            if (error) {
                console.error('Data could not be written');
                res.status(500)
                    .send({
                        message: 'Data could not be written',
                        status: res.status
                    })
            } else {
                res.status(200)
                    .send({
                        message: 'Success',
                        status: res.status,
                        question
                    })
            }
        });

    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        // res.send(QUESTIONS);
        let db = firebase.database();
        db.ref('questions').on('value', (snapshot) => {

            console.log('snapshot: ', snapshot.val());

            let questions: Question[] = [];
            for (let questionDTO in snapshot.val()) {
                questions.push(Object.assign(new Question(), questionDTO))
            }

            // console.log('questions: ', questions);
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    questions
                });
        });

    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let question = QUESTIONS.find(question => question.id === query);
        console.log('QUESTION: ' + question);
        if (question) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    question
                });
        } else {
            res.status(404)
                .send({
                    body: 'No question found with the given id',
                    status: res.status
                });
        }
    }

    private getFirebaseReference() {

    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
    }
}

const QUESTIONROUTER = new QuestionRouter();
QUESTIONROUTER.init();

export default QUESTIONROUTER.router;
