import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgGalleryComponent } from './component/img-gallery/img-gallery.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ImgGalleryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
