
import { Employee } from "./employee";
import { SaleItem } from "./sale-item";
import { WriteOffReason } from "./write-off-reason";

export class WriteOff {
    writeOffID?: number;
    employeeID: number;
    employee?: {
        appUser: {
            firstName: string,
            lastName: string
        }
    }
    writeOffLine: [{
        quantity: number,
        writeOffReasonID: number,
        writeOffReason?: WriteOffReason,
        saleItemID: number,
        saleItem?: SaleItem
    }]

}
