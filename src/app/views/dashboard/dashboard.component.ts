import { Component, OnInit } from '@angular/core';
import {PokemonService} from 'src/app/services/pokemon.service'
import {Pokemon} from 'src/app/models/pokemon'



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss', 'stye.component.css']
})
export class DashboardComponent implements OnInit {
  pokemons:Pokemon[] = []
  pokemonEdit:Pokemon = new Pokemon()

  editing:boolean = false

  nombre: String = ""
  genero: String = ""
  elemento: String = ""
  puntosPoder: number = 0

  constructor(private pokemonS: PokemonService) {
  }
  ngOnInit(): void {
    this.getPokemons()
  }

  addPokemon(){
    const pokemon = new Pokemon();
    pokemon.nombre = this.nombre
    pokemon.genero = this.genero
    pokemon.elemento = this.elemento
    pokemon.puntosPoder = this.puntosPoder
   
    this.pokemonS.addPokemon(pokemon).then(res => {
      this.newPokemon()
    })
  }
  updatePokemon(){
    this.pokemonEdit.nombre = this.nombre
    this.pokemonEdit.genero = this.genero
    this.pokemonEdit.elemento= this.elemento
    this.pokemonEdit.puntosPoder= this.puntosPoder

   
    this.pokemonS.updatePokemon(this.pokemonEdit).then(res => {
      console.log(res)
      this.newPokemon()
    }).catch(err => {
      
    })
  }
  getPokemons(){
    this.pokemonS.getPokemons().subscribe(res => {
      this.pokemons = res
    })
  }
  deletePokemon(pokemon: Pokemon){
    return this.pokemonS.deletePokemon(pokemon)
  }
  editPokemon(pokemon: Pokemon){
    this.pokemonEdit.id = pokemon.id
    this.editing = true

    this.nombre =  pokemon.nombre
    this.genero = pokemon.genero
    this.elemento = pokemon.elemento
    this.puntosPoder = pokemon.puntosPoder

  }
  newPokemon(){
    this.editing = false
    this.nombre = ""
    this.genero = ""
    this.elemento = ""
    this.puntosPoder = 0
  }
  
  checkOption(){
    if(this.editing == true){
      this.updatePokemon()
    }else{
      this.addPokemon()
    }
  }
  
}
