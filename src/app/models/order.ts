import { SaleItem } from "./sale-item";

export class Order {
    constructor(
        public user: any,
        public order: SaleItem[],
        public total: number,
        public grandTotal: number,
        public status: string,
        public time: string,
        public paid: string,
        public id?: string,
        public uid?: string,
    ) {}
}