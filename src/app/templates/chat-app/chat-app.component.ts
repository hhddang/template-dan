import { Component } from '@angular/core';
import { MESSAGES, Message, USERS, User } from './data';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.scss'],
})
export class ChatAppComponent {
  users: User[] = USERS;
  userOnChat: User | null = this.users[0];
  messages: Message[] = MESSAGES;

  selectUser(user: User) {
    this.userOnChat = user;
  }
}
