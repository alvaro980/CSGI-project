import {inject, TestBed} from '@angular/core/testing';
import {DynamicPageComponent} from './dynamic-page.component';
import {DynamicPageService} from '../../services/dynamic-page.service';
import {Observable, of} from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';
import {testingItems} from '../../../environments/environments.test.variales';

const mockItems$ = of(testingItems);
const angularFireDatabaseStub = {
  list: () => {
    return new Observable();
  }
};

describe('DynamicPageComponent', () => {
  beforeEach(() => {
    spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockItems$);

    TestBed.configureTestingModule({
      providers: [
        DynamicPageService,
        {provide: AngularFireDatabase, useValue: angularFireDatabaseStub},
      ]
    });
  });
  it('should get all items service', inject([DynamicPageService], (service: DynamicPageService) => {
    of(service.getQuote())
      .subscribe(item => {
        console.log(item);
        expect(item[0].titles).toBeNaN();
      });
  }));
});
