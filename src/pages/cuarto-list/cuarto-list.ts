import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Cuarto } from '../../models/cuarto/cuarto.interface';
import { FirebaseListObservable, AngularFireDatabase } from '../../../node_modules/angularfire2/database';

/**
 * Generated class for the CuartoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuarto-list',
  templateUrl: 'cuarto-list.html',
})
export class CuartoListPage {
  itemsRef$: FirebaseListObservable<Cuarto[]>;
  //estado : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) {
      this.itemsRef$ = this.database.list('cuartos');
      //this.estado = this.database.list('cuartos/estado');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CuartoListPage');
      
  }

  selectItem(cuarto: Cuarto){
    console.log(cuarto.descripcion);

    this.actionSheetCtrl.create({
        title: `${cuarto.descripcion}`,
        buttons: [
            {
                text: 'Editar',
                handler: () => {
                    console.log('Edit clicked');
                    this.navCtrl.push('EditCuartoPage', {
                        cuartoId: cuarto.$key
                    })
                }
            },
            {
                text: 'Eliminar',
                role: 'destructive',
                handler: () => {
                    console.log('Delete clicked');
                    const promise =  this.itemsRef$.remove(cuarto.$key);
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

  AddCuarto(){
    this.navCtrl.push("AddCuartoPage");
  }

}
