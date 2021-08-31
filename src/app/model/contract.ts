import { Offer } from "./offer";
import { User } from "./user";

export class Contract {
    public id: number;
    public contractee: User;
    public contractor: User;
    public status: string;
    public type: string;
    public subject: string;
    public body: string;
    public contractImageUrls: string[];
    public acceptedOffer: Offer;
    public legalAgreement: string;
    public createdDate: Date;
    public lastUpdatedDate: Date;

    constructor() {
        this.id = null;
        this.contractee = null;
        this.contractor = null;
        this.status = '';
        this.type = '';
        this.subject = '';
        this.body = '';
        this.contractImageUrls = [];
        this.acceptedOffer = null;
        this.legalAgreement = '';
        this.createdDate = null;
        this.lastUpdatedDate = null;
    }
}