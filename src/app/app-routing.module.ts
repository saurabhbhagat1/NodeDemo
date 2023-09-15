import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballsComponent } from './footballs/footballs.component';
import { LegsComponent } from './legs/legs.component';

// const routes: Routes = [
//   {path : '',component: FootballsComponent}
//   {path : '', component: }
// ];

const routes: Routes = [
  
  { path: 'footballs', component: FootballsComponent },
  { path: '', redirectTo:'footballs', pathMatch:'full'},  {
    path: '',
    runGuardsAndResolvers: 'always',
    
    children:[
      {path:'legs/:matchId', component: LegsComponent},
     
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
