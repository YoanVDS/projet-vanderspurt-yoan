import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketHeaderComponent } from './basket-header.component';

describe('BasketHeaderComponent', () => {
  let component: BasketHeaderComponent;
  let fixture: ComponentFixture<BasketHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
