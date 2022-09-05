import { WriteOff } from "./write-off";

/* eslint-disable @typescript-eslint/naming-convention */
export class SaleItem {
    saleItemID?: number;
    name: string;
    photo?: string;
    description: string;
    quotable?: boolean;
    quantityOnHand: number;
    writeOffs?: WriteOff[];
    saleCategoryID?: number;
    saleCategory?:{
      saleCategoryID?: number;
      name?:string;
      description?:string;
    }
    priceHistory?: [{
        priceHistoryID?:number,
        date?:Date,
        costAmount:number,
        saleAmount:number;
      }];
}
