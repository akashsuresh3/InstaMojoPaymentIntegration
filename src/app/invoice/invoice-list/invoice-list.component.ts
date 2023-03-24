import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from '../invoice.model';
import { InvoiceService } from '../invoice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy{
  // items: Item[] = [
  //   { name: "First Post", cost: 1, quantity: 2 },
  //   { name: "Second Post", cost: 10, quantity: 3 },
  //   { name: "Third Post", cost: 9, quantity: 10 }
  // ];

  // invoiceList: Invoice[] = [
  //   {id: "axwdc", purpose: "12", amount: 250},
  //   {id: "xwdc", purpose: "13", amount: 130}
  // ];

  invoices: Invoice[] = [];
  private invoicesSub: Subscription;

  constructor(public invoiceService: InvoiceService) {}

  ngOnInit(): void {
      this.invoiceService.getInvoices();
      this.invoicesSub = this.invoiceService.getInvoiceUpdateListener()
        .subscribe((invoices: Invoice[]) => {
          this.invoices = invoices;
          console.log(this.invoices);
        });
  }

  openPayment(url: string) {
    // window.open(url, "_blank");
    console.log(url);
    if(url)
      window.location.href = url;
  }

  ngOnDestroy(): void {
      this.invoicesSub.unsubscribe();
  }

}
