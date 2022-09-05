import { Component, Input} from '@angular/core';
import { Title } from 'src/app/models/title';
import { GlobalService } from 'src/app/services/global/global.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-confirm-title',
  templateUrl: './confirm-title.component.html',
  styleUrls: ['./confirm-title.component.scss'],
})
export class ConfirmTitleComponent{
  //1 = confirm ADD
  //2 = confirm UPDATE
  @Input() choice: number;
  @Input() title: Title;

  constructor(public global: GlobalService, public titleService: TitleService) {}

   async checkMatch(description: string): Promise<boolean>{
    return this.titleService.matchingTitle(description).then(result => {
      console.log(result);
       if (result != false){
         this.global.showAlert("The title information entered already exists on the system","Title Already Exists");
         return true;
       } else {
         return false;
       }
     });
   }

  async confirmChanges(title: Title){
    console.log(this.choice);
    await this.checkMatch(title.description).then(result =>{
        if (result != false){
          return;
        } else {
          if (this.choice === 1){
            console.log('Add Title from confirm:');
            //CallRepoToCreate
            this.titleService.createTitle(title);
            this.global.showToast("The title has been successfully added!");
          } else if (this.choice === 2){
            console.log('Update Title from confirm:');
            //CallRepoToUpdate
            this.titleService.updateTitle(title.titleID,title);
            this.global.showToast("The title has been successfully updated!");
          }
        }
        this.global.dismissModal();
    });

  }

  async returnFrom(){
      //1 = return to ADD
      //2 = return to UPDATE
    if (this.choice === 1){
      console.log(this.title);
      this.global.dismissModal();
      this.titleService.addTitleInfoModal(this.title);
    } else if (this.choice === 2){
      console.log(this.title);
      this.global.dismissModal();
      this.titleService.updateTitleInfoModal(this.title);
    }
  }
}
