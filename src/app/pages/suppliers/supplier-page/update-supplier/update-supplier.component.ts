import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Supplier } from 'src/app/models/supplier';
import { GlobalService } from 'src/app/services/global/global.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.scss'],
})
export class UpdateSupplierComponent implements OnInit {

  @Input() supplier : Supplier;

  resolved = false;
  long = -1;
  lat = -1;
  address = '';
  addresserror = false;

  cSupplierForm: UntypedFormGroup = this.formBuilder.group({
    supplierName : ['', [Validators.required]],
    supplierEmail : ['', [Validators.required, Validators.email]],
    supplierCell : ['', Validators.required],
    supplierAddress : [''],
  });

  constructor(private modalCtrl : ModalController, private formBuilder : FormBuilder, private supplierService : SupplierService, public global: GlobalService) { }

  ngOnInit() {
    console.log('update sup', this.supplier);
    this.cSupplierForm.patchValue({
      supplierName : this.supplier.name,
      supplierEmail : this.supplier.email,
      supplierCell : this.supplier.cell,
      supplierAddress : this.supplier.address.split('$')[2]
    });
    this.address = this.supplier.address.split('$')[2];
    this.long = Number(this.supplier.address.split('$')[0]);
    this.lat = Number(this.supplier.address.split('$')[1]);
    this.resolved = true;
    this.addresserror = false;

  }

  get errorControl() {
    return this.cSupplierForm.controls;
  }

  submitForm() {
    let temp = new Supplier();
    temp.supplierID = this.supplier.supplierID;
    temp.name = this.cSupplierForm.value.supplierName;
    temp.email = this.cSupplierForm.value.supplierEmail;
    temp.cell = this.cSupplierForm.value.supplierCell;
    temp.address = this.long + '$' + this.lat + '$' + this.address;
    this.supplierService.confirmSupplierModal(2, temp).then(data => {
      console.log(data);
    });
    this.modalCtrl.dismiss();
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
  
  midpoint(i : number, k : number) {
    return (i + k) / 2;
  }

}
