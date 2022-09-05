import { Component, Input, OnInit  } from '@angular/core';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-qtype',
  templateUrl: './associative-qtype.component.html',
  styleUrls: ['./associative-qtype.component.scss'],
})
export class AssociativeQtypeComponent implements OnInit {
  @Input() qualificationType: QualificationType;
  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
