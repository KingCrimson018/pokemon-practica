import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, doc, Firestore} from "@angular/fire/firestore"
import { deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import {Pokemon} from "src/app/models/pokemon"
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private fireStore: Firestore) { }

  getPokemons(): Observable<Pokemon[]> {
    const ref = collection(this.fireStore, "pokemons")
    return collectionData(ref, { idField: "id" })  as Observable<Pokemon[]>
  }

  addPokemon(pokemon: Pokemon){
    var id = pokemon.id
    var nombre = pokemon.nombre
    var genero = pokemon.genero
    var elemento = pokemon.elemento
    return addDoc(collection(this.fireStore, "pokemons"), {id, nombre, genero, elemento,} )
  }

  deletePokemon(pokemon: Pokemon){

   // return deleteDoc(this.fireStore, `pokemon/${pokemon.id}`)

    return deleteDoc(doc(this.fireStore, `pokemons/${pokemon.id}`)).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
