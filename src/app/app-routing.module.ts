import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BasesComponent } from './bases/bases.component';


import { ConvocatoryComponent } from './convocatory/convocatory.component';
import { RegisterComponent } from './register/register.component';
import { StageComponent } from './stage/stage.component';

const routes: Routes = [

    {
        path: '', children: [
            { path: 'convocatoria', component: ConvocatoryComponent },
            { path: 'dinamica', component: StageComponent },
            { path: 'registro', component: RegisterComponent },
            { path: 'bases', component: BasesComponent },
            { path: '**', redirectTo: 'convocatoria', pathMatch: 'full' }
        ]
    }

]


@NgModule({
    imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
