import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Invoice } from '../invoice.model';
import { InvoiceService } from '../invoice.service';
// import { mimeType } from "./mime-type.validator";


@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent{
  isLoading = false;
  form: FormGroup;
  private mode = "create";

  enteredTitle = ''
  enteredContent = ''

  constructor(public invoiceService: InvoiceService) {}

  // ngOnInit() {
  //   this.form = new FormGroup({
  //     title: new FormControl(null, {
  //       validators: [Validators.required, Validators.minLength(3)]
  //     }),
  //     content: new FormControl(null, { validators: [Validators.required] }),
  //     image: new FormControl(null, {
  //       validators: [Validators.required],
  //       // asyncValidators: [mimeType]
  //     })
  //   });
  // }

  onAddPost(form: NgForm) {
    // console.log("hi");
    if(form.invalid) {
      return;
    }
    this.invoiceService.addInvoice(form.value.amount, form.value.purpose);
    form.resetForm();
    // const invoice: Invoice = {
    //   amount: form.value.amount,
    //   purpose: form.value.purpose
    // }
  }

  onSavePost() {
    // if (this.form.invalid) {
    //   return;
    // }
    // this.isLoading = true;
    // if (this.mode === "create") {
    //   this.postsService.addPost(
    //     this.form.value.title,
    //     this.form.value.content,
    //     this.form.value.image
    //   );
    // } else {
    //   this.postsService.updatePost(
    //     this.postId,
    //     this.form.value.title,
    //     this.form.value.content,
    //     this.form.value.image
    //   );
    // }
    // this.form.reset();
  }
}
