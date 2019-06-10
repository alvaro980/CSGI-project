import {Component, OnInit} from '@angular/core';
import {DynamicPageService} from '../../services/dynamic-page.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent implements OnInit {
  itemList: any[];
  interval: any;
  item: string;
  currentQuote: number;

  constructor(private dynamicPageService: DynamicPageService) {
  }

  ngOnInit() {
    this.loadQuote();
    this.getAds();
  }

  loadQuote() {
    this.currentQuote = 0;
    this.itemList = [];
    this.dynamicPageService.getQuote().snapshotChanges()
      .subscribe(item => {
        this.itemList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.itemList.push(x);
        });
      });
  }

  getAds() {
    this.interval = setInterval(() => {
      this.trackQuote();
    }, 8000);
  }

  trackQuote() {
    if (this.currentQuote + 1 > this.itemList.length - 1) {
      this.loadQuote();
    } else {
      this.currentQuote = this.currentQuote + 1;
      this.item = this.itemList[this.currentQuote].title;
    }
  }
}
