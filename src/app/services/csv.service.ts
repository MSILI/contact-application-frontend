import {Injectable} from '@angular/core';
import {API_URL} from "../utils/app.const";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  private resourceUrl = `${API_URL}/csv`;

  constructor(private http: HttpClient) {
  }

  public upload(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.resourceUrl}/upload`, formData);
  }
}
