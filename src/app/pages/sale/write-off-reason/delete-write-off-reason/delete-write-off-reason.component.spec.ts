import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteWriteOffReasonComponent } from './delete-write-off-reason.component';

describe('DeleteWriteOffReasonComponent', () => {
  let component: DeleteWriteOffReasonComponent;
  let fixture: ComponentFixture<DeleteWriteOffReasonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWriteOffReasonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteWriteOffReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
