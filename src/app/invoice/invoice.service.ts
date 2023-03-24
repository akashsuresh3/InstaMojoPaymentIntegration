import { Injectable } from "@angular/core";
import { Invoice } from "./invoice.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class InvoiceService {
  private invoices: Invoice[] = [];
  private invoicesUpdated = new Subject<Invoice[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getInvoices() {
    this.http.get<{message: string, invoices: Invoice[]}>('http://localhost:3000/api/invoices')
      .subscribe((invoiceData) => {
        this.invoices = invoiceData.invoices;
        this.invoicesUpdated.next([...this.invoices]);
      })
  }

  getInvoiceUpdateListener() {
    return this.invoicesUpdated.asObservable();
  }

  addInvoice(amount: number, purpose: string) {
    const invoice: Invoice = {id: "", amount: amount, purpose: purpose, status:"",redirect:""};
    const invoice1 = {amount: amount, purpose: purpose};


    this.http.post<{message:string, redirect:string}>('http://localhost:3000/api/invoices', invoice)
      .subscribe((responseData) => {
        console.log(responseData);
        invoice.redirect = responseData.redirect;
        this.invoices.push(invoice);
        this.invoicesUpdated.next([...this.invoices]);
      });

    // console.log(this.invoices);
  }
}


// P21sMgy9hN1e0y5C
