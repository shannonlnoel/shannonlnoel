import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmWriteOffReasonComponent } from './confirm-write-off-reason.component';

describe('ConfirmWriteOffReasonComponent', () => {
  let component: ConfirmWriteOffReasonComponent;
  let fixture: ComponentFixture<ConfirmWriteOffReasonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmWriteOffReasonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmWriteOffReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
