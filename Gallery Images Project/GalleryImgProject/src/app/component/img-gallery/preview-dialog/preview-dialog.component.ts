import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { previewImage } from 'src/app/interface/previewImage.interface';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss'],
})
export class PreviewDialogComponent implements OnInit {
  @Input() images: previewImage[] = [];
  @Input() id!: number;
  currentIndex: number = 0;
  imageUrl: string = '';
  rightIcon = faAngleRight;
  leftIcon = faAngleLeft;
  previewImg: previewImage | undefined;
  nameImage: string = '';
  sizeImage: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.previewImg = this.images.find(
      (res: previewImage) => res.id === this.id
    );

    if (this.previewImg) {
      this.currentIndex = this.images.indexOf(this.previewImg);
      this.imageUrl = this.previewImg.base64textString;
      this.nameImage = this.previewImg.name;
      this.sizeImage = this.previewImg.size;
    }
  }

  showPreviousImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImageUrl();
  }

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImageUrl();
  }

  updateImageUrl() {
    if (this.images.length > 0) {
      this.imageUrl = this.images[this.currentIndex].base64textString;
      this.nameImage = this.images[this.currentIndex].name;
      this.sizeImage = this.images[this.currentIndex].size;
    }
  }

  isPreviousButtonDisabled() {
    return this.images.length === 0 || this.currentIndex === 0;
  }

  isNextButtonDisabled() {
    return this.currentIndex === this.images.length - 1;
  }
}
