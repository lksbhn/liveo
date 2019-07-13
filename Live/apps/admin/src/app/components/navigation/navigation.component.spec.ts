import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NavigationComponent } from "./navigation.component";
import { AngularMaterialModule } from "../../angular-material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "../header/header.component";
import { LogoComponent } from "../logo/logo.component";
import { InlineSVGDirective } from "ng-inline-svg";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { ShutdownComponent } from "../shutdown/shutdown.component";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        NavigationComponent,
        LogoComponent,
        HeaderComponent,
        ShutdownComponent,
        InlineSVGDirective
      ],
      providers: [
        { provide: InlineSVGService, useValue: jest.fn() }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
