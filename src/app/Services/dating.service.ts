import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatingService {
  getFixtures() {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://cms.bettorlogic.com/api/BetBuilder';

  constructor(private http: HttpClient) {}

  getMatches(): Observable<any> {

    const apiUrl = `${this.baseUrl}/GetFixtures?sports=1`;
    return this.http.get(apiUrl);
  }

  // getSingleMatches(): Observable<any> {

  //   this.http
  //   .get<any[]>(`http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1&matchId=${matchId}`)
  //  // return this.http.get(apiUrl);
  // }

}
