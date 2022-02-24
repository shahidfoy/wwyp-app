import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../model/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public findSubCategoryById(id: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.host}/subcategory/find/${id}`);
  }

  public findSubCategoryByName(name: string): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.host}/subcategory/find/name/${name}`);
  }

  public findSubCategoryByCategoryName(name: string): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.host}/subcategory/find/category/${name}`);
  }

  public getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.http}/subcategory/find/all`);
  }
}
