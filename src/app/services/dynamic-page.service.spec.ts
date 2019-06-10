import {inject, TestBed} from '@angular/core/testing';
import {DynamicPageService} from './dynamic-page.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Quote} from '../models/items.model';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {testingItems} from '../../environments/environments.test.variales';

const mockItems$ = of(testingItems);
const angularFireDatabaseStub = {
  list: () => {
    return new Observable();
  }
};

describe('DynamicPageService', () => {
  beforeEach(() => {
    spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockItems$);

    TestBed.configureTestingModule({
      providers: [
        DynamicPageService,
        {provide: AngularFireDatabase, useValue: angularFireDatabaseStub},
      ]
    });
  });

  it('should get all items in an array', inject([DynamicPageService], (service: DynamicPageService) => {
    of(service.getQuote())
      .subscribe(quote => {
        expect(quote[0].quote).toEqual(testingItems[0].quote);
        expect(quote).toEqual(jasmine.any(testingItems));
      });
  }));
});
