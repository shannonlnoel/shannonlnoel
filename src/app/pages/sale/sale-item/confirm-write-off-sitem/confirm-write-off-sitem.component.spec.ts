import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmWriteOffSitemComponent } from './confirm-write-off-sitem.component';

describe('ConfirmWriteOffSitemComponent', () => {
  let component: ConfirmWriteOffSitemComponent;
  let fixture: ComponentFixture<ConfirmWriteOffSitemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmWriteOffSitemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmWriteOffSitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
