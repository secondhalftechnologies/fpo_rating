import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {SuperTabs, SuperTabsController} from "ionic2-super-tabs";

interface point<T> {
    [K: string]: T;
}

@IonicPage({
	segment: 'farmerdetail/:type'
})
@Component({
  selector: 'page-farmerdetail',
  templateUrl: 'farmerdetail.html'
})


export class Farmerdetail {

	@ViewChild(SuperTabs) superTabs: SuperTabs;

	page1: any = 'Forms';
	page2: any = 'Forms';

	showIcons: boolean  = false;
	showTitles: boolean = true;
	pageTitle: string   = 'Farmer Name';
	bgColor: any = 'app';
	current_farmer: any;
	parmsPage1: any;
	parmsPage2: any;

	constructor(public navCtrl: NavController, private navParams: NavParams, private superTabsCtrl: SuperTabsController) {
		this.current_farmer = navParams.get('farmer');
		this.pageTitle      = this.current_farmer.fm_name;
		this.parmsPage1     = {rootNavCtrl: this.navCtrl ,farmer: this.current_farmer, form_name : 'forms_list' };
		this.parmsPage2     = {rootNavCtrl: this.navCtrl ,farmer: this.current_farmer, form_name : 'rating_tables' };
	}

	ngAfterViewInit() {
		// this.superTabsCtrl.increaseBadge('page1', 10);
		// this.superTabsCtrl.enableTabSwipe('page3', false);
		// this.superTabsCtrl.enableTabsSwipe(false);
		// Test issue #122
		// setTimeout(() => {
		//   this.superTabs.slideTo(4);
		// }, 2000);
	}

	ionViewWillEnter(){

		// this.superTabs._tabs[0].icon = 'radio-button-on';
		// this.superTabs._tabs[1].icon = 'checkmark-circle';
		// this.superTabs._tabs[2].icon = 'checkmark-circle';
		// this.superTabs._tabs[3].icon = 'radio-button-off';
		// this.superTabs._tabs[4].icon = 'radio-button-off';


		// console.log('calllllllling');
		// this.superTabs.paneChanged();//slideTo(this.current_slide_index, true);
	}
	
	onTabSelect(tab: { index: number; id: string; }) {
		// switch (tab.index) {
		// 	case 0:
		// 		this.superTabs.toolbarBackground = 'danger';
		// 		this.bgColor = 'danger';
		// 		break;
		// 	case 1:
		// 		this.superTabs.toolbarBackground = 'app';
		// 		this.bgColor = 'app';
		// 		break;
		// 	case 2:
		// 		this.superTabs.toolbarBackground = 'primary';
		// 		this.bgColor = 'primary';
		// 		break;
		// 	case 3:
		// 		this.superTabs.toolbarBackground = 'secondary';
		// 		this.bgColor = 'secondary';
		// 		break;
		// 	case 4:
		// 		this.superTabs.toolbarBackground = 'mdpink';
		// 		this.bgColor = 'mdpink';
		// 		break;
		// 	default:
		// 		this.superTabs.toolbarBackground = 'app';
		// 		this.bgColor = 'app';
		// 		break;
		// }


		console.log(`Selected tab: `, tab);
	}
}
