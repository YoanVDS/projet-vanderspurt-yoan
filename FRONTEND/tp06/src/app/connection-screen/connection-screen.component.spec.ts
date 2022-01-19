import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionScreenComponent } from './connection-screen.component';

describe('ConnectionScreenComponent', () => {
  let component: ConnectionScreenComponent;
  let fixture: ComponentFixture<ConnectionScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
