import { Component, OnInit } from '@angular/core';
import { ResultService } from '../service/result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  alert:boolean=false;
  constructor(private resultService: ResultService) {}
  results: any = [];

  ngOnInit() {
    this.fetchResults();
  }
  deleteResult(rollNo: number) {
    this.alert=true;
    this.resultService.deleteResult(rollNo.toString()).subscribe(
      (response) => {
        console.log(response);
        this.fetchResults();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private fetchResults() {
    this.resultService.getAllResults().subscribe(
      (response) => {
        console.log(response);
        this.results = response;
        this.results = this.results.data;
        console.log(this.results);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  closeAlert(){
    this.alert=false;
  }

}
