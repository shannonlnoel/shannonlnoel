import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Qualification } from 'src/app/models/qualification';
import { QualificationService } from 'src/app/services/qualification/qualification.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.page.html',
  styleUrls: ['./qualification.page.scss'],
})
export class QualificationPage implements OnInit {
  //String used from the searchbar, used in the filter pipe to search venues.
  filter: string;

  //Create local venue array to be populated onInit.
  qualificationList: Qualification[] = [];

  //Subscription variable to track live updates.
  qualificationSub: Subscription;

  isLoading = true;


  constructor(public qualificationService: QualificationService, public repo: RepoService) {
    this.fetchQualifications();
   }

  ngOnInit() {
    this.qualificationService.fetchQualificationEvent.subscribe(
      {
        next: res => {
          console.log('EMIT TO GO FETCH THE QUALIFICATION AGAIN');
          this.fetchQualifications();
        }
      }
    );
  }

  fetchQualifications() {
    this.isLoading = true;
    this.qualificationService.getAllQualification().subscribe(
      {
        next: data => {
          console.log('FETCHING QUALIFICATION FROM DB');
          console.log(data.result);
          this.isLoading = false;
          this.qualificationList = data.result;
        }
      }
    );
  }
}
