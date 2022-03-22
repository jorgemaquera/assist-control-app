import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private hubConnection: signalR.HubConnection;

  constructor() {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7016/chatHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public getNewMessage = () => {
    this.hubConnection.on('ReceiveMessage', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public sendMessage(message) {
    this.hubConnection.invoke('SendMessage', message);
  }

  // public addSendMessageListener = () => {
  //   this.hubConnection.on('SendMessage', (message) => {
  //     console.log(message);
  //   });
  // };
}
