import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';

interface IUser {
  name: string,
  position: string,
}

interface IDepartament {
  name: string,
  users: IUser[],
}

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPage implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  departaments: IDepartament[] = []
  departamentsTest: IDepartament[] = [
    {
      name: 'Marketing',
      users: [
        {
          name: 'Aline Groover',
          position: 'Accountant'
        },
        {
          "name": 'Nevada Anders',
          "position": 'Manager',
        }
      ]
    },
    {
      name: 'IT Departament',
      users: [
        {
          name: 'Ahmed Hassan',
          position: 'Senior Developer'
        },
        {
          name: 'Omar El Khoury',
          position: 'Junior Developer'
        },
        {
          name: 'Bluezão',
          position: 'Influencer'
        }
      ]
    },
    {
      name: 'Human Resources',
      users: [
        {
          name: 'Harriette Garcia',
          position: 'Recruiter'
        }
      ]
    },
    {
      name: 'Marketing',
      users: [
        {
          name: 'Aline Groover',
          position: 'Accountant'
        },
        {
          "name": 'Nevada Anders',
          "position": 'Manager',
        }
      ]
    },
    {
      name: 'IT Departament',
      users: [
        {
          name: 'Ahmed Hassan',
          position: 'Senior Developer'
        },
        {
          name: 'Omar El Khoury',
          position: 'Junior Developer'
        },
        {
          name: 'Bluezão',
          position: 'Influencer'
        }
      ]
    },
    {
      name: 'Human Resources',
      users: [
        {
          name: 'Harriette Garcia',
          position: 'Recruiter'
        }
      ]
    },
    {
      name: 'Marketing',
      users: [
        {
          name: 'Aline Groover',
          position: 'Accountant'
        },
        {
          "name": 'Nevada Anders',
          "position": 'Manager',
        }
      ]
    },
    {
      name: 'IT Departament',
      users: [
        {
          name: 'Ahmed Hassan',
          position: 'Senior Developer'
        },
        {
          name: 'Omar El Khoury',
          position: 'Junior Developer'
        },
        {
          name: 'Bluezão',
          position: 'Influencer'
        }
      ]
    }
  ]

  numTimesLeft = 5

  constructor() {
  }

  ngOnInit(): void {
    this.loadMoreDepartaments()
  }

  loadData(event) {
    this.numTimesLeft -= 1
    //Loading event
    setTimeout(() => {
      console.log('Done');
      this.loadMoreDepartaments();
      event.target.complete();
    }, 2000);
  }

  loadMoreDepartaments():void {
    this.departaments.push(...this.departamentsTest)
  }

  logAccordionValue() {
    console.log(this.accordionGroup.value);
  }

  closeAccordion() {
    this.accordionGroup.value = undefined;
  }


}
