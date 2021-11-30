import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User, STATUS } from './../../models/index';
import { TransactionService } from './../../services/transaction.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewChangesService } from './../../services/view-changes.service';
import { NotificationService } from './../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})

export class TransactionComponent implements OnInit {
  public filteredOptions: User[] = [];
  public form: FormGroup;

  constructor(
    private transaction: TransactionService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private viewChanges: ViewChangesService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      amount: ['', [Validators.required, this.amountValidation(0)]]
    })
  }

  ngOnInit(): void {
    this.viewChanges.getBalance.subscribe((balance: number) => {
      this.form.get('amount')?.setValidators([Validators.required, this.amountValidation(balance)]);
    })
  }

  amountValidation(value: number) {
    return (control: FormControl) => {
      if (control.value <= 0 || control.value > value ) {
        return {
          amount: true
        }
      }
      return null;
    }
  }

  handleChange(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.value) {
      this.transaction.getUserList(target.value).subscribe(
        (res) => {
          this.filteredOptions = res;
        }
      )
    } else {
      this.filteredOptions = [];
    }
  }

  handleSubmit() {
    if (this.form.status === STATUS.VALID) {
      const name = this.form.get('user')?.value;
      const amount = this.form.get('amount')?.value;

      this.transaction.sendTransaction({name, amount}).subscribe(
        response => {
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
}
