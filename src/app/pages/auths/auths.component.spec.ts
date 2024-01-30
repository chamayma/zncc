import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthsComponent } from './auths.component';

describe('AuthsComponent', () => {
  let component: AuthsComponent;
  let fixture: ComponentFixture<AuthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthsComponent]
    });
    fixture = TestBed.createComponent(AuthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
