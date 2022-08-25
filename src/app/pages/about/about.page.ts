import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  navHome(){
    this.route.navigate(['/home']);
  }

  navEvents(){
    this.route.navigate(['/events']);
  }

  navPlayers(){
    this.route.navigate(['/players']);
  }

}
