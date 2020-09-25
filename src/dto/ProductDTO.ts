export class ProductDTO {
    title;
    id;
    amounts;
    total
    price;


    constructor(id, title, amounts,price, total) {
        this.title = title;
        this.id = id;
        this.price = price;
        this.amounts = amounts;
        this.total = total;
    }
}
