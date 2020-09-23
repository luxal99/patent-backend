import "reflect-metadata";
import {createConnection} from "typeorm";
import {App} from "./app";

createConnection().then(async connection => {

    console.log('Connected to Database')
    await new App("user", "category", "subCategory", "product","manufacturer").app.listen(3000, () => {
        console.log('Listen on port 3000')
    });
}).catch(error => console.log(error));
