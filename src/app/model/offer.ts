export class Offer {
    public id: number;
    public contractId: number;
    public userId: number;
    public username: string;
    public comment: string;
    public amount: number;
    public amountType: string;
    public approved: boolean;
    public createdDate: Date;
    public lastUpdatedDate: Date;

    constructor() {
        this.id = null;
        this.contractId = null;
        this.userId = null;
        this.username = '';
        this.comment = '';
        this.amount = 0;
        this.amountType = '';
        this.approved = false;
        this.createdDate = null;
        this.lastUpdatedDate = null;
    }
}