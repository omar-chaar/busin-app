import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  items = [];
  numTimesLeft = 5;

  constructor() {
    this.addMoreItems();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.addMoreItems();
      this.numTimesLeft -= 1;
      event.target.complete();
    }, 2000);
  }

  addMoreItems() {
    for (let i=0; i<20; i++)
      this.items.push(i);
  }
    
}
