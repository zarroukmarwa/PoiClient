import { Component, OnInit } from '@angular/core';
import { Action } from "../../../entities/action";
import { ActionService } from "../../../services/action.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  public actions: Action[] = [];
  public count: number = 0;
  public pagesCount: number = 0;
  public pageSize: number = 5;


  constructor(private router: Router , private actionService: ActionService) {
  }

  ngOnInit() {
    this.actionService.findAndCount({}).subscribe((response: any) => {
      this.actions = response.data.records;
      this.count = response.data.count;
      this.pagesCount = Math.ceil(this.count / this.pageSize);
    });
  }

  public addAction(): void {
    this.router.navigate(["pages/action"]);
  }

  public editAction(id: number): void {
    this.router.navigate(["pages/action", id]);
  }

  public removeAction(id: number): void {
  }

}
