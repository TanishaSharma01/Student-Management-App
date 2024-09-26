import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.css'],
})
export class ResultDetailComponent implements OnInit {
  @Input() resultData: any;
  ngOnInit(): void {
    console.log('chidren data', this.resultData);
  }
}
