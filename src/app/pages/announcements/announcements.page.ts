import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { NewAnnouncementPage } from '../new-announcement/new-announcement.page';

import { Announcement } from 'src/model/classes/Announcement';
import { User } from 'src/model/classes/User';
import { UserService } from 'src/app/services/user/user.service';

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
    private userService: UserService) {
      this.user = this.userService.currentUser;
  }

  ngOnInit(): void {
    this.announcements.push(...this.announcementService.getAnnouncements(this.page));
    this.page += 1;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewAnnouncementPage,
      cssClass: 'my-custom-class',
      componentProps: {
        sortByDate: this.sortByDate,
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
        const arr = this.announcementService.getAnnouncements(this.page);
        this.announcements.push(...arr)
        this.sortByDate(this.announcements)
        if (arr.length === 0) this.fullyLoaded = true
        event.target.complete();
      }, 2000);
    }
  }

  formatDate(date: Date): string {
    const day: string = date.getDate().toString().length === 1 ? `0${date.getDate().toString()}` : date.getDate().toString();
    const month: string = (date.getMonth()+1).toString().length === 1 ? `0${(date.getMonth()+1).toString()}` : (date.getMonth()+1).toString();
    const year: string = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  sortByDate(announcements: Announcement[]): void {
    const sortedArr = announcements.sort(function (a, b) {
      return b.date.getTime() - a.date.getTime();
    });
    this.announcements = sortedArr
  }

  confirmRead(announcement: Announcement): void {
    if (!announcement.read) {
      setTimeout(() => {
        announcement.read = true
      }, 2000)
    }
  }

  openModal(): void {
    if(this.user.admin)
      this.presentModal()
  }
}
