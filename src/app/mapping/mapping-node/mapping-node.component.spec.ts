import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingNodeComponent } from './mapping-node.component';

describe('MappingNodeComponent', () => {
  let component: MappingNodeComponent;
  let fixture: ComponentFixture<MappingNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
