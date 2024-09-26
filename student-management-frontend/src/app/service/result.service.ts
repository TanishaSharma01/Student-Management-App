import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private http: HttpClient) {}
  BASE_URL: string = 'http://localhost:3000';

  getAllResults() {
    let url = this.BASE_URL + '/students';
    return this.http.get(url);
  }
  getResult(rollNo: number, dateOfBirth: string) {
    let url =
      this.BASE_URL + `/students?rollNo=${rollNo}&dateOfBirth=${dateOfBirth}`;
    return this.http.get(url);
  }
  getResultWithRollno(rollNo: number) {
    let url = this.BASE_URL + `/students/?rollNo=` + rollNo.toString();
    return this.http.get(url);
  }
  saveResult(data: any) {
    let url = this.BASE_URL + '/students';
    return this.http.post(url, data);
  }
  updateResult(data: any) {
    let url = this.BASE_URL + '/students/' + data.rollNo;
    return this.http.put(url, data);
  }
  deleteResult(rollNo: String) {
    let url = this.BASE_URL + '/students/' + rollNo;
    return this.http.delete(url);
  }
}
