import express = require("express");
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");
import {Application, Request, Response} from "express";
import {UserService} from "./service/UserService";
import {User} from "./entity/User";
import set = Reflect.set;
import {CategoryService} from "./service/CategoryService";
import {Category} from "./entity/Category";
import {SubCategory} from "./entity/SubCategory";
import {SubCategoryService} from "./service/SubCategoryService";
import {ManufacturerService} from "./service/ManufacturerService";
import {Manufacturer} from "./entity/Manufacturer";
import {Product} from "./entity/Product";
import {ProductService} from "./service/ProductService";
import {WorkOrder} from "./entity/WorkOrder";
import {WorkOrderService} from "./service/WorkOrderService";
import {WorkOrderAndProduct} from "./entity/WorkOrderAndProduct";
import {createDeflateRaw} from "zlib";
import {WorkOrderAndProductService} from "./service/WorkOrderAndProductService";

const cors = require('cors');

export class App {

    public app: Application;

    private categoryRouteName: string;
    private subCategoryRouteName: string;
    private productRouteName: string;
    private manufacturerRouteName: string;
    private userRouteName: string;
    private workOrderRouteName: string


    constructor(userRouteName, categoryRouteName, subCategoryRouteName, productRouteName, manufacturerRouteName, workOrderRouteName) {

        this.app = express();

        this.categoryRouteName = categoryRouteName;
        this.subCategoryRouteName = subCategoryRouteName;
        this.productRouteName = productRouteName;
        this.userRouteName = userRouteName;
        this.manufacturerRouteName = manufacturerRouteName;
        this.workOrderRouteName = workOrderRouteName;

        this.plugins();

        this.userRoute();
        this.categoryRoute()
        this.subCategoryRoute();
        this.manufacturerRoute();
        this.productRoute();
        this.workOrderRoute();

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
                await new UserService().save(new User(req.body.username, await bcrypt.hash(req.body.password, 10))).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {
            const user = await new UserService().findByName(req.body.username);
            const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                ? res.send(await bcrypt.hash(JSON.stringify(user.id), 10)) : res.sendStatus(403))

        })

        this.app.post(`/${this.userRouteName}/findUserByHash`, async (req: Request, res: Response) => {
            try {
                res.send(await new UserService().findByHashId(req.body.token));
            } catch (e) {
                res.send(e)
            }
        })

    }

    protected categoryRoute() {
        this.app.post(`/${this.categoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new CategoryService().save(new Category(req.body.title)).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500);
            }
        })

        this.app.get(`/${this.categoryRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new CategoryService().getAll());
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    protected manufacturerRoute() {
        this.app.post(`/${this.manufacturerRouteName}`, async (req: Request, res: Response) => {
            try {
                await new ManufacturerService().save(new Manufacturer(req.body.title)).then(() => {
                    res.sendStatus(200);
                })
            } catch (e) {
                res.sendStatus(500)
            }
        })

        this.app.get(`/${this.manufacturerRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new ManufacturerService().getAll());
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    protected subCategoryRoute() {
        this.app.post(`/${this.subCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                await new SubCategoryService().save(new SubCategory(req.body.title, req.body.idCategory)).then(() => {
                    res.sendStatus(200);
                });
            } catch (e) {
                res.sendStatus(500)
            }
        })

        this.app.get(`/${this.subCategoryRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new SubCategoryService().getAll());
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    protected productRoute() {
        this.app.post(`/${this.productRouteName}`, async (req: Request, res: Response) => {
            try {
                await new ProductService().save(new Product(
                    req.body.title,
                    req.body.price,
                    req.body.amount,
                    req.body.idManufacturer,
                    req.body.code,
                    req.body.idSubCategory
                )).then(() => {
                    res.sendStatus(200)
                })
            } catch (e) {
                res.sendStatus(500)
            }
        })

        this.app.put(`/${this.productRouteName}`, async (req: Request, res: Response) => {
            try {
                const product: Product = req.body;
                await new ProductService().update(product).then(() => {
                    res.sendStatus(200);
                });
            } catch (e) {
                res.send(e);
            }
        })

        this.app.get(`/${this.productRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await new ProductService().getAll());
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

    protected workOrderRoute() {
        this.app.post(`/${this.workOrderRouteName}`, async (req: Request, res: Response) => {
            try {
                await new WorkOrderService().save(new WorkOrder(req.body.date, req.body.listOfProducts)).then(() => {
                    res.send(200);
                })
            } catch (e) {
                res.sendStatus(e);
            }
        })

        this.app.get(`/${this.workOrderRouteName}`, async (req: Request, res: Response) => {
            res.send(await new WorkOrderService().getAll());

        })

        this.app.get(`/${this.workOrderRouteName}/:id`, async (req: Request, res: Response) => {

                res.send(await new WorkOrderService().getWorkOrderItems(req.params.id))

        })
        this.app.put(`/${this.workOrderRouteName}`, async (req: Request, res: Response) => {
            try {
                let listOfProducts: Array<Product> = req.body.listOfProducts;


                console.log(listOfProducts)
                for (const product of listOfProducts) {

                    let workOrder = new WorkOrder();
                    workOrder.id = req.body.id;

                    let workOrderAndProduct = new WorkOrderAndProduct(workOrder, product);
                    await new WorkOrderAndProductService().save(workOrderAndProduct);
                }

                res.sendStatus(200);

            } catch (e) {
                res.sendStatus(e)
            }
        })
    }
}
