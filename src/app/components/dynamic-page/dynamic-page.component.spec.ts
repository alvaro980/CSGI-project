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
  it('should match at least one quote', inject([DynamicPageService], (service: DynamicPageService) => {
    of(service.getQuote())
      .subscribe(quote => {
        expect(quote).toEqual(jasmine.any(testingItems));
      });
  }));
});
