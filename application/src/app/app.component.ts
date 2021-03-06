import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {NameService} from "./name.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent implements OnInit{

  constructor(private authService: AuthService , private nameService: NameService){
  }
  name = 'Reading';
  ngOnInit() {
    this.nameService.name.subscribe((data) => this.name = data);
  }
}
