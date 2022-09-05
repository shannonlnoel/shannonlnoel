import { Component, Input } from '@angular/core';
import { WriteOffReason } from 'src/app/models/write-off-reason'; 
import { InventoryService } from 'src/app/services/inventory/inventory.service'; 
import { GlobalService } from 'src/app/services/global/global.service';


@Component({
  selector: 'app-delete-write-off-reason',
  templateUrl: './delete-write-off-reason.component.html',
  styleUrls: ['./delete-write-off-reason.component.scss'],
})
export class DeleteWriteOffReasonComponent {
  
  @Input() writeOffReason: WriteOffReason;

  constructor(public global: GlobalService,
    public writeOffReasonService: InventoryService) { }

  //Send through the id of the selected write-off reason to be deleted in the write-off reason service.
  async delete(id: number){
    this.writeOffReasonService.deleteWriteOffReason(id);
    this.global.dismissModal();
    this.global.showToast("The Write-Off Reason has been successfully deleted")
  }

}
