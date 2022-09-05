import { EventEmitter, Injectable, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BookingType } from 'src/app/models/booking-type';
import { AddBtypeComponent } from 'src/app/pages/booking/booking-type/add-btype/add-btype.component';
import { AssociativeBtypeComponent } from 'src/app/pages/booking/booking-type/associative-btype/associative-btype.component';
import { ConfirmBtypeComponent } from 'src/app/pages/booking/booking-type/confirm-btype/confirm-btype.component';
import { DeleteBtypeComponent } from 'src/app/pages/booking/booking-type/delete-btype/delete-btype.component';
import { UpdateBtypeComponent } from 'src/app/pages/booking/booking-type/update-btype/update-btype.component';
import { ViewBtypeComponent } from 'src/app/pages/booking/booking-type/view-btype/view-btype.component';
import { CancelBookingComponent } from 'src/app/pages/class-booking/event-bookings/cancel-booking/cancel-booking.component';
import { ViewBookingInfoComponent } from 'src/app/pages/class-booking/event-bookings/view-booking-info/view-booking-info.component';
import { RepoService } from '../repo.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  @Output() fetchBookingTypeEvent = new EventEmitter<BookingType>();
  @Output() fetchBookingEvent = new EventEmitter<any>();//update when booking model is made

  constructor(public repo:RepoService, private modalCtrl: ModalController) { }


//READS:
getAllBookingTypes() : Observable<any> {
  return this.repo.getBookingType();
}

getBookingByID(aspNetUserID: string){
  return this.repo.getClientBookings(aspNetUserID);
}

// getAllBooking() : Observable<any> {
//   //need to implement when I do booking
//   return //this.repo.getSaleCategory();
// }

matchingBookingType(name: string, description: string):Promise<any>{
  console.log('bookingService: Repo -> Matching bookingType');
  return this.repo.getMatchBookingType(name, description).toPromise();
 }

//  matchingBooking(name: string, description: string):Promise<any>{
//   console.log('saleService: Repo -> Matching saleCategory');
//   return this.repo.getMatchSaleCategory(name, description).toPromise();
//  }

cancelClientBooking(aspNetUserID: string, bookingID: number, scheduleID: number){
  console.log("Booking Service: Cancel my booking");
  return this.repo.cancelMyBooking(aspNetUserID,bookingID,scheduleID);
}


//Methods
//Add a saleitem to the saleitem list within the sales service.
createBookingType(bookingType: BookingType){
  this.repo.createBookingType(bookingType).subscribe(
    {
      next: () => {
        console.log('BOOKING TYPE CREATED');
        this.fetchBookingTypeEvent.emit();
      }
    }
  );
 }

//  createBooking(booking: any){
//   this.repo.createSaleCategory(saleCategory).subscribe(
//     {
//       next: () => {
//         console.log('SALE CATEGORY CREATED');
//         this.fetchSaleCategoriesEvent.emit(saleCategory);
//       }
//     }
//   );
//  }


//Receives a sale item to update in the service sale  list.
 async updateBookingType(bookingType: BookingType) {
   return this.repo.updateBookingType(bookingType.bookingTypeID,bookingType).subscribe(
     {
      next: () => {
        console.log('BOOKING TYPE UPDATED');
        this.fetchBookingTypeEvent.emit();
      },
      error: err => {
        console.log('BOOKING TYPE UPDATED FAILED');
      }
     }
   );
 }

//  //Receives a sale category to update in the service sale  list.
//  async updateSaleCategory(id: number,saleCategory: any) {
//   return this.repo.updateSaleCategory(id,saleCategory).subscribe(
//     {
//      next: (res) => {
//       console.log(res);
//        console.log('SALE CATEGORY UPDATED');
//        this.fetchSaleCategoriesEvent.emit(saleCategory);
//      }
//     }
//   );
// }

//Receives a sale item to delete in the service vat list.
 deleteBookingType(id: number){
  this.repo.deleteBookingType(id).subscribe(
    {
      next: res => {
        console.log(res);
        console.log('BOOKING TYPE DELETED');
        this.fetchBookingTypeEvent.emit();
      },
      error: err => {
        console.log('ÉRROR HERE');
        console.log(err);
      }
    }
  );
 }

  // //Receives a sale category to delete in the service vat list.
  // deleteSaleCategory(id: number){
  //   this.repo.deleteSaleCategory(id).subscribe(
  //     {
  //       next: res => {
  //         console.log(res);
  //         console.log('SALE CATEGORY DELETED');
  //         this.fetchSaleCategoriesEvent.emit();
  //       },
  //       error: err => {
  //         console.log('ÉRROR HERE');
  //         console.log(err);
  //       }
  //     }
  //   );
  //  }



//Modals:
//CREATE Booking Type
async addBookingTypeModal(bookingType?: BookingType) {
  const modal = await this.modalCtrl.create({
    component: AddBtypeComponent,
    componentProps:{
      bookingType
    }
  });
  await modal.present();
}
//CREATE Sale Category
// async addCategoryInfoModal(booking?: SaleCategory) {
//   const modal = await this.modalCtrl.create({
//     component: AddCategoryComponent,
//     componentProps:{
//       saleCategory
//     }
//   });
//   await modal.present();
// }

