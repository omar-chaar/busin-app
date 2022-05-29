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
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value) {
    if (!value) return;

    return value.reverse();
  }
}

@Component({
  selector: 'app-announcements',
  templateUrl: 'announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonAccordionGroup, { static: true })
  accordionGroup: IonAccordionGroup;

  announcements: Announcement[] = [];
  loadedAnnouncements: Announcement[] = [];
  fullyLoaded = false;
  modal: HTMLElement;
  user: User;
  loaded = false;

  constructor(
    public modalController: ModalController,
    private announcementService: AnnouncementService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController
  ) {
    
  }

  ngOnInit(): void { 
    this.user = this.userService.currentUser;
    this.loadTenFirstAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(
      (resp: any) => {
        this.announcements = resp.data.map((announcement) => {
          const date = new Date(announcement.time);
          const user = resp.data;
          const userObj = new User(user.user_id, user.name, user.surname, user.position, user.email, null,
            user.department_id, user.is_admin, user.is_owner, null);
          announcement = new Announcement(
            announcement.announcement_id,
            announcement.announcement_title,
            announcement.announcement_body,
            date,
            userObj
          );
          return announcement;
        });
        this.announcements.forEach((announcement:any) => {
          this.userService.getUserById(announcement.sender).subscribe(
            (resp: any) => {
              const user = resp.data;
              const userObj = new User(user.user_id, user.name, user.surname, user.position, user.email, null,
                user.department_id, user.is_admin, user.is_owner, null);
              announcement.sender = userObj;
            },
            (err) => {
              this.toastService.presentToast(err.error.error, 4500, 'danger');
            }
          )
        })
        this.fullyLoaded = true;
      },
      (err) => {
        this.toastService.presentToast(err.error.error, 4500, 'danger');
      }
    );
  }

  async canDelete(announcement: Announcement): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Delete "${announcement.title}"?`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === 'destructive') {
      this.announcementService.deleteAnnouncement(announcement.id).subscribe(
        (resp: any) => {
          this.toastService.presentToast('Announcement deleted.', 2500, 'success');
          this.announcements = this.announcements.filter((announcementItem) => announcementItem.id !== announcement.id);
        },
        (err) => {
          this.toastService.presentToast(err.error.error, 4500, 'danger');
        }
      )


    }
  }

  loadTenFirstAnnouncements(): void {
    this.announcementService.get10FirstAnnouncements().subscribe(
      (resp: any) => {
        this.announcements = resp.data.map((announcement) => {
          const date = new Date(announcement.time);
          announcement = new Announcement(
            announcement.announcement_id,
            announcement.announcement_title,
            announcement.announcement_body,
            date,
            announcement.sender_id
          );
          return announcement;
        });
        this.announcements = this.announcements.reverse();
        this.announcements.forEach((announcement: any) => {
          this.userService.getUserById(announcement.sender).subscribe(
            (resp: any) => {
              const user = resp.data;
              const userObj = new User(user.user_id, user.name, user.surname, user.position, user.email, null,
                user.department_id, user.is_admin, user.is_owner, null);
              announcement.sender = userObj;
              this.loaded = true;
            },
            (err) => {
              this.toastService.presentToast(err.error.error, 4500, 'danger');
            }
          )
        })
        this.fullyLoaded = true;
        if (this.announcements.length < 10) {
          this.fullyLoaded = true;
        }
       
      },

      (err) => {
        this.toastService.presentToast(err.error.error, 4500, 'danger');
        this.fullyLoaded = true;
       
      }
      
    );
    setTimeout(() => {
      this.loaded = true;
    }, 1500);
  }

  loadMore10Announcements(): void {
    this.announcementService
      .get10MoreAnnouncements(this.announcements[0].id)
      .subscribe(
        (resp: any) => {
          this.loadedAnnouncements = resp.data.map((announcement) => {
            const date = this.toDate(announcement.time);
            announcement = new Announcement(
              announcement.announcement_id,
              announcement.announcement_title,
              announcement.announcement_body,
              date,
              announcement.sender_id
            );
            return announcement;
          });

          if (this.loadedAnnouncements.length == 0) {
            return this.fullyLoaded = true;
          }
          this.announcements = [...this.loadedAnnouncements.reverse(), ...this.announcements];

          if (this.announcements[this.announcements.length - 1].id === this.loadedAnnouncements[this.loadedAnnouncements.length - 1].id) {
            return this.fullyLoaded = true;
          }

        },
        (err) => {
          this.toastService.presentToast(err.error.error, 4500, 'danger');
          this.fullyLoaded = true;
        }
      );
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: NewAnnouncementPage,
      cssClass: 'my-custom-class',
      componentProps: {
        announcements: this.announcements,
        user: this.user,
      },
    });
    return await modal.present();
  }

  loadData(event): void {
    if (!this.fullyLoaded) {
      setTimeout(() => {
        this.loadMore10Announcements();
        event.target.complete();
      }, 500);

    } else {
      event.target.disabled = true;
    }

  }

  formatDate(date: Date): string {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let day = date.getDate().toString();
    let monthIndex = date.getMonth().toString();
    let year = date.getFullYear().toString();
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (day.length == 1) {
      day = '0' + day;
    }
    if (hours.length == 1) {
      hours = '0' + hours;
    }
    if (minutes.length == 1) {
      minutes = '0' + minutes;
    }    
    return (
      day +
      ' ' +
      monthNames[monthIndex] +
      ' ' +
      year +
      ' ' +
      hours +
      ':' +
      minutes
    );
  }

  toDate(date: String): Date {
    const strArr = date.toString().split('T');
    const dateArr = strArr[0].toString().split('-');
    const timeArr = strArr[1].toString().split(':');
    return new Date(
      +dateArr[0],
      +dateArr[1],
      +dateArr[2],
      +timeArr[0],
      +timeArr[1]
    );
  }

  sortByDate(announcements: Announcement[]): void {
    const sortedArr = announcements.sort(function (a, b) {
      return b.date.getTime() - a.date.getTime();
    });
    this.announcements = sortedArr;
  }

  openModal(): void {
    if (this.user.admin) this.presentModal();
  }

  doRefresh(event) {
    this.announcements = [];
    this.fullyLoaded = false;
    this.loadTenFirstAnnouncements();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}

