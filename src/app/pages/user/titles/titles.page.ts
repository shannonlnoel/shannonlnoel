import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Title } from 'src/app/models/title';
import { RepoService } from 'src/app/services/repo.service';
import { TitleService } from 'src/app/services/title/title.service';


@Component({
  selector: 'app-titles',
  templateUrl: './titles.page.html',
  styleUrls: ['./titles.page.scss'],
})
export class TitlesPage implements ViewWillEnter{

  //String used from the searchbar, used in the filter pipe to search titles.
  public filter: string;

  //Create local title array to be populated onInit.
  titleList: Title[] = [];

  //Subscription variable to track live updates.
  titleSub: Subscription;

  isLoading = true;

  constructor(public titleService: TitleService, public repo: RepoService) {
    this.fetchTitles();
  }

  ionViewWillEnter(): void {
    this.titleService.fetchTitlesEvent.subscribe(
      {
        next: (res) => {
          console.log('EMIT TO GO FETCH THE TITLES AGAIN: ' + res);
          this.fetchTitles();
        }
      }
    );
  }

  fetchTitles() {
    this.isLoading = true;
    this.titleService.getAllTitles().subscribe(
      {
        next: (data) => {
          //only if a 200OK comes back
          console.log('FETCHING TITLES FROM DB' + data);
          console.log(data.result); //object that comes back
          this.isLoading = false;
          this.titleList = data.result;
        },
        error: err => {
          
          console.log(err); //object that comes back
          ///////
          // Show the client UI that the API reaponded with !20OK
          ///////
        }
        
      }
    );
  }



}
