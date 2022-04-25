import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { DepartamentService } from 'src/app/services/departament/departament.service';
import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/model/classes/User';
import { Departament } from 'src/model/classes/Departament';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  departaments: Departament[] = []
  user: User;
  subscription: Subscription;

  page: number = 1
  fullyLoaded = false

  constructor(private departamentService: DepartamentService, private userService: UserService,
    private router: Router, private chatService:ChatService) {
      this.user = this.userService.currentUser

      this.subscription = this.departamentService.onDelete().subscribe(value => {
        const index = this.departaments.indexOf(value)
        if(index){
          this.departaments.splice(index, 1);
        }
      })
  }

  ngOnInit(): void {
    this.loadMoreDepartaments()
  }

  loadData(event):void {
    setTimeout(() => {
      this.loadMoreDepartaments();
      event.target.complete();
    }, 2000);
  }

  loadMoreDepartaments(): void {
    if (!this.fullyLoaded) {
      const arr = this.departamentService.getDepartaments(this.page)
      if (arr.length > 0) {
        this.departaments.push(...arr)
        this.page++
      } else {
        this.fullyLoaded = true
      }
    }
  }

  getUsers(departament: Departament):User[]{
    return this.userService.getUsersByDepartament(departament)
  }

  redirectTo(url:string):void{
    this.router.navigateByUrl(url)
  }

  redirectToChat(contact:User){
    const chatId = this.chatService.verifyChat(contact, this.user)
    this.router.navigateByUrl('/message/' + chatId)
  }

  logAccordionValue() {
    console.log(this.accordionGroup.value);
  }

  closeAccordion() {
    this.accordionGroup.value = undefined;
  }

}
