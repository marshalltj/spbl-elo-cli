import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PopoverController } from '@ionic/angular';

import { EventsService } from './../../services/events/events.service';
import { TeamsService } from './../../services/teams/teams.service';
import { TeamPopoverComponent } from './../../components/team-popover/team-popover.component';
import { Response } from './../../models/response.model';

export class EventTeamAssociation{
  id: number;
  name: string;
  date: Date;
  dateStr?: string;
  teams: any[];
}

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events = [new EventTeamAssociation];

  constructor(private route: Router,
              private eventsService: EventsService,
              private teamsService: TeamsService,
              public popoverController: PopoverController) { }

  async ionViewDidEnter() {
    var eventsResponse: Response = await this.eventsService.getEvents()
    this.events = eventsResponse.data;
    for (var event of this.events){
      event.dateStr = new Date(event.date).toLocaleDateString();
      var teamsResponse: Response = await this.teamsService.getTeams(event.id);
      event.teams = teamsResponse.data
    }
  }

  async showTeamDetails(e: Event, teamId, teams){

    const popover = await this.popoverController.create({
      component: TeamPopoverComponent,
      componentProps: {teamId: teamId, teams: teams},
      event: e,
    });

    await popover.present();

    await popover.onDidDismiss();
  }

  ngOnInit() {
  }

  navHome(){
    this.route.navigate(['/home']);
  }

  navPlayers(){
    this.route.navigate(['/players']);
  }

  navAbout(){
    this.route.navigate(['/about']);
  }

}
