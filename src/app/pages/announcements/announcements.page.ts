import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { NewAnnouncementPage } from '../new-announcement/new-announcement.page';
import { ToastService } from 'src/app/services/toast/toast.service';

import { Announcement } from 'src/model/classes/Announcement';
import { User } from 'src/model/classes/User';
import { UserService } from 'src/app/services/user/user.service';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: 'announcements.page.html',
  styleUrls: ['./announcements.page.scss']
})
export class AnnouncementsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  announcements: Announcement[] = [];

  fullyLoaded = false;
  page = 1
  modal: HTMLElement;
  user: User;

  constructor(public modalController: ModalController, private announcementService: AnnouncementService,
    private userService: UserService, private toastService: ToastService, private router: Router) {
      this.user = this.userService.currentUser;
      this.loadAnnouncements();
  }

  ngOnInit(): void {
    console.log(this.userService.currentUser)
  }

  loadAnnouncements():void{
    this.announcementService.getAnnouncements().subscribe(
      (resp:any) => {
        this.announcements = resp.data.map(announcement => {
          const date = this.toDate(announcement.time);
          announcement = new Announcement(announcement.announcement_id, announcement.announcement_title, announcement.announcement_body,
             date, announcement.sender_id)
          return announcement
        })
        this.fullyLoaded = true;
        this.sortByDate(this.announcements);
      },(err) => {
          this.toastService.presentToast(err.error.error, 4500, 'danger');
      })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewAnnouncementPage,
      cssClass: 'my-custom-class',
      componentProps: {
        announcements: this.announcements,
        user: this.user
      }
    });
    return await modal.present();
  }

  loadData(event): void {
    if (!this.fullyLoaded) {
      this.page += 1
      setTimeout(() => {

        event.target.complete();
      }, 2000);
    }
  }

  formatDate(date: Date): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = date.getDate().toString();
    let monthIndex = date.getMonth().toString();
    let year = date.getFullYear().toString();
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (day.length == 1) {
      day = '0' + day
    }
    if (hours.length == 1) {
      hours = '0' + hours
    }
    if( minutes.length == 1) {
      minutes = '0' + minutes
    }

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes;
  }


  toDate(date: String): Date {
    const strArr = date.toString().split('T');
    const dateArr = strArr[0].toString().split('-');
    const timeArr = strArr[1].toString().split(':');
    return new Date(+dateArr[0], +dateArr[1] - 1, +dateArr[2], +timeArr[0], +timeArr[1]);
  }

  sortByDate(announcements: Announcement[]): void {
    const sortedArr = announcements.sort(function (a, b) {
      return b.date.getTime() - a.date.getTime();
    });
    this.announcements = sortedArr
  }

  openModal(): void {
    if(this.user.admin)
      this.presentModal()
  }
}
