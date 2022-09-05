import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssociativeWriteOffReasonComponent } from './associative-write-off-reason.component';

describe('AssociativeWriteOffReasonComponent', () => {
  let component: AssociativeWriteOffReasonComponent;
  let fixture: ComponentFixture<AssociativeWriteOffReasonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociativeWriteOffReasonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociativeWriteOffReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
