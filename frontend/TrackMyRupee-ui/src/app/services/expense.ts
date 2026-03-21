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

  deleteExpense(id:number){
    return this.http.delete(`${this.api}/${id}`);
  }

  updateExpense(id:number, data:any){
    return this.http.put(`${this.api}/${id}`, data);
  }

  getExpenseById(id:number){
    return this.http.get(`${this.api}/${id}`);
  }
}