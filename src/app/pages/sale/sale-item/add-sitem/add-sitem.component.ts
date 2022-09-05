import { Component, Input } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { SaleItem } from 'src/app/models/sale-item';
import { SaleCategory } from 'src/app/models/sale-category';
import { SalesService } from 'src/app/services/sales/sales.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RepoService } from 'src/app/services/repo.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-add-sitem',
  templateUrl: './add-sitem.component.html',
  styleUrls: ['./add-sitem.component.scss'],
})
export class AddSitemComponent implements ViewWillEnter {

  @Input() saleItem: SaleItem;
  categoryDropDown!: SaleCategory[];
  quotable = false;
  photo: any[] = [];
  selectImage: any = {};
  itemImage!: File;
  itemImageBase64String!: any;

  //Creating the form to add the new sale category details, that will be displayed in the HTML component
  cSaleItemForm: UntypedFormGroup = this.formBuilder.group({
   itemName : ['', [Validators.required]],
   itemDescription : ['', [Validators.required]],
   itemQuantity : ['', [Validators.required, Validators.min(1)]],
   itemPhoto: [],
   itemCost: ['', [Validators.required, Validators.min(1)]],
   itemPrice: ['', [Validators.required, Validators.min(1)]],
   itemSCategory: ['',[Validators.required]],
   itemQuotable: []
 });

 async getPhoto() {
  
  const image = await Camera.getPhoto({
    quality: 90,
    // allowEditing: true,
    source: CameraSource.Prompt,
    width: 600,
    resultType:  CameraResultType.DataUrl 
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

  this.selectImage = image;
  this.itemImageBase64String = image.base64String;
  this.itemImage = await this.srcToFile(image.dataUrl, 'saleImage.jpeg', 'image/jpeg');
  console.log('image: ', image);
  console.log('inside get image base 64', this.itemImageBase64String)
  
}


srcToFile(src, fileName, mimeType) {
  return (fetch(src)
      .then((res) => { return res.arrayBuffer(); })
      .then((buf) => { return new File([buf], fileName, {type:mimeType}); })
  );
}


 checkBoxToggle(check: any) {
   this.quotable = check.target.checked;
   console.log(this.quotable);
   if (this.quotable) {
     //is quotable
     this.cSaleItemForm.controls.itemPrice.disable();
     this.cSaleItemForm.controls.itemCost.disable();
     this.cSaleItemForm.controls.itemQuantity.disable();
     return;
   }
   console.log('here')
   this.cSaleItemForm.controls.itemPrice.enable();
   this.cSaleItemForm.controls.itemCost.enable();
   this.cSaleItemForm.controls.itemQuantity.enable();
 }

 constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
   public saleService: SalesService, private repo: RepoService) {
    this.saleService.getAllSaleCategories().subscribe(
      {
        next: data => {
          this.categoryDropDown = data.result;
          console.log(data);
        }
      }
    );
  }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cSaleItemForm.controls;
  }

   ionViewWillEnter(): void {

    //populating the dropdown for saleCategory:
    this.saleService.getAllSaleCategories().subscribe(
      {
        next: data => {
          this.categoryDropDown = data.result;
          console.log(data);
        }
      }
    );


    console.log("AddSaleItem-ViewWillEnter");

    if (this.saleItem !=null){
      console.log(this.saleItem);
      this.cSaleItemForm.controls.itemName.setValue(this.saleItem.name);
      this.cSaleItemForm.controls.itemDescription.setValue(this.saleItem.description);
      this.cSaleItemForm.controls.itemPhoto.setValue(this.itemImageBase64String);
      this.cSaleItemForm.controls.itemQuotable.setValue(this.saleItem.quotable);
      this.cSaleItemForm.controls.itemQuantity.setValue(this.saleItem.quantityOnHand);
      this.cSaleItemForm.controls.itemSCategory.setValue(this.saleItem.saleCategory.name);
    }
    }

     submitForm() {

       if (this.cSaleItemForm.controls['itemSCategory'].value[0] == null) {
        this.global.showAlert("No Sale Category provided","Error updating sale item");
        return;
      }

      var date = new Date();
      var epoch = date.getTime();
      var phTemp = null;

      let priceTemp = Number(this.cSaleItemForm.controls['itemPrice'].value);
      let costTemp = Number(this.cSaleItemForm.controls['itemCost'].value);
      let qtyTemp = this.cSaleItemForm.controls['itemQuantity'].value;

      if (this.quotable){
        priceTemp = 0;
        costTemp = 0;
        qtyTemp = 0;
        //Price history temp already null
      } else {
        phTemp = [{
          costAmount: costTemp,
          saleAmount: priceTemp
        }]
      }



       //form is valid for submission
      var obj: SaleItem = {
        name: this.cSaleItemForm.controls['itemName'].value,
        photo: epoch + '_' + this.itemImage.name,
        description: this.cSaleItemForm.controls['itemDescription'].value,
        quotable: this.quotable,
        priceHistory: phTemp,
        quantityOnHand: qtyTemp,
        saleCategoryID: this.cSaleItemForm.controls['itemSCategory'].value.split(',')[0]
        //inventoryItem:[] // we need to auto populate this - either from the frontend or on the API
      }


    console.log('ob');
    console.log(obj);
    console.log("Upload Image Base64", this.itemImageBase64String);


    //wait for image to upload:
    const formData = new FormData();
    console.log(this.itemImage);
    formData.append('file', this.itemImage, epoch + '_' + this.itemImage.name);

        this.repo.uploadSaleItemImage(formData).subscribe({
          next: data => {
            this.global.dismissModal();
            this.saleService.confirmSaleItemModal(1, obj, this.cSaleItemForm.value['itemSCategory'].split(',')[1], this.itemImageBase64String);
          },
          error: (err : HttpErrorResponse) => {
            this.global.showAlert(err.error,"ERROR uploading image");
          return;
          }
        });

      }

}
