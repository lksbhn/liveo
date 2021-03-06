import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { InlineSVGDirective, SVGCacheService } from "ng-inline-svg";
import { InlineSVGService } from "ng-inline-svg/lib_commonjs/inline-svg.service";
import { LogoHeaderComponent } from "../../modules/shared/components/logo-header/logo-header.component";
import { LogoComponent } from "../../modules/shared/components/logo/logo.component";

@NgModule({
  declarations: [
    InlineSVGDirective,
    LogoComponent,
    LogoHeaderComponent
  ],
  providers: [
    { provide: InlineSVGService, useValue: jest.fn() },
    { provide: SVGCacheService, useValue: jest.fn() },
    { provide: HttpClient, useValue: jest.fn() }
  ],
  exports: [
    InlineSVGDirective,
    LogoHeaderComponent,
    LogoComponent
  ]
})
export class LogoMockModule { }