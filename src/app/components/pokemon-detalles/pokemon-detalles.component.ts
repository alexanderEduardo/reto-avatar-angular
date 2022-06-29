import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import Swal from 'sweetalert2'

export interface Pokemon {
  id: number;
  image: string;
  name: string;
  types:string[];
  weight:number;
  height:number;
  abilities:string[];
  stats : Stat[];
}

export class Stat{
  public base_stat:number=0;
  public name:string="";
}
@Component({
  selector: 'app-pokemon-detalles',
  templateUrl: './pokemon-detalles.component.html',
  styleUrls: ['./pokemon-detalles.component.scss']
})
export class PokemonDetallesComponent implements OnInit {

  
  pokemonEntity: any = '';
  //pokemonTypes = [];
  pokemon : Pokemon | undefined;
  constructor(private pokemonService : PokemonService, private activatedRouter: ActivatedRoute,
              private router:Router) {
    this.activatedRouter.params.subscribe( params => {
      this.getSelectedPokemon(params['id']);
    });
   }
   
   ngOnInit(): void {
  }

  getSelectedPokemon(id:any){
    this.pokemonService.getListPokemons(id).subscribe({
      next:(res)=>{
        this.pokemonEntity = res;
/*         let typeArray:string[] = [];
          res.types.forEach((element: any) => {
            typeArray.push(element.type.name);
          }); */
        this.pokemon={
          id : res.id,
          image : res.sprites.front_default,
          name : res.name.toUpperCase(),
          types: this.getArrayTypes(res.types),
          weight: res.weight,
          height : res.height,
          abilities:this.getAbilities(res.abilities),
          stats:this.getStats(res.stats)
        }
        console.log(res);
        console.log(this.pokemon);
      },
      error: (e)=>{
        this.router.navigate(['/index']);
        Swal.fire({
          icon: 'error',
          title: 'Oops... Error '+e.status,
          text: e.error.message
        })
        console.log(e);
      }
    });
  }


  getArrayTypes(arrT:any) : string[]{
    let typeArray:string[] = [];
    arrT.forEach((element: any) => {
      typeArray.push(element.type.name);
    });
    return typeArray;
  }

  getAbilities(arrAb:any){
    let typeArray:string[] = [];
    arrAb.forEach((element: any) => {
      typeArray.push(element.ability.name);
    });
    return typeArray;
  }

  getStats(arrStats:any){
    let statsArr : Stat[] = [];
    let stat : Stat;
    arrStats.forEach((element: any) => {
      console.log(element.base_stat);
      stat=new Stat();
      stat.base_stat=element.base_stat;
      stat.name=element.stat.name;
      statsArr.push(stat);
    });
    return statsArr;
  }

}
