import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-luchar',
  templateUrl: './luchar.component.html',
  styleUrls: ['./luchar.component.scss', './styleL.component.css']
})
export class LucharComponent {


  ////////////////////////////////////////
  pokemonEmpty:Pokemon = new Pokemon()
  pokemons:Pokemon[] = []
  pokemon1: Pokemon = new Pokemon()
  pokemon2: Pokemon = new Pokemon()
  pokemonWinner: Pokemon = new Pokemon()
  ////////////////////////////////////////



  constructor( private pokemonS:PokemonService){}
  ngOnInit():void{
    this.getPokemons()
  }

  getPokemons(){
    this.pokemonS.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons
    })
  }
  selectPokemon1(pokemon: Pokemon){
    this.pokemon1 = pokemon
    this.pokemon2.puntosPoder *= 1

  }
  selectPokemon2(pokemon: Pokemon){
    this.pokemon2 = pokemon
    this.pokemon2.puntosPoder *= 1

  }
  pokemonFight(){
    
    
    if(this.pokemon1.puntosPoder > this.pokemon2.puntosPoder){
      this.pokemonWinner = this.pokemon1
    }else{
      this.pokemonWinner = this.pokemon2
    }
  }
  newFight(){
    this.pokemon1 = this.pokemonEmpty
    this.pokemon2 = this.pokemonEmpty
    this.pokemonWinner = this.pokemonEmpty
  }
}
