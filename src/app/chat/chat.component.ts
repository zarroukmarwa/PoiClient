import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  chat: Chat[];
  activeChatUser: string;
  activeChatUserImg: string;
  @ViewChild('messageInput', {static: false}) messageInputRef: ElementRef;
  @ViewChild('chatSidebar', {static: false}) sidebar:ElementRef;
  @ViewChild('contentOverlay', {static: false}) overlay:ElementRef;

  messages = new Array();
  item: number = 0;
  constructor(private elRef: ElementRef, private renderer: Renderer2, private chatService: ChatService) {
    this.chat = chatService.chat1;
    this.activeChatUser = "Elizabeth Elliott";
    this.activeChatUserImg = "assets/img/portrait/small/avatar-s-3.png";
  }

  ngOnInit() {
    // $.getScript('./assets/js/chat.js');
  }

  //send button function calls
  onAddMessage() {
    if (this.messageInputRef.nativeElement.value != "") {
      this.messages.push(this.messageInputRef.nativeElement.value);
    }
    this.messageInputRef.nativeElement.value = "";
    this.messageInputRef.nativeElement.focus();
  }

  //chat user list click event function
  SetActive(event, chatId: string) {
    var hElement: HTMLElement = this.elRef.nativeElement;
    //now you can simply get your elements with their class name
    var allAnchors = hElement.getElementsByClassName('list-group-item');
    //do something with selected elements
    [].forEach.call(allAnchors, function (item: HTMLElement) {
      item.setAttribute('class', 'list-group-item no-border');
    });
    //set active class for selected item
    event.currentTarget.setAttribute('class', 'list-group-item bg-blue-grey bg-lighten-5 border-right-primary border-right-2');

    this.messages = [];

    if (chatId === 'chat1') {
      this.chat = this.chatService.chat1;
      this.activeChatUser = "Elizabeth Elliott";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-3.png";
    }
    else if (chatId === 'chat2') {
      this.chat = this.chatService.chat2;
      this.activeChatUser = "Kristopher Candy";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-7.png";
    }
    else if (chatId === 'chat3') {
      this.chat = this.chatService.chat3;
      this.activeChatUser = "Sarah Woods";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-8.png";
    }
    else if (chatId === 'chat4') {
      this.chat = this.chatService.chat4;
      this.activeChatUser = "Bruce Reid";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-5.png";
    }
    else if (chatId === 'chat5') {
      this.chat = this.chatService.chat5;
      this.activeChatUser = "Heather Howell";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-9.png";
    }
    else if (chatId === 'chat6') {
      this.chat = this.chatService.chat6;
      this.activeChatUser = "Kelly Reyes";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-4.png";
    }
    else if (chatId === 'chat7') {
      this.chat = this.chatService.chat7;
      this.activeChatUser = "Vincent Nelson";
      this.activeChatUserImg = "assets/img/portrait/small/avatar-s-14.png";
    }

  }

  onSidebarToggle() {
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-none');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-sm-none');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-block');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-sm-block');
    this.renderer.addClass(this.overlay.nativeElement, 'show');
  }

  onContentOverlay() {
    this.renderer.removeClass(this.overlay.nativeElement, 'show');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-block');
    this.renderer.removeClass(this.sidebar.nativeElement, 'd-sm-block');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-none');
    this.renderer.addClass(this.sidebar.nativeElement, 'd-sm-none');

  }

}
