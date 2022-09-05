import { SaleItem } from "./sale-item";
import { Schedule } from "./schedule";

export class saleLine {
    saleItemID: number;
    saleItem?: SaleItem;
    quantity: number;
    subTotalPrice?: number;
}

export class bookingLine {
    scheduleID: number;
    schedule?: Schedule;
}

export class Cart {
    public userId: string;
    public paymentTypeId?: number;
    public sales?: saleLine[]=[];
    public bookings?: bookingLine[]=[];
    public grandPriceTotal: number;
    public grandItemTotal: number;
}
