import { Injectable } from '@angular/core';

export interface IAnnouncement{
  title: string,
  text: string,
  date: Date,
  read?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  fakeDb:IAnnouncement[] = [
    {
      title: 'Teste',
      text: 'Anuncio de teste, texto texto texto texto texto texto',
      date: new Date(),
      read: false
    }
  ];
  announcementsPerRequest = 4;

  constructor() { }

  insertAnnouncement(title: string, text:string):IAnnouncement{
    const newAnnouncement: IAnnouncement = {
      title,
      text,
      date: new Date(),
      read: false
    }

    this.fakeDb.push(newAnnouncement)
    return newAnnouncement
  }

  getAnnouncements(page:number):IAnnouncement[] {
    return this.fakeDb.slice((page - 1) * this.announcementsPerRequest, page * this.announcementsPerRequest);
  }
}