//UPDATE Booking Type
async updateBookingTypeModal(bookingType: BookingType) {

  console.log("Booking Service: UpdateBookingTypeModalCall");
  console.log(bookingType);

  const modal = await this.modalCtrl.create({
    component: UpdateBtypeComponent,
    componentProps:{
      bookingType
    }
  });
  await modal.present();
}

// //UPDATE Sale category
// async updateCategoryInfoModal(saleCategory: SaleCategory) {
//   console.log('SalesService: UpdateSaleItemModalCall');
//   const modal = await this.modalCtrl.create({
//     component: UpdateCategoryComponent,
//     componentProps:{
//       saleCategory
//     }
//   });
//   await modal.present();
// }


 //DELETE Booking Type
async deleteBookingTypeModal(bookingType: BookingType) {
  console.log("BookingService: DeleteBookingTypeModalCall");
  if (bookingType.schedule!= null && bookingType.schedule.length > 0){
    console.log("BookingService: Found associative in delete BT");
    console.log(bookingType);
    const modal = await this.modalCtrl.create({
      component: AssociativeBtypeComponent,
        componentProps: {
          bookingType
      }
    });

    await modal.present();
  } else {
    const modal = await this.modalCtrl.create({
      component: DeleteBtypeComponent,
        componentProps: {
          bookingType
      }
    });
    await modal.present();
  }
}

//DELETE Sale item
// async deleteBookingTypeModal(bookingType: BookingType) {
//   console.log('Booking Service: DeleteBookingTypeModalCall');
//   console.log(bookingType)
//     const modal = await this.modalCtrl.create({
//       component: DeleteBtypeComponent,
//         componentProps: {
//           bookingType
//       }
//     });
//     await modal.present();
//   }


//VIEW Booking Type
async viewBookingTypeModal(bookingType: BookingType) {
  console.log("BookingService: ViewBookingTypeModalCall");
  console.log(bookingType)

  const modal = await this.modalCtrl.create({
    component: ViewBtypeComponent,
    componentProps: {
      bookingType
    }
  });
  await modal.present();
}

async viewMyBookingInfoModal(booking: any, bookingAttendance: any){
  console.log("Booking Service: ViewMyBooking modal for client");
  console.log(booking);

  const modal = await this.modalCtrl.create({
    component: ViewBookingInfoComponent,
    componentProps: {
      booking,
      bookingAttendance
    }
  });
  await modal.present();
}

async cancelMyBookingModal(booking: any, bookingAttendance: any){
  console.log("Booking Service: Cancel My Booking modal for client");
  console.log(booking);
  console.log(bookingAttendance);

  const modal = await this.modalCtrl.create({
    component: CancelBookingComponent,
    componentProps: {
      booking,
      bookingAttendance
    }
  });
  await modal.present();
}

// //VIEW Sale Category
// async viewCategoryInfoModal(saleCategory: SaleCategory) {
//   console.log("SalesService: ViewSaleCategoryModalCall");
//   // let tempSaleCategory = new SaleCategory();
//   // tempSaleCategory = Object.assign(saleCategory);
//   // console.log(tempSaleCategory);
//   const modal = await this.modalCtrl.create({
//     component: ViewCategoryComponent,
//     componentProps: {
//       saleCategory
//     }
//   });
//   await modal.present();
// }


//CONFIRM Sale item
async confirmBookingTypeModal(choice: number, bookingType: BookingType) {

  console.log('BookingTypeService: ConfirmBookingTypeModalCall');
  console.log(choice);
  if(choice === 1){
    console.log('Performing ADD');
  } else if (choice === 2){
    console.log("Performing UPDATE");
  } else {
    console.log('Bad Option: ' + choice);
  }

  console.log(bookingType);

    const modal = await this.modalCtrl.create({
      component: ConfirmBtypeComponent,
      componentProps: {
        bookingType,
        choice
      }
    });

    await modal.present();
}


//CONFIRM Sale category

//Display the confirm create/update modal
//Receives the selected saleCategory from the sale category page

// async confirmSaleCategoryModal(choice: number, saleCategory: any) {
//   console.log('SaleService: ConfirmSaleCategoryModalCall');
//   console.log(choice);
//   if(choice === 1){
//     console.log('Performing ADD');
//     const modal = await this.modalCtrl.create({
//       component: ConfirmCategoryComponent,
//       componentProps: {
//         saleCategory,
//         choice
//       }
//     });

    //Update the current vat list with the vat list from the confirm modal.
    // modal.onDidDismiss().then(() => {

    //   this.repo.getSaleCategory();

    // });

  //   await modal.present();

  // } else if (choice === 2){

  //   console.log('Performing UPDATE');


  //   const modal = await this.modalCtrl.create({
  //     component: ConfirmCategoryComponent,
  //     componentProps: {
  //       saleCategory,
  //       choice
  //     }
  //   });

    // modal.onDidDismiss().then(() => {

    //   this.repo.getSaleCategory();

    // });

  //   await modal.present();

  // } else {

  //   console.log('BadOption: ' + choice);

  // }
// }
}
