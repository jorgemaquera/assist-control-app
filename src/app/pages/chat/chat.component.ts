import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  newMessage: string;
  messageList: string[] = [];

  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
    // this.signalRService.addSendMessageListener();
  }

  sendMessage() {
    this.signalRService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
