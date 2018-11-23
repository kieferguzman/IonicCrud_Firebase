import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from '../../../node_modules/angularfire2/database';
import { Alquiler } from '../../models/alquiler/alquiler.interface';
import { Cuarto } from '../../models/cuarto/cuarto.interface';
import { Item } from '../../models/item/item.interface';
import { Subscription } from '../../../node_modules/rxjs/Subscription';

/**
 * Generated class for the EditAlquilerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-alquiler',
  templateUrl: 'edit-alquiler.html',
})
export class EditAlquilerPage {
  alquiler = {} as Alquiler;
  cuarto = {} as Cuarto;
  persona = {} as Item;


  AlquilerList : FirebaseObjectObservable<Alquiler>;
  cuartoList: FirebaseListObservable<Cuarto[]>;
  PersonasList: FirebaseListObservable<Item[]>;

  itemSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase) {
      const alquilerId = this.navParams.get('alquilerId');
      this.AlquilerList = this.database.object(`alquiler/${alquilerId}`);
      this.cuartoList = this.database.list('cuartos');
      this.PersonasList = this.database.list('items');
      this.itemSubscription = this.AlquilerList.subscribe(alquiler => {
        this.alquiler = alquiler;
      })
  }

  EditAlquiler(alquiler: Alquiler) {
    const promise =  this.AlquilerList.update({
      id_persona: alquiler.id_persona,
      id_habitacion: alquiler.id_habitacion,
      fecha_ini:alquiler.fecha_ini,
      fecha_fin:alquiler.fecha_fin,
      contrato:alquiler.contrato,
      alquiler_estado: alquiler.alquiler_estado,
      pago_mensual:alquiler.pago_mensual,
      nombre_p:alquiler.nombre_p,
      n_cuarto:alquiler.n_cuarto
    });
    promise
        .then(_ => {
            console.log('Updated Item')
            this.navCtrl.pop();
        })
        .catch(err => console.log(err, 'Error Updating Item'));
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAlquilerPage');
  }
  ionViewWillLeave(){
    this.itemSubscription.unsubscribe();
  }
  onSelectChange(selectedValue: any ,persona) {
    console.log('Selected', selectedValue);
    //alert(persona.itemName + persona.itemDescription);
    this.alquiler.nombre_p = persona.itemName + persona.itemDescription;
  }
  cuartoEvento(selectedValue: any ,cuarto) {
    console.log('Selected', selectedValue);
    //alert(persona.itemName + persona.itemDescription);
    this.alquiler.n_cuarto = cuarto.numero;
  }

}
