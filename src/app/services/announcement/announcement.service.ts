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
      new Announcement(0, 'Test Announcement', 'Testing announcement, this is a announcement test', new Date(), this.userService.getUser(5))
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
