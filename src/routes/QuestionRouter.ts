import {Router, Request, Response, NextFunction} from 'express';
const QUESTIONS = [{id: 1}];

export class QuestionRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(QUESTIONS);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let question = QUESTIONS.find(question => question.id === query);
        console.log('QUESTION: '+ question);
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
    }
}

const QUESTIONROUTER = new QuestionRouter();
QUESTIONROUTER.init();

export default QUESTIONROUTER.router;
