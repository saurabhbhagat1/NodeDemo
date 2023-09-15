import { Component } from '@angular/core';
import { DatingService } from '../Services/dating.service';
import { DatePipe } from '@angular/common';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-footballs',
  templateUrl: './footballs.component.html',
  styleUrls: ['./footballs.component.css']
})
export class FootballsComponent {
  dates: Date[] = [];
  selectedDate!: Date;
  formattedDate!:any;
  matches: any[] = [];
  matchesOnTargetDate:any;
  visibleDates: any;
 IsDatas: boolean = false;
  IsData: boolean = false;
  //matchesOnTargetDate: any[]; // 
  
  constructor(public datingService: DatingService, private datePipe: DatePipe,private router:Router) {
    this.generateDateTabs();
  }

//Pagination
  p: number = 1; 
  itemsPerPage: number = 10; 
  
  setPage(pageNumber: number) {
    this.p = pageNumber;
  }

  generateDateTabs() {
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      this.dates.push(date);
    }
    this.visibleDates = this.dates; 
  }

  showNextWeek() {
    const lastDate = this.visibleDates[this.visibleDates.length - 1];
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1);
  
    if (this.dates.length >= 7) {
      this.visibleDates.shift(); 
    }
  
    this.visibleDates.push(nextDate); // Add a new date to the end.
  }
  
  showPreviousWeek() {
    const firstDate = this.visibleDates[0];
    const prevDate = new Date(firstDate);
    prevDate.setDate(firstDate.getDate() - 1);
  
    if (this.dates.length >= 7) {
      this.visibleDates.pop(); // Remove the last date.
    }
  
    this.visibleDates.unshift(prevDate); 
  }
  


  getMatchData(date: Date) {
        this.selectedDate = date;
        this.IsData = true;
       function formatDateToCustom(date: Date): string {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${month}/${day}/${year}`;
      }

      const formattedMatchDate = formatDateToCustom(new Date(date));


       this.datingService.getMatches().subscribe(data => {

      this.matchesOnTargetDate = data.filter((match:any) => {
        match.MatchDate = formatDateToCustom(new Date(match.MatchDate))
        return match.MatchDate === formattedMatchDate
      });

      console.log(this.matchesOnTargetDate);
      //console.log(matchesOnTargetDate)
    });
  }

  redirectToNextComponent(matchData:any){
      const navigationExtras: NavigationExtras = {
        queryParams: {
          "MatchName":matchData.MatchName,
          "MatchTime":matchData.MatchTime
          
        }
      };
    
      this.router.navigate(['legs', matchData.MatchId], navigationExtras);      
  }
}





