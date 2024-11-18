import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Score } from '../models/score';
import { RegisterDTO } from '../models/RegisterDTO';


const domain : string = "https://localhost:7018/";

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  toggleLogout: boolean = true;


  scores: Score[] = [];
  scoreText: string = '';

  constructor(public http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async getPublicScores(): Promise<Score[]> {
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    let x = await lastValueFrom(
      this.http.get<Score[]>(domain + "api/Scores/GetPublicScores", httpOptions)
    );
    console.log(x);
    return x;
  }

  async getMyScores(): Promise<Score[]> {
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    let x = await lastValueFrom(
      this.http.get<Score[]>(domain + "api/Scores/GetMyScores", httpOptions)
    );
    console.log(x);
    return x;
  }

  async postScore(score : Score): Promise<void> {
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    // let newScore = new Score(
    //   0,
    //   this.scoreText,
    //   Date.now.toString(),
    //   '12',
    //   0,
    //   true
    // );
    let x = await lastValueFrom(
      this.http.post<Score>(
        domain + "api/Scores/PostScore",
        score,
        httpOptions
      )
    );
    console.log(x);
  }

  async ChangeScoreVisibility(score : Score) : Promise<void> {

       let token = localStorage.getItem('token');
       let httpOptions = {
         headers: new HttpHeaders({
           'Content-type': 'application/json',
           Authorization: 'Bearer ' + token,
         }),
       };

       let x = await lastValueFrom(
         this.http.post<Score>(
           domain + "api/Scores/PostScore/" + score.id,
           score,
           httpOptions
         )
       );
       console.log(x);
  }
}
