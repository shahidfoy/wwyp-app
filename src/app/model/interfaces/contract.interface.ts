import { Contract } from "../contract";
import { Offer } from "../offer";

export interface ContractInterface extends Contract {
    bestOffer: Offer;
    highestOffer: Offer;
    lowestOffer: Offer;
}