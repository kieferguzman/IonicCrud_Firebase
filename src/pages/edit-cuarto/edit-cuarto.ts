import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cuarto } from '../../models/cuarto/cuarto.interface';
import { FirebaseObjectObservable, AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the EditCuartoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-cuarto',
  templateUrl: 'edit-cuarto.html',
})
export class EditCuartoPage {
  cuarto = {} as Cuarto;

  itemRef$ : FirebaseObjectObservable<Cuarto>;

  itemSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase) {
      const cuartoId = this.navParams.get('cuartoId');
    this.itemRef$ = this.database.object(`cuartos/${cuartoId}`);

    this.itemSubscription = this.itemRef$.subscribe(cuarto => {
      this.cuarto = cuarto;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCuartoPage');
  }
  EditCuarto(cuarto: Cuarto) {
    const promise =  this.itemRef$.update({
        descripcion: cuarto.descripcion,
        estado: cuarto.estado,
        numero: Number(cuarto.numero),
    });
    promise
        .then(_ => {
            console.log('Updated Item')
            this.navCtrl.pop();
        })
        .catch(err => console.log(err, 'Error Updating Item'));
}
ionViewWillLeave(){
  this.itemSubscription.unsubscribe();
}

}
