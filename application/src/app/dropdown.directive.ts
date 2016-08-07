import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[dropDown]'

})

export class DropDownDirective {
  private isOpened = false;
  //Adding class for drop
  @HostBinding('class.open') get opened(){
    return this.isOpened;
  }
  //On clock function
  @HostListener('click') open(){
    if(this.isOpened ){
      this.isOpened = false;
    }else{
      this.isOpened = true;
    }
  }
  //leave mouse from div block
  @HostListener('mouseleave') close(){
    this.isOpened = false;
  }

}
