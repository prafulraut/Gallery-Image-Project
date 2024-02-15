import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  @Input() id!: number;
  @Input() checkbox!: number[];
  @Input() public modalTitle: string = 'Confirmation';
  @Input() public modalMessage: string = 'Are you sure you want to delete?';

  constructor(
    private activeModal: NgbActiveModal,
    private apiService: ApiServiceService
  ) {}

  confirmDelete() {
    const imageId = this.id;
    const selectedCheckbox = this.checkbox;
    if (selectedCheckbox && selectedCheckbox.length > 1) {
      selectedCheckbox.map((item) => {
        this.apiService.deleteImage(item).subscribe(
          (res) => {
            res;
          },
          (error) => {
            console.log(error);
          }
        );
      });
    } else {
      this.apiService.deleteImage(imageId || selectedCheckbox[0]).subscribe(
        (res) => {
          res;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.activeModal.close('success');
  }

  closeModel() {
    this.activeModal.close();
  }
}
