import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-legs',
  templateUrl: './legs.component.html',
  styleUrls: ['./legs.component.css']
})
export class LegsComponent {
  selectedMarket:any;
  tableData: any[] = [];
  marketData: any[] = [];
  legsData: any[] = [];
  matchId:any="";
  marketId:any="";
  legs:any="";
  IsData : boolean = false;
  MatchTime:any;
  MatchName:any;

  constructor(private http: HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    if((this.route.snapshot.paramMap.get('MatchId'))!=null)
        this.matchId = this.route.snapshot.paramMap.get('MatchId')
      console.log(this.matchId);
      this.route.queryParams.subscribe(params => {
        this.MatchName = params["MatchName"];
        this.MatchTime = params["MatchTime"];

      }      
      )   
      this.getMarketData();
    this.getLegsData();   
  }

  getMarketData() {
    // Fetch data from the API based on the selected market
    this.http.get<any[]>(`http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1&MatchId=${this.matchId}`)
      .subscribe(data => {
        this.marketData = data;
        console.log(this.marketData)
      });
  }
  getLegsData() {
    // Fetch data from the API based on the selected market
    this.http.get<any[]>(`http://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1`)
      .subscribe(data => {
        this.legsData = data;
      });
  }

  sendMarketId(value:any){
    this.marketId = value;
  }

  loadData(value:any) {
    this.legs = value;
    // Fetch data from the API based on the selected market
    this.http.get<any[]>(`http://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets?sports=1&matchId=this.matchId&marketId=this.marketId&legs=this.legs&language=en`)
      .subscribe(data => {
        this.tableData = data;
        console.log(this.tableData)
        console.log(data)   
      });
  }
}
