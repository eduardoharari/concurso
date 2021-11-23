import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ServiceService } from '../service/service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Upload } from '../upload/upload';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';


export interface Form1 {
  id?: string
  name?: string,
  surname?: string,
  email?: string,
  phone?: string,
  turisticLocation?: string,
  description?: string,
  selected?: any
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [MessageService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() fileUpload: Upload;

  submitted = false

  selectedFilesBrochure!: FileList;
  selectedFilesFinance!: FileList;
  selectedFilesMerc!: FileList;
  selectedFilesPhoto!: FileList;
  selectedFilesProyect!: FileList;
  selectedFilesPlan!: FileList;
  currentFileUpload!: Upload;
  percentage!: number;
  fileUploads: any[];

  form: Form1 = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    turisticLocation: '',
    description: '',
    selected: '',
  }

  firstFormGroup!: FormGroup;

  file!: File

  constructor(private fb: FormBuilder, private firestore: ServiceService, private messageService: MessageService, private storage: AngularFireStorage, private service: ServiceService) { }


  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email])],
      phone: ['', Validators.compose([Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      turisticLocation: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(50)])],
      selected: [''],
    });
  }

  submit() {
    if (this.firstFormGroup.valid) {
      this.firestore.addItem(this.form)
      this.submitted = true
    }
  }

  selectFileProyect(event: any) {
    this.selectedFilesProyect = event.target.files;
  }
  selectFileBrochure(event: any) {
    this.selectedFilesBrochure = event.target.files;
  }
  selectFileFinance(event: any) {
    this.selectedFilesFinance = event.target.files;
  }
  selectFileMerc(event: any) {
    this.selectedFilesMerc = event.target.files;
  }
  selectFilePhoto(event: any) {
    this.selectedFilesPhoto = event.target.files;
  }
  selectFilePlan(event: any) {
    this.selectedFilesPlan = event.target.files;
  }


  upload() {
    if (this.firstFormGroup.valid) {
      if (this.selectedFilesProyect != null) {
        const file = this.selectedFilesProyect.item(0) as File;

        this.currentFileUpload = new Upload(file);
        this.service.pushFileToStorageProyect(this.currentFileUpload, this.form.name, this.form.surname).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      }
      if (this.selectedFilesBrochure != null) {
        const file = this.selectedFilesBrochure.item(0) as File;

        this.currentFileUpload = new Upload(file);
        this.service.pushFileToStorageBrochure(this.currentFileUpload, this.form.name, this.form.surname).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      }
      if (this.selectedFilesFinance != null) {
        const file = this.selectedFilesFinance.item(0) as File;

        this.currentFileUpload = new Upload(file);
        this.service.pushFileToStorageFinance(this.currentFileUpload, this.form.name, this.form.surname).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      }
      if (this.selectedFilesMerc != null) {
        const file = this.selectedFilesMerc.item(0) as File;

        this.currentFileUpload = new Upload(file);
        this.service.pushFileToStorageMerc(this.currentFileUpload, this.form.name, this.form.surname).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      }
      if (this.selectedFilesPhoto != null) {
        const file = this.selectedFilesPhoto.item(0) as File;

        this.currentFileUpload = new Upload(file);
        this.service.pushFileToStoragePhoto(this.currentFileUpload, this.form.name, this.form.surname).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      }
      if (this.selectedFilesPlan != null) {
        const file = this.selectedFilesPlan.item(0) as File;

        this.currentFileUpload = new Upload(file);
        this.service.pushFileToStoragePlan(this.currentFileUpload, this.form.name, this.form.surname).subscribe(
          percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }

}
