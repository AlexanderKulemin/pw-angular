import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Transaction, TransactionList } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = environment.BASE_URL;

  constructor(
    private http: HttpClient
  ) { }

  getUserList(value: string) {
    return this.http.post<User[]>(`${this.baseUrl}/api/protected/users/list`, {filter: value})
  }

  sendTransaction(data: {amount: number, name: string}) {
    return this.http.post<Transaction>(`${this.baseUrl}/api/protected/transactions`, data);
  }

  getTransactionList() {
    return this.http.get<TransactionList>(`${this.baseUrl}/api/protected/transactions`);
  }
}
