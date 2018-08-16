import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProgramPage } from "../pages/program/program";
import { LoginPage } from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      branchInit();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage },
      { title: 'Program', component: ProgramPage },
    ];

    platform.resume.subscribe(() => {
      branchInit();
    });

    const branchInit = () => {
      if (!platform.is("cordova")) {
        return;
      }
      const Branch = window["Branch"];
      Branch.initSession().then(data => {
        if (data["+clicked_branch_link"]) {
          if(data.deeplink == 'login_verification') {
            this.nav.setRoot(LoginPage,  { deeplink: data.deeplink})
          }else if( data.deeplink == 'program') {
            this.nav.setRoot(ProgramPage, {
              deeplink: data.deeplink,
              programId: data.programId,
              programType: data.programType,
              programClassId: data.programClassId
            });
          }else{
            console.log('error');
          }
        }
      });
    };
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
