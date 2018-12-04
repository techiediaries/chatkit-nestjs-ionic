import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { User } from '../user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messageList: any[] = [];
  chatMessage: string = "";
  constructor(private router: Router, private chatService: ChatService) { }


  ngOnInit() {
    this.chatService.getMessages().subscribe(messages => {
      this.messageList = messages;
    });
  }

  sendMessage() {
    this.chatService.sendMessage({ text: this.chatMessage }).then(() => {
      this.chatMessage = "";
    });
  }

}
