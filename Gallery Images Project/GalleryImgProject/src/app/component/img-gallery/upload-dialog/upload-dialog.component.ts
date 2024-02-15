import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomFile } from 'src/app/interface/customFile.interface';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent {
  files: CustomFile[] = [];
  errorMsg!: string;

  constructor(
    private apiService: ApiServiceService,
    private activeModal: NgbActiveModal
  ) {}

  onUpload() {
    this.files.map((file: CustomFile) => {
      const image = { ...file };
      this.apiService.postImage(image).subscribe(
        (res: CustomFile) => {
          res;
          this.activeModal.close('success');
        },
        (error) => {
          console.log(error);
        }
      );
    });
    if (!this.files.length) {
      this.errorMsg = 'Please select atleast one image';
    }
  }

  handleFileSelect(event: any) {
    const newFiles = event.addedFiles;
    if (newFiles && newFiles.length > 0) {
      for (let i = 0; i < newFiles.length; i++) {
        const reader = new FileReader();
        const file = newFiles[i];
        reader.onload = () => {
          const base64textString =
            'data:image/jpg;base64,' + btoa(reader.result as string);
          this.files.push({
            base64textString: base64textString,
            size: file.size,
            name: file.name,
            lastModifiedDate: file.lastModifiedDate,
          } as CustomFile);
          this.errorMsg = '';
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  onDelete(index: number) {
    this.files.splice(index, 1);
  }

  closeModel() {
    this.activeModal.close();
  }
}
