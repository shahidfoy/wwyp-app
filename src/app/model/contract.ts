import { Offer } from "./offer";
import { User } from "./user";

export class Contract {
    public id: number;
    public contracteeId: number;
    public contractorId: number;
    public status: string;
    public type: string;
    public subject: string;
    public body: string;
    public contractImageUrls: string[];
    public acceptedOffer: Offer;
    public legalAgreement: string;
    public createdDate: Date;
    public lastUpdatedDate: Date;
    public highestOffer: Offer;

    constructor() {
        this.id = null;
        this.contracteeId = null;
        this.contractorId = null;
        this.status = '';
        this.type = '';
        this.subject = '';
        this.body = '';
        this.contractImageUrls = [];
        this.acceptedOffer = null;
        this.legalAgreement = '';
        this.createdDate = null;
        this.lastUpdatedDate = null;
        this.highestOffer = new Offer();
    }
}