import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Offer } from '../model/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public addOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.host}/offer/add`, offer);
  }

  public countOfferByContractId(contractId: number): Observable<number> {
    return this.http.get<number>(`${this.host}/offer/count/contract/${contractId}`);
  }

  public countOfferByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.host}/offer/count/user/${userId}`);
  }

  public deleteOffer(id: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/offer/delete/${id}`);
  }

  public editOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.host}/offer/edit`, offer);
  }

  public approveOffer(id: number, approved: boolean): Observable<Offer> {
    return this.http.post<Offer>(`${this.host}/offer/approve/${id}/${approved}`, {});
  }

  public findOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.host}/offer/${id}`);
  }

  public findOfferByContractId(id: number, page: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.host}/offer/find/contract/${id}?page=${page}`);
  }

  public findOfferByContractIdOrderByAmountAsc(id: number, page: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.host}/offer/find/contract/${id}/lowest?page=${page}`);
  }

  public findOfferByContractIdAndUserId(contractId: number, userId: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.host}/offer/find/contract/${contractId}/user/${userId}`);
  }

  public findOfferByUserId(id: number, page: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.host}/offer/find/user/${id}?page=${page}`);
  }

  public getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.host}/offer/find/all`);
  }

  public highestOfferByContractId(contractId: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.host}/offer/contract/highest-offer/${contractId}`);
  }

  public lowestOfferByContractId(contractId: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.host}/offer/contract/lowest-offer/${contractId}`);
  }
}
