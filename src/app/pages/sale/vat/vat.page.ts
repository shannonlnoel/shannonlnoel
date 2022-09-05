import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vat } from 'src/app/models/vat';
import { RepoService } from 'src/app/services/repo.service';
import { VatService } from 'src/app/services/vat/vat.service';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.page.html',
  styleUrls: ['./vat.page.scss'],
})
export class VATPage implements OnInit{

  //String used from the searchbar, used in the filter pipe to search titles.
  public filter: string;

  //Create local vat array to be populated onInit.
  vatList: Vat[] = [];

  //Subscription variable to track live updates.
  vatSub: Subscription;

  isLoading = true;

  constructor(public vatService: VatService, public repo: RepoService) { 
    // this.populateTitles();
    this.fetchVATs();
  }

  ngOnInit() {

    this.vatService.fetchVatsEvent.subscribe(
      {
        next: res => {
          console.log('EMIT TO GO FETCH THE VATS AGAIN')
          this.fetchVATs();
        }
      }
    );

  }

  fetchVATs() {
    this.isLoading = true;
    this.vatService.getAllVats().subscribe(
      {
        next: data => {
          console.log("FETCHING VATS FROM DB");
          console.log(data.result);
          this.isLoading = false;
          this.vatList = data.result;
        }
      }
    )
  }



  dateFormatter(s : string) : string {
    return s.split("T")[0];
  }

}
