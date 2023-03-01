import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucharComponent } from './luchar.component';

describe('LucharComponent', () => {
  let component: LucharComponent;
  let fixture: ComponentFixture<LucharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LucharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
