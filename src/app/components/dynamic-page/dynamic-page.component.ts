import {Component, OnInit} from '@angular/core';
import {DynamicPageService} from '../../services/dynamic-page.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent implements OnInit {
  quoteList: any[];
  interval: any;
  list: string;
  currentQuote: number;

  constructor(private dynamicPageService: DynamicPageService) {
  }

  ngOnInit() {
    this.loadQuote();
    this.getAds();
  }

  loadQuote() {
    this.currentQuote = 0;
    this.quoteList = [];
    this.dynamicPageService.getQuote().snapshotChanges()
      .subscribe(item => {
        this.quoteList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.quoteList.push(x);
        });

        this.quoteList.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  getAds() {
    this.interval = setInterval(() => {
      this.trackQuote();
    }, 5000);
  }

  trackQuote() {
    if (this.currentQuote + 1 > this.quoteList.length - 1) {
      this.loadQuote();
    } else {
      this.currentQuote = this.currentQuote + 1;
      this.list = this.quoteList[this.currentQuote].title;
    }
  }
}
