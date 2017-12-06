import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Sql } from '../../providers/sql/sql';

interface point<T> {
    [K: string]: T;
}

@IonicPage()
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html'
})


export class Forms {

	current_farmer: any;
	form_name: string;
	points: point<string>;
	forms:Array<any>;
	rootNavCtrl: NavController;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				private sql: Sql,
				public loadingCtrl: LoadingController){

		this.current_farmer = navParams.get('farmer');
		this.form_name = navParams.get('form_name');
		this.rootNavCtrl = navParams.get('rootNavCtrl');
		
		this.getFarmerPoints(this.current_farmer.id);
		// let loading = this.presentLoading('Please wait...');
		// loading.present();
		// setTimeout(() => {
		//     loading.dismiss();
		// }, 1000);
	}

	getFarmerPoints(id: string){
		//some http work here
		this.points = {
			'item1' : '10',
			'item2' : '20',
			'item3' : '30',
			'item4' : '40',
			'item5' : '50',
		};

		if(this.form_name == 'forms_list'){
			this.forms = [
				{ title: 'Primary Data',      isUpdated:false, tableName: '', pageName: 'PrimarydataPage', point: '0', icon : 'person'},
				{ title: 'Membership',      isUpdated:false, tableName: '', pageName: 'MembershipPage', point: '0', icon : 'locate'},
				{ title: 'Marketing',      isUpdated:false, tableName: '', pageName: 'MarketingPage', point: '0', icon : 'book'},
				{ title: 'Money', 	    isUpdated:false, tableName: '', pageName: 'MoneyPage', point: '0', icon : 'phone-portrait'},
				{ title: 'Management',      isUpdated:false, tableName: '', pageName: 'ManagementPage', point: '0', icon : 'woman'},
				{ title: 'Services',      isUpdated:false, tableName: '', pageName: 'ServicesPage', point: '0', icon : 'book'},
				{ title: 'Does farmers has sense of ownership in FPO they are associated with?',      isUpdated:false, tableName: '', pageName: 'AssociateFpoPage', point: '0', icon : 'people'},
			];
		}
		else if(this.form_name == 'rating_tables'){
			this.forms = [];
		}
	}

	ionViewDidEnter(){
		//check if its updated in local database
		for (var i = 0; i < this.forms.length; i++) {
			if(this.forms[i].tableName){
				// console.log(this.forms[i].tableName);
				this.updateStatus(i);
			}
		}
	}

	updateStatus(index){
		this.sql.query('SELECT fm_id FROM ' + this.forms[index].tableName + ' WHERE fm_id = ? LIMIT 1', [this.current_farmer.local_id]).then(data => {
			if (data.res.rows.length > 0) {
				this.forms[index].isUpdated = true;
			}
			else{
				this.forms[index].isUpdated = false;
			}
		},
		err => {
			console.log(err);
		});
	}

	presentLoading(text: string) {
	  let loading = this.loadingCtrl.create({
	    content: text
	  });

	  return loading;
	}

	onTap(page: string){
		let that = this;
		if (page) {
			let myCallback = function(param){
				if(param){
					that.ionViewDidEnter();
				}
			};

			this.rootNavCtrl.push(page, { 
				farmer_id: this.current_farmer.local_id,
				callback: myCallback
			});
		}
	}
}
