import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-exercise',
  templateUrl: './associative-exercise.component.html',
  styleUrls: ['./associative-exercise.component.scss'],
})
export class AssociativeExerciseComponent implements OnInit {
  @Input() exercise: Exercise;

  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
