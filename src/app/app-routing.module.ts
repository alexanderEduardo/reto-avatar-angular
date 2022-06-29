import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetallesComponent } from './components/pokemon-detalles/pokemon-detalles.component';
import { PokemonListarComponent } from './components/pokemon-listar/pokemon-listar.component';

const routes: Routes = [
  {path: 'index',component: PokemonListarComponent},
  {path: 'pokemonDetalles/:id',component: PokemonDetallesComponent},
  {path: '' , pathMatch:'full', redirectTo: 'index'},
  {path: '**' , pathMatch:'full', redirectTo: 'index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
