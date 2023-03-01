import { Component, OnInit } from '@angular/core';
import {PokemonService} from 'src/app/services/pokemon.service'
import {Pokemon} from 'src/app/models/pokemon'
import { deleteObject, getDownloadURL, list, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss', 'stye.component.css']
})
export class DashboardComponent implements OnInit {
  tempFileName:String = ""

  pokemons:Pokemon[] = []
  pokemonEdit:Pokemon = new Pokemon()

  editing:boolean = false

  nombre: String = ""
  genero: String = ""
  elemento: String = ""
  puntosPoder: number = 0
  imgUrl:String = ""

  constructor(private pokemonS: PokemonService, private st: Storage)  {
  }
  ngOnInit(): void {
    this.getPokemons()
    this.getImage()
  }

/////////////////////////////---------------------------Control de Imagenes--------------------------------------/////////////////////////////////////////////////////////////////////
  selectImage($event: any){
    if(this.tempFileName != null){
      const imgRef = ref(this.st, `image/${this.tempFileName}`)
      deleteObject(imgRef)
    }
    this.uploadImage($event)
    
    
  }
  uploadImage($event: any){
    const file = $event.target.files[0]
    const imgRef = ref(this.st, `image/${file.name}`)
    this.tempFileName = file.name
    uploadBytes(imgRef,file).then(res=>{this.getImage()}).catch(err=> {console.log(err)})
  }
  getImage(){
    const imgRef = ref(this.st, 'image')
    list(imgRef).then(async res=>{
      console.log(res)
      for(let item of res.items){
        if(item.name == this.tempFileName){
          this.imgUrl = await getDownloadURL(item)
        }
        
      }
      
    }).catch(err=>{console.log(err)})
  }

/////////////////////////////-----------------------------------------------------------------------------------------/////////////////////////////////////////////////////////////////////
  
  addPokemon(){
    const pokemon = new Pokemon();
    pokemon.nombre = this.nombre
    pokemon.genero = this.genero
    pokemon.elemento = this.elemento
    pokemon.puntosPoder = this.puntosPoder
    pokemon.imgUrl = this.imgUrl
    this.pokemonS.addPokemon(pokemon).then(res => {
      this.newPokemon()
    })
    
  }
  updatePokemon(){
    this.pokemonEdit.nombre = this.nombre
    this.pokemonEdit.genero = this.genero
    this.pokemonEdit.elemento= this.elemento
    this.pokemonEdit.puntosPoder= this.puntosPoder
    this.pokemonEdit.imgUrl = this.imgUrl

   
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
    this.imgUrl = pokemon.imgUrl

  }
  newPokemon(){
    this.editing = false
    this.nombre = ""
    this.genero = ""
    this.elemento = ""
    this.puntosPoder = 0
    this.tempFileName = ""
    this.imgUrl = ""
  }
  
  checkOption(){
    if(this.editing == true){
      this.updatePokemon()
    }else{
      this.addPokemon()
    }
  }
  
}
