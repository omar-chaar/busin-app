import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { departmentService } from 'src/app/services/department/department.service';
import { UserService } from 'src/app/services/user/user.service';

import { User } from 'src/model/classes/User';
import { department } from 'src/model/classes/department';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  departments: department[] = []
  user: User;
  subscription: Subscription;

  page: number = 1
  fullyLoaded = false

  constructor(private departmentService: departmentService, private userService: UserService,
    private router: Router, private chatService:ChatService) {
      this.user = this.userService.currentUser

      this.subscription = this.departmentService.onChange().subscribe(value => {
        const index = this.departments.indexOf(value);
        this.fullyLoaded = false;
        if(index){
          this.departments.splice(index, 1);
        }else{
          this.departments.push(value);
        }
      })
  }

  ngOnInit(): void {
    this.loadMoredepartments()
  }

  loadData(event):void {
    setTimeout(() => {
      this.loadMoredepartments();
      event.target.complete();
    }, 2000);
  }

  loadMoredepartments(): void {
    if (!this.fullyLoaded) {
      const arr = this.departmentService.getdepartments(this.page)
      if (arr.length > 0) {
        this.departments.push(...arr)
        this.page++
      } else {
        this.fullyLoaded = true
      }
    }
  }

  getUsers(department: department):User[]{
    return this.userService.getUsersBydepartment(department)
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
