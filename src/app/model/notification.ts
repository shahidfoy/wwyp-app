import { Contract } from "./contract";
import { Offer } from "./offer";

export class Notification {
    public id: number;
    public userId: number;
    public contract: Contract;
    public offer: Offer;
    public message: string;
    public markedRead: boolean;
    public createdDate: Date;

    constructor() {
        this.id = null;
        this.userId = null;
        this.contract = new Contract();
        this.offer = new Offer();
        this.message = '';
        this.markedRead = false;
        this.createdDate = null;
    }
}
