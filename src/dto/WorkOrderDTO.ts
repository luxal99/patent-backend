import {Product} from "../entity/Product";
import {ProductDTO} from "./ProductDTO";

export class WorkOrderDTO {

    idWorkOrder: number;
    date:string;
    listOfProduct: ProductDTO[];


    constructor(idWorkOrder?: number,date? : string) {
        this.idWorkOrder = idWorkOrder;
        this.date = date;
        this.listOfProduct = [];

    }
}
