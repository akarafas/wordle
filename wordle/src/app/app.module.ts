import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from './grid/grid.component';
import { BlockComponent } from './grid/block/block.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    BlockComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([
        {path: 'home', component: WelcomeComponent},
        {path: 'wordle', component: GridComponent},
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
