import { Component, Input, OnInit } from '@angular/core';
import { Qualification } from 'src/app/models/qualification';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-qualification',
  templateUrl: './associative-qualification.component.html',
  styleUrls: ['./associative-qualification.component.scss'],
})
export class AssociativeQualificationComponent implements OnInit {
  @Input() qualification: Qualification;

  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
