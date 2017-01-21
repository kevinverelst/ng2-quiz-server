import {Router, Request, Response, NextFunction} from 'express';
import * as firebase from "firebase-admin";
import {serviceAccount} from "../serviceAccount";
import {FirebaseService} from "../common/firebase.service";
import {Question} from "../models/question";
import {QuestionDTO} from "../models/dto/questionDTO";

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
        debugger;
        console.log(req);
        let questionDTO: QuestionDTO = req.body;
        let question: Question = Object.assign(new Question(), questionDTO);
        let questions = FirebaseService.getFirebaseRef('questions');
        questions.set({
            question
        });
        res.status(200)
            .send({
                message: 'Success',
                status: res.status,
                question
            })
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(QUESTIONS);
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
