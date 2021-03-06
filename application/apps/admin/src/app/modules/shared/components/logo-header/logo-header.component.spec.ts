import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockComponent } from "ng-mocks";
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { LogoHeaderComponent } from "./logo-header.component";

describe("LogoHeaderComponent", () => {
  let component: LogoHeaderComponent;
  let fixture: ComponentFixture<LogoHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(LogoComponent),
        LogoHeaderComponent
      ],
      providers: [
        { provide: HttpClient, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoHeaderComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
