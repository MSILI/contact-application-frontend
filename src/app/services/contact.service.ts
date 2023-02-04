import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Contact} from "../model/contact.model";
import {Observable} from "rxjs";
import {API_URL} from "../utils/app.const";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private resourceUrl = `${API_URL}/contacts`;

  constructor(private http: HttpClient) {
  }

  public findAllByFirstnameOrLastname(query?: string | null): Observable<Contact[]> {
    if (!query) {
      query = '';
    }
    const params = new HttpParams().set('q', query);
    return this.http.get<Contact[]>(`${this.resourceUrl}`, {params});
  }

  public findById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.resourceUrl}/${id}`);
  }

  public save(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.resourceUrl, contact);
  }

  public update(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.resourceUrl, contact);
  }

  public deleteById(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

}
