import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionItem } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { RepeatTransactionComponent } from '../repeat-transaction/repeat-transaction.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['id', 'name', 'amount', 'date', 'balance', 'actions'];
  public dataSource: MatTableDataSource<TransactionItem>;
  //@ts-ignore
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @Input() data: TransactionItem[] = [];

  constructor(
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }



  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  handleRepeat(item: TransactionItem): void {
    this.dialog.open(RepeatTransactionComponent, {data: item});
  }
}
