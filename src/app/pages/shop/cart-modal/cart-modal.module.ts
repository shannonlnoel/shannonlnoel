import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonNav } from '@ionic/angular';

import { CartModalPageRoutingModule } from './cart-modal-routing.module';

import { CartModalPage } from './cart-modal.page';
import { CartItemComponent } from 'src/app/components/cart-item/cart-item.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PaymentPage } from '../payment/payment.page';
import { CartBookingItemComponent } from 'src/app/components/cart-booking-item/cart-booking-item.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartModalPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CartModalPage, CartItemComponent, CartBookingItemComponent],
  bootstrap: [CartModalPage],

})
export class CartModalPageModule { }
