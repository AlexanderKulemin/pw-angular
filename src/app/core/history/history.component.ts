import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { TransactionItem } from '../../models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public items: TransactionItem[] = [];

  constructor(
    private transaction: TransactionService
  ) {
  }

  ngOnInit(): void {
    this.transaction.getTransactionList().subscribe(resp => {
      this.items = resp.trans_token;
    })
  }
}
