import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Message } from './models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: Http) {}

  getMessages(inOrOut: string) {
    return this.http
      .get(`/api/${inOrOut}`)
      .pipe(map(res => res.json()))
      .pipe(map(objs => objs.map(obj => new Message(obj))));
  }

  getConversation(phoneNumber: string) {
    return this.http
      .get(`/api/messages/${phoneNumber}`)
      .pipe(map(res => res.json()))
      .pipe(map(obj => obj.messages.map(obj => new Message(obj))));
  }

  sendMessage(phoneNumber: string, body: string) {
    return this.http
      .post('/api/messages', {
        phoneNumber: phoneNumber,
        body: body
      })
      .pipe(map(res => res.json()));
  }
}
