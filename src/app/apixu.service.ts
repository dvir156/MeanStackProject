import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApixuService {
  constructor(private http: HttpClient) {}

  getWeather(location) {
    return this.http.get(
      "https://cors-anywhere.herokuapp.com/http://api.apixu.com/v1/current.json?key=57f85146a1304a97be8221908191308&q="+location
    );
  }
}
