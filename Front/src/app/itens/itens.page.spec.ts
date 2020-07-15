import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItensPage } from './itens.page';

describe('ItensPage', () => {
  let component: ItensPage;
  let fixture: ComponentFixture<ItensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
