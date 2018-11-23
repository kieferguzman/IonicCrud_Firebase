import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Alquiler} from '../../models/alquiler/alquiler.interface';
import { FirebaseListObservable, AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { Cuarto } from '../../models/cuarto/cuarto.interface';
import { Item } from '../../models/item/item.interface';
/**
 * Generated class for the AddAlquilerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-alquiler',
  templateUrl: 'add-alquiler.html',
})
export class AddAlquilerPage {
  alquiler = {} as Alquiler;
  cuarto = {} as Cuarto;
  persona = {} as Item;


  AlquilerList : FirebaseListObservable<Alquiler[]>;
  cuartoList: FirebaseListObservable<Cuarto[]>;
  PersonasList: FirebaseListObservable<Item[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase) {
      this.AlquilerList = this.database.list('alquiler');
      this.cuartoList = this.database.list('cuartos');
      this.PersonasList = this.database.list('items');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAlquilerPage');
  }
  SaveAlquiler(alquiler: Alquiler) {
    console.log(alquiler);


    const promise =  this.AlquilerList.push({
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
            console.log('Agregar Registro Alquiler');
            this.alquiler = {} as Alquiler;
            this.navCtrl.setRoot("AlquilerPage");
        } )
        .catch(err => console.log(err, 'Error Adding Alquiler'));



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
