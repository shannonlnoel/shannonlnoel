import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Supplier } from 'src/app/models/supplier';
import { GlobalService } from 'src/app/services/global/global.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {

  cSupplierForm: UntypedFormGroup = this.formBuilder.group({
    supplierName : ['', [Validators.required]],
    supplierEmail : ['', [Validators.required, Validators.email]],
    supplierCell : ['', Validators.required],
    supplierAddress : [''],
  });

  resolved = false;
  long = -1;
  lat = -1;
  address = '';
  addresserror = false;

  constructor(private formBuilder : FormBuilder, private supplierService : SupplierService, private modalCtrl : ModalController, public global: GlobalService) { }

  get errorControl() {
    return this.cSupplierForm.controls;
  }

  ngOnInit() {
    this.cSupplierForm.valueChanges.subscribe(data => {
      if (!this.resolved && data.supplierAddress.length != 0) {
        this.addresserror = true;
      }
    })
  }

  handleAddressChange(event : any) {
    this.addresserror = false;
    this.resolved = true;
    console.log(event);
    this.long = this.midpoint(event.geometry.viewport.yb.hi, event.geometry.viewport.yb.lo);
    this.lat = this.midpoint(event.geometry.viewport.Qa.hi, event.geometry.viewport.Qa.lo);
    this.address = '';
    event.address_components.forEach((component : any, i : number) => {
      this.address += component.long_name;
      if (i < event.address_components.length - 1) {
        this.address += ', ';
      } else {
        this.address += '.';
      }
    });
    console.log(this.address)
  }

  submitForm() {

    if (!this.cSupplierForm.valid) {
      return;
    }

    const supplier = new Supplier();
    supplier.name = this.cSupplierForm.get('supplierName').value;
    supplier.email = this.cSupplierForm.get('supplierEmail').value;
    supplier.cell = this.cSupplierForm.get('supplierCell').value;
    supplier.address = `${this.long}$${this.lat}$${this.address}`;

    this.supplierService.confirmSupplierModal(1, supplier).then(() => {
      this.modalCtrl.dismiss();
    });

  }

  midpoint(i : number, k : number) {
    return (i + k) / 2;
  }

}
