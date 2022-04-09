import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  users: {name: string, position: string}[]  = 
  [{
    "name": 'Aline Grover',
    "position": 'Accountant',
  },
  {
    "name": 'Nevada Anders',
    "position": 'Manager',
  },
  {
    "name": 'Nicholas Morissette',
    "position": 'November 11, 2014',
  },
  {
    "name": 'Rusty Umland',
    "position": 'January 8, 2019',
  },
  {
    "name": 'Amada Cerulli',
    "position": 'July 22, 2009',
  },
  {
    "name": 'Harriette Garcia',
    "position": 'July 29, 2018',
  },
  {
    "name": 'Shanelle Parodi',
    "position": 'May 26, 2018',
  },
  {
    "name": 'Roger Leite',
    "position": 'August 6, 2015',
  },
  {
    "name": 'Latina Faulcon',
    "position": 'February 5, 2014',
  },
  {
    "name": 'Jerrie Hoekstra',
    "position": 'June 2, 2016',
  },
  {
    "name": 'Domonique Byam',
    "position": 'December 30, 2010',
  },
  {
    "name": 'Monnie Bonar',
    "position": 'December 20, 2018',
  },
  {
    "name": 'Chu Kahle',
    "position": 'November 17, 2017',
  },
  {
    "name": 'Allan Passman',
    "position": 'November 12, 2015',
  },
  {
    "name": 'Conrad Caliendo',
    "position": 'February 10, 2016',
  },
  {
    "name": 'Elma Chenier',
    "position": 'August 13, 2011',
  },
  {
    "name": 'Wendi Hirano',
    "position": 'July 27, 2018',
  }
];
  constructor() {
  }

  loadContactsData(event) {    

    //Loading event
    setTimeout(() => {
      console.log('Done'); 
      this.loadMoreContacts();    
      event.target.complete();
    }, 2000);  
  }

  loadMoreContacts(){
    for(let i = 0; i < 10; i++){
     let name = "Extra contact " + i;
     let position = "Extra position" + i;
      this.users.push({"name":name,"position":position})
    }
  }
    
}
