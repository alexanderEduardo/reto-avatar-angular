import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import Swal from 'sweetalert2';

//const Swal = require('sweetalert2');
export interface PokemonData {
  position: number;
  image: string;
  name: string;
  types:string[];
}

@Component({
  selector: 'app-pokemon-listar',
  templateUrl: './pokemon-listar.component.html',
  styleUrls: ['./pokemon-listar.component.scss']
})
export class PokemonListarComponent implements OnInit,AfterViewInit {

  columnNames : string[] = ['position','image','name','types'];
  data : any [] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];
  
  @ViewChild(MatPaginator) 
  paginator : MatPaginator= <MatPaginator>{};
  
  constructor(private pokemonService:PokemonService,private router:Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }
  getPokemons(){
    let pokemonData : PokemonData;
    for(let i=1;i<=100;i++){
      this.pokemonService.getListPokemons(i).subscribe({  
        next:res =>{
          let typeArray:string[] = [];
          res.types.forEach((element: any) => {
            typeArray.push(element.type.name);
          });
          pokemonData= {
            position : i,
            image : res.sprites.front_default,
            name : res.name.toUpperCase(),
            types: typeArray
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          console.log(res);
        },
        error:err => {
          console.log(err);
        }
      }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(67,filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(69,filterValue.trim().toLowerCase());
    console.log(70,this.dataSource.paginator);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row:any){
    this.router.navigateByUrl(`pokemonDetalles/${row.position}`);
  }
}
