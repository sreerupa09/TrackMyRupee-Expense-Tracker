import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  api = "http://localhost:5246/api/expense";

  constructor(private http: HttpClient) {}

  getExpenses(){
    return this.http.get<any[]>(this.api);
  }
}