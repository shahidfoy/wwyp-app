import { Contract } from "./contract";

export class Offer {
    public id: number;
    public contract: Contract;
    public userId: number;
    public username: string;
    public userProfileImage: string;
    public comment: string;
    public amount: number;
    public amountType: string;
    public approved: boolean;
    public createdDate: Date;
    public lastUpdatedDate: Date;

    constructor() {
        this.id = null;
        this.contract = null;
        this.userId = null;
        this.username = '';
        this.userProfileImage = '';
        this.comment = '';
        this.amount = 0;
        this.amountType = '';
        this.approved = false;
        this.createdDate = null;
        this.lastUpdatedDate = null;
    }
}