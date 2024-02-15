import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviewDialogComponent } from './component/img-gallery/preview-dialog/preview-dialog.component';
import { UploadDialogComponent } from './component/img-gallery/upload-dialog/upload-dialog.component';
import { ImgGalleryComponent } from './component/img-gallery/img-gallery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDialogComponent } from './component/img-gallery/delete-dialog/delete-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeCalculatePipe } from './component/pipe/size-calculate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PreviewDialogComponent,
    UploadDialogComponent,
    ImgGalleryComponent,
    DeleteDialogComponent,
    SizeCalculatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDropzoneModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
