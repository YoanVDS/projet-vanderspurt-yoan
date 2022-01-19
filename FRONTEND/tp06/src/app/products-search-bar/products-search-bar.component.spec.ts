import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSearchBarComponent } from './products-search-bar.component';

describe('ProductsSearchBarComponent', () => {
  let component: ProductsSearchBarComponent;
  let fixture: ComponentFixture<ProductsSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
