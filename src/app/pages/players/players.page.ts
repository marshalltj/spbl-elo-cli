import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  navHome(){
    this.route.navigate(['/home']);
  }

}
