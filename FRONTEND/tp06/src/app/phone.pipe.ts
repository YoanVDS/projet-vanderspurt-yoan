import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(rawNum: string, country: string) {
    rawNum = rawNum.charAt(0) != '0' ? "0" + rawNum : "" + rawNum;

    let newStr = "";

    switch(country){
      case "France" : newStr = "+33"; break;
      case "Allemagne" : newStr = "+49"; break;
      case "Royaume-Uni" : newStr = "+44"; break;
      case "Etats-Unis": newStr = "+1"; break;
      default: newStr = "+?"; break;
    }

    newStr += rawNum[1] + " ";
    

    let i;

    for (i = 1; i < Math.floor(rawNum.length / 2) - 1; i++) {
      newStr = newStr + rawNum.substr(i * 2, 2) + " ";
    }

    return newStr + rawNum.substr(i * 2);
  }

}
