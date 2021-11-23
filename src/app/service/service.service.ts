import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 

import { Observable } from 'rxjs';
import { Form1 } from '../register/register.component';
import { finalize, map } from 'rxjs/operators';
import { Upload } from '../upload/upload';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  name: any
  surname: any

  private basePath = '/uploads'
  private basePathProyect = '/proyecto';
  private basePathBrochure = '/brochure';
  private basePathFinance = '/corrida-financiera';
  private basePathMerc = '/estudio-mercado';
  private basePathPhoto = '/foto';

  form1Collection!: 
  AngularFirestoreCollection<Form1>;
  forms!: Observable<Form1[]>
  formDoc!: AngularFirestoreDocument<Form1>

  constructor(private firestore: AngularFirestore,private db: AngularFireDatabase, private storage: AngularFireStorage){


    this.form1Collection = this.firestore.collection('form1', ref => ref.orderBy('code','asc'))

    this.forms = this.form1Collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Form1
        data.id = a.payload.doc.id
        return data
      })
    }))
   }

  addItem(form1: Form1){
    this.form1Collection.add(form1)
  }

 
  pushFileToStorageProyect(fileUpload: Upload, name:any, surname: any): Observable<any> {
    const filePath = `${name + surname}/${this.basePathProyect}/${fileUpload.file.name}`; 
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  pushFileToStorageBrochure(fileUpload: Upload, name:any, surname: any): Observable<any> {
    const filePath = `${name + surname}/${this.basePathBrochure}/${fileUpload.file.name}`; 
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  pushFileToStorageFinance(fileUpload: Upload, name:any, surname: any): Observable<any> {
    const filePath = `${name + surname}/${this.basePathFinance}/${fileUpload.file.name}`; 
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  
  pushFileToStorageMerc(fileUpload: Upload, name:any, surname: any): Observable<any> {
    const filePath = `${name + surname}/${this.basePathMerc}/${fileUpload.file.name}`; 
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  pushFileToStoragePhoto(fileUpload: Upload, name:any, surname: any): Observable<any> {
    const filePath = `${name + surname}/${this.basePathPhoto}/${fileUpload.file.name}`; 
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
  
  pushFileToStoragePlan(fileUpload: Upload, name:any, surname: any): Observable<any> {
    const filePath = `${name + surname}/${this.basePathPhoto}/${fileUpload.file.name}`; 
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: Upload) {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFileUploads(numberItems: any): AngularFireList<Upload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
}
