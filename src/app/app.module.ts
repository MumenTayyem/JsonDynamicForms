import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { DJFormModule } from './dj-form/dj-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './form-builder/layout/layout.component';
import { HomeComponent } from './form-builder/home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PromptComponentComponent } from './prompt-component/prompt-component.component';
import { PwaService } from './services/pwa.service';
import { MatIconModule, MatToolbarModule, MatBottomSheet, MatSnackBarModule, MatBottomSheetModule } from '@angular/material';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

const routes:Routes = [
  {
    path:'formsbuilder',
    loadChildren:()=> import('./form-builder/form-builder.module').then(m=>m.FormBuilderModule)
  },
  {
    path:'',
    redirectTo:'formsbuilder',
    pathMatch:'full'
  }
];

@NgModule({
  entryComponents:[PromptComponentComponent],
  declarations: [
    AppComponent,
    PromptComponentComponent
  ],
  imports: [
    BrowserModule,
    DJFormModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatBottomSheetModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},],
  bootstrap: [AppComponent],
  // exports:[MatBottomSheet]
})
export class AppModule { }
