import {Router, Request, Response, NextFunction} from 'express';
import * as firebase from "firebase-admin";
import {serviceAccount} from "../serviceAccount";

const QUESTIONS = [{id: 1}];

export class QuestionRouter {
    router: Router;
    db;
    questions;

    constructor() {
        this.router = Router();
        this.init();

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: "https://ng-quiz-462b4.firebaseio.com"
        });
        this.db = firebase.database();
        this.questions = this.db.ref("questions");
    }

    public create(req: Request, res: Response) {
        debugger;
        console.log(req);
        // this.questions.set({
        //     question: req.body.question,
        //     answers: req.body.answers,
        //     correctAnswer: req.body.correctAnswer
        // });
        // let question = req.body;
        // res.status(200)
        //     .send({
        //         message: 'Success',
        //         status: res.status,
        //         question
        //     })
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

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
    }
}

const QUESTIONROUTER = new QuestionRouter();
QUESTIONROUTER.init();

export default QUESTIONROUTER.router;
