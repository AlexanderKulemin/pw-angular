import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { TransactionItem } from '../../models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public items: TransactionItem[] = [];


  constructor(
    private transaction: TransactionService
  ) {
  }

  ngOnInit(): void {
    this.transaction.getTransactionList().subscribe(resp => {
      this.items = resp.trans_token.slice(-5).reverse();
    })
  }
}
