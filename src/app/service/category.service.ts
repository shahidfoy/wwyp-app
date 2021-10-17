import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public findCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.host}/category/find/${id}`);
  }

  public findCategoryByName(name: string): Observable<Category> {
    return this.http.get<Category>(`${this.host}/category/find/name/${name}`);
  }

  public findCategoryBySubCategoryName(name: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.host}/category/find/subcategory/${name}`);
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.http}/category/find/all`);
  }
}
