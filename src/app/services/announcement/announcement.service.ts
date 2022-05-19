import { Injectable } from '@angular/core';
import { Announcement } from 'src/model/classes/Announcement';
import { User } from 'src/model/classes/User';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  fakeDb:Announcement[];
  announcementsPerRequest = 4;

  constructor(private userService: UserService) {
    this.fakeDb = [
      new Announcement(0, 'Test Announcement', 'Testing announcement, this is a announcement test. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ', new Date(), this.userService.getUser(5))
    ]
   }

  insertAnnouncement(title: string, text:string, user: User):Announcement{
    const newAnnouncement = new Announcement(this.fakeDb.length, title, text, new Date(), user)
    this.fakeDb.push(newAnnouncement)
    return newAnnouncement
  }

  getAnnouncements(page:number):Announcement[] {
    return this.fakeDb.slice((page - 1) * this.announcementsPerRequest, page * this.announcementsPerRequest);
  }
}
