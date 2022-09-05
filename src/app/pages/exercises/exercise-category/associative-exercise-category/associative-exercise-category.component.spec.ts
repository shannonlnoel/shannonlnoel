import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssociativeExerciseCategoryComponent } from './associative-exercise-category.component';

describe('AssociativeExerciseCategoryComponent', () => {
  let component: AssociativeExerciseCategoryComponent;
  let fixture: ComponentFixture<AssociativeExerciseCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociativeExerciseCategoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociativeExerciseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
