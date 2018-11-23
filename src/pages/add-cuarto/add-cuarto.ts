import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Cuarto} from '../../models/cuarto/cuarto.interface';
import { FirebaseListObservable, AngularFireDatabase } from '../../../node_modules/angularfire2/database';

/**
 * Generated class for the AddCuartoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-cuarto',
  templateUrl: 'add-cuarto.html',
})
export class AddCuartoPage {
  cuarto = {} as Cuarto;
  itemsRef$ : FirebaseListObservable<Cuarto[]>;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,private database: AngularFireDatabase) {
      this.itemsRef$ = this.database.list('cuartos');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCuartoPage');
  }
  saveCuarto(cuarto: Cuarto) {
    console.log(cuarto);


    const promise =  this.itemsRef$.push({
        descripcion: cuarto.descripcion,
        numero: Number(cuarto.numero),
        estado: cuarto.estado
    });
    promise
        .then(_ => {
            console.log('Add Room');
            this.cuarto = {} as Cuarto;
            this.navCtrl.setRoot("CuartoListPage");
        } )
        .catch(err => console.log(err, 'Error Adding Room'));



} 

}
