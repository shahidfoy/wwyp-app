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

  public countContractByContracteeId(contracteeId: number): Observable<number> {
    return this.http.get<number>(`${this.host}/contract/count/contractee/${contracteeId}`);
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

  public findContractByContracteeId(contracteeId: number, page: number): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${this.host}/contract/find/contractee?page=${page}`, contracteeId);
  }

  public findContractByContractorId(contractorId: number): Observable<Contract[]> {
    return this.http.post<Contract[]>(`${this.host}/contract/find/contractor`, contractorId);
  }

  public getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.host}/contract/find/all`);
  }

  // public addContractFormData(loggedInUserId: number, contract: Contract): FormData {
  //   const formData: FormData = new FormData();
  //   formData.append('contracteeId', loggedInUserId.toString());
  //   formData.append('status', null);
  //   formData.append('type', contract.type);
  //   formData.append('subject', contract.subject);
  //   formData.append('body', contract.body);
  //   formData.append('contractImageUrls', contract.contractImageUrls);


  //   return formData;
  // }
}
