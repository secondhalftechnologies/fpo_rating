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
				{ title: 'Page 1',      isUpdated:false, tableName: '', pageName: 'PersonalDetailsPage', point: '0', icon : 'person'},
				{ title: 'Page 2',      isUpdated:false, tableName: '', pageName: 'ResidenceDetailsPage', point: '0', icon : 'locate'},
				{ title: 'Page 3',      isUpdated:false, tableName: '', pageName: 'KycKnowledgePage', point: '0', icon : 'book'},
				{ title: 'Page 4', 	    isUpdated:false, tableName: '', pageName: 'KycPhonePage', point: '0', icon : 'phone-portrait'},
				{ title: 'Page 5',      isUpdated:false, tableName: '', pageName: 'KycSpousePage', point: '0', icon : 'woman'},
				{ title: 'Page 6',      isUpdated:false, tableName: '', pageName: 'SpouseKnowledgePage', point: '0', icon : 'book'},
				{ title: 'Page 7',      isUpdated:false, tableName: '', pageName: 'KycFamilyPage', point: '0', icon : 'people'},
				{ title: 'Page 8',      isUpdated:false, tableName: '', pageName: 'KycAppliancesPage', point: '0', icon : 'cog'},
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
