import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionItem } from 'src/app/models';
import { TransactionService } from '../../services/transaction.service';
import { NotificationService } from './../../services/notification.service';
import { ViewChangesService } from './../../services/view-changes.service';

@Component({
  selector: 'app-repeat-transaction',
  templateUrl: './repeat-transaction.component.html',
  styleUrls: ['./repeat-transaction.component.scss']
})
export class RepeatTransactionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransactionItem,
    private transaction: TransactionService,
    private notification: NotificationService,
    private viewChanges: ViewChangesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('DATA', this.data);
  }

  handleSubmit() {
    this.transaction.sendTransaction({amount: Math.abs(this.data.amount), name: this.data.username})
      .subscribe(
        response => {
          console.log(response);

          const { trans_token } = response;
          const balance = trans_token.balance;
          this.viewChanges.setBalance(balance);

          this.notification.show('Transaction completed successfully')
        },
        error => {
          this.notification.showError(error.error)
        }
      )
    this.dialog.closeAll();
  }
}
