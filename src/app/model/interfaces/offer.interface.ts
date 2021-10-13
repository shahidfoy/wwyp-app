import { Offer } from "../offer";

export interface OfferInterface extends Offer {
    username: string;
    userProfileImage: string;
}