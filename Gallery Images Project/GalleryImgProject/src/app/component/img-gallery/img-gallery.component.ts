import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CustomFile } from 'src/app/interface/customFile.interface';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss'],
})
export class ImgGalleryComponent implements OnInit {
  apiData: CustomFile[] = [];
  viewType!: string;
  bars = faList;
  trash = faTrash;
  imageName!: string;
  filteredImages: CustomFile[] = [];
  selectedItems: number[] = [];
  isChecked: boolean = false;

  constructor(
    private modalService: NgbModal,
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {
    this.viewType = 'grid';
    this.getData();
  }

  openUploadImageDialog() {
    const modalRef = this.modalService.open(UploadDialogComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      (data) => {
        if (data == 'success') {
          this.getData();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openPreviewImageDialog(id?: number) {
    const modalRef = this.modalService.open(PreviewDialogComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.images = this.apiData.map(
      (image: CustomFile) => image
    );
    modalRef.componentInstance.id = id;
  }

  openDeleteImageDialog(id?: number) {
    const modalRef = this.modalService.open(DeleteDialogComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      (data) => {
        if (data == 'success') {
          this.getData();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isSelected(item?: number): boolean {
    return this.selectedItems.includes(item as number);
  }

  onCheckboxChange(item?: number) {
    if (this.isSelected(item)) {
      this.selectedItems = this.selectedItems.filter(
        (selectedItem: number) => selectedItem !== item
      );
    } else {
      this.selectedItems.push(item as number);
    }
  }

  selectAll(event: Event) {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.checked &&
      this.isChecked
    ) {
      this.selectedItems = this.filteredImages
        .map((image) => image.id)
        .filter((id): id is number => id !== undefined);
    } else {
      this.selectedItems = [];
    }
  }

  deleteSelectedItems() {
    const modalRef = this.modalService.open(DeleteDialogComponent);
    modalRef.componentInstance.checkbox = this.selectedItems;
    modalRef.result.then(
      (data) => {
        if (data == 'success') {
          this.getData();
          this.isChecked = false;
          this.selectedItems = [];
        } else {
          this.selectedItems = [];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleViewType(type: string) {
    this.viewType = type;
  }

  getData() {
    setTimeout(() => {
      this.apiService.getAllImage().subscribe(
        (res: CustomFile[]) => {
          this.apiData = res;
          this.filteredImages = [...this.apiData];
        },
        (error) => {
          console.log(error);
        }
      );
    }, 1000);
  }

  filterImages() {
    this.filteredImages = [
      ...this.apiData.filter((image) => image.name.includes(this.imageName)),
    ];
  }
}
