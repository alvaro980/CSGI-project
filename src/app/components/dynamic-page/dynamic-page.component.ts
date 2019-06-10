import {Component, OnInit} from '@angular/core';
import {DynamicPageService} from '../../services/dynamic-page.service';
import {Quote} from '../../models/items.model';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent implements OnInit {
  private itemList: any[];
  private interval: any;
  public quote: Quote;
  private currentQuote: number;

  constructor(private dynamicPageService: DynamicPageService) {
  }

  ngOnInit() {
    this.loadQuotes();
    this.setIntervalRange();
    this.trackQuote();
  }

  loadQuotes() {
    this.currentQuote = 0;
    this.itemList = [];
    this.dynamicPageService.getQuote().snapshotChanges()
      .subscribe(item => {
        this.itemList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.itemList.push(x);
          this.quote = {quote: this.itemList[this.currentQuote].quote, author: this.itemList[this.currentQuote].author};
        });
      });
  }

  setIntervalRange() {
    this.interval = setInterval(() => {
      this.trackQuote();
    }, 10000);
  }

  trackQuote() {
    if (this.currentQuote + 1 > this.itemList.length - 1) {
      this.loadQuotes();
    } else {
      this.currentQuote = this.currentQuote + 1;
      this.quote = this.mappingQuotes();
    }
  }

  mappingQuotes() {
    return {quote: this.itemList[this.currentQuote].quote, author: this.itemList[this.currentQuote].author};
  }
}
