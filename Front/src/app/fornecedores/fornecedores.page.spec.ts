import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FornecedoresPage } from './fornecedores.page';

describe('FornecedoresPage', () => {
  let component: FornecedoresPage;
  let fixture: ComponentFixture<FornecedoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FornecedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
