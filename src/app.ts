import express = require("express");
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");
import {Application, Request, Response} from "express";
import {UserService} from "./service/UserService";
import {User} from "./entity/User";

const cors = require('cors');

export class App {


    public app: Application;

    private categoryRouteName: string;
    private subCategoryRouteName: string;
    private productRouteName: string;
    private userRouteName: string;

    constructor(userRouteName, categoryRouteName, subCategoryRouteName, productRouteName) {

        this.app = express();

        this.categoryRouteName = categoryRouteName;
        this.subCategoryRouteName = subCategoryRouteName;
        this.productRouteName = productRouteName;
        this.userRouteName = userRouteName;

        this.plugins();

        this.userRoute()

    }


    plugins() {
        this.app.use(bodyParser.urlencoded({extended: false}))
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
    }


    protected userRoute() {

        this.app.post(`/${this.userRouteName}`, async (req: Request, res: Response) => {

            try {
                await new UserService().save(new User(req.body.username, await bcrypt.hash(req.body.password, 10))).then(()=>{
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {
            try {

                const user = await new UserService().findByName(req.body.username);
                const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                    ? res.sendStatus(200) : res.sendStatus(403))

            } catch {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/findUserByHash`, async (req: Request, res: Response) => {
            try {
                res.send(await new UserService().findByHashId(req.body.token));
            } catch (e) {
                res.send(e)
            }
        })

    }
}
