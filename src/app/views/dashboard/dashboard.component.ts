import { Component, OnInit } from '@angular/core';
import {PokemonService} from 'src/app/services/pokemon.service'
import {Pokemon} from 'src/app/models/pokemon'


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss', 'stye.component.css']
})
export class DashboardComponent implements OnInit {
  pokemons:Pokemon[] = []
  nombre: String = ""
  genero: String = ""
  elemento: String = ""
  poder: String = "" 

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
    pokemon.elemento = this.poder
   
    this.pokemonS.addPokemon(pokemon)
  }
  getPokemons(){
    this.pokemonS.getPokemons().subscribe(res => {
      this.pokemons = res
    })
  }
  deletePokemon(pokemon: Pokemon){
    return this.pokemonS.deletePokemon(pokemon)
  }


  
}
