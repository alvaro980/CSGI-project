import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DynamicPageService {

  quotaList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) {
  }

  getQuote() {
    this.quotaList = this.firebasedb.list('titles');
    return this.quotaList;
  }
}
