import {EventEmitter} from "@angular/core";

export class  NameService {

  name : EventEmitter<any> = new EventEmitter();
  rename = 'Reading';
  changeName(rename){
    if(rename){
      this.rename = rename;
    }
    this.name.emit(this.rename);
  }
}
