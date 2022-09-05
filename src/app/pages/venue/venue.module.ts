import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicModule } from '@ionic/angular';
import { VenuePageRoutingModule } from './venue-routing.module';
import { VenuePage } from './venue.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenuePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [VenuePage]//, HeaderComponent]
})
export class VenuePageModule {}
