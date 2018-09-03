import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  totalLists: any;
  totalValue: number;
  teamPlayerCount: number;
  availableValue: number;
  selectedvalue: number; 
  totalPlayers: number;
  availablePlayers: number;
  selectedPlayers: number;
  strength = 0;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.get('./assets/data/playerData.json').subscribe(response => {
      this.totalLists = response.data.list;
      this.totalValue = response.data.total_amount;
      this.teamPlayerCount = response.data.team_count;
      this.totalPlayers = response.data.players_count;
      this.listUpdated();
    });
    
  }

  public removeMovedItem(index: number, list: any[]): void {
      list.splice(index, 1);
      this.listUpdated();
  }

  public listUpdated(): void {
    let tempTotal = 0;
    this.totalLists.map(value => {
      this.selectedvalue = 0;
      if(value.listId === 2) {
        this.selectedPlayers = value.player_list.length;
        value.player_list.map( selectedListValue => {       
            this.selectedvalue = this.selectedvalue + selectedListValue.value;
            tempTotal = tempTotal + this.sumOfStrength(selectedListValue);
        });        
      } 
  });
  this.availableValue =  this.totalValue - this.selectedvalue;
  this.availablePlayers = this.totalPlayers - this.selectedPlayers;
  this.strength = tempTotal/(this.selectedPlayers * 3);
  }
 
  private sumOfStrength(list): any {
    return (100 - list.batting) + (100 - list.bowling) + (100-list.all_round);
  }

  public getAllowedType(index, list) {
    if(index == 1){
      if (list.length >= this.teamPlayerCount) {
        return { allowedTypes: [] };
      } else {
        return { allowedTypes: ['player'] };
      }
    }
    else{
      return { allowedTypes: ['player'] };
    }
  }

  public disableData(index, item){
    if(index == 0 && (this.availableValue < item.value || this.teamPlayerCount == this.selectedPlayers))
      return true;
    return false;
  }

}
