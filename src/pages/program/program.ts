import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProgramPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-program',
  templateUrl: 'program.html',
})
export class ProgramPage {

  deeplink: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramPage');

    this.deeplink = this.navParams.get("deeplink");
    if(this.deeplink) {
      const programId = this.navParams.get("programId");
      const programType = this.navParams.get("programType");
      const programClassId = this.navParams.get("programClassId");

      console.log('params', programId, programType, programClassId);
    }

  }

}
