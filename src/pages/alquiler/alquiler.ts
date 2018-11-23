import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from '../../../node_modules/angularfire2/database';
import { Alquiler } from '../../models/alquiler/alquiler.interface';

/**
 * Generated class for the AlquilerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alquiler',
  templateUrl: 'alquiler.html',
})
export class AlquilerPage {
   AlquilerList : FirebaseListObservable<Alquiler[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) {
      this.AlquilerList = this.database.list('alquiler');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlquilerPage');
  }

  selectItem(alquiler: Alquiler){
    console.log(alquiler.nombre_p);

    this.actionSheetCtrl.create({
        title: `${alquiler.n_cuarto}`,
        buttons: [
            {
                text: 'Editar',
                handler: () => {
                    console.log('Edit clicked');
                    this.navCtrl.push('EditAlquilerPage', {
                        alquilerId: alquiler.$key
                        
                    })
                }
            },
            {
                text: 'Eliminar',
                role: 'destructive',
                handler: () => {
                    console.log('Delete clicked');
                    const promise =  this.AlquilerList.remove(alquiler.$key);
                    promise
                        .then(_ => console.log('Deleted Item'))
                        .catch(err => console.log(err, 'Error Deleted Item'));
                }
            },
            {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }
        ]
    }).present();
}
  AddAlquiler(){
    this.navCtrl.push("AddAlquilerPage");
  }

}
