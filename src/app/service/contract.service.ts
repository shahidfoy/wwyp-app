import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../model/contract';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Offer } from '../model/offer';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public addContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.host}/contract/add`, contract);
  }

  public assignContract(id: number, contractor: User, offer: Offer): Observable<Contract> {
    return this.http.post<Contract>(`${this.host}/contract/assign/${id}`, {contractor, offer});
  }

  public deleteContract(id: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/contract/delete/${id}`);
  }

  public editContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.host}/contract/edit`, contract);
  }

  public findContractById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.host}/contract/${id}`);
  }

  public findContractByStatus(status: string): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.host}/contract/find/status/${status}`);
  }

  public findContractByType(type: string): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.host}/contract/find/type/${type}`);
  }

  public findContractByContractee(contractee: User): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${this.host}/contract/find/contractee`, contractee);
  }

  public findContractByContractor(contractor: User): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${this.host}/contract/find/contractor`, contractor);
  }

  public getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.host}/contract/find/all`);
  }
}
