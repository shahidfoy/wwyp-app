import { Offer } from "./offer";

export class Contract {
    public id: number;
    public contracteeId: number;
    public contractorId: number;
    public status: string;
    public type: string;
    public subTypes: string[];
    public subject: string;
    public body: string;
    public contractImageUrls: string[];
    public acceptedOffer: Offer;
    public legalAgreement: string;
    public seekingLowestOffer: boolean;
    public createdDate: Date;
    public lastUpdatedDate: Date;

    constructor() {
        this.id = null;
        this.contracteeId = null;
        this.contractorId = null;
        this.status = '';
        this.type = '';
        this.subTypes = [];
        this.subject = '';
        this.body = '';
        this.contractImageUrls = [];
        this.acceptedOffer = null;
        this.legalAgreement = '';
        this.seekingLowestOffer = false;
        this.createdDate = null;
        this.lastUpdatedDate = null;
    }
}
