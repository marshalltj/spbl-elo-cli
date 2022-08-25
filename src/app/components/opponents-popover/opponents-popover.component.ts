import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PlayersService } from './../../services/players/players.service';

@Component({
  selector: 'app-opponents-popover',
  templateUrl: './opponents-popover.component.html',
  styleUrls: ['./opponents-popover.component.scss'],
})
export class OpponentsPopoverComponent implements OnInit {
  players: any = [];

  @Input() teamId: string;
  @Input() gameId: string;

  constructor(private playersService: PlayersService) { }

  async ionViewDidEnter() {
    this.players = await this.playersService.getPlayersInGame(this.teamId, this.gameId);
  }

  ngOnInit() {}

}
