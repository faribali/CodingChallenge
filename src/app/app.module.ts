import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HousesPageComponent } from './components/houses-page/houses-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HouseCardComponent } from './components/house-card/house-card.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';
import { CharacterDialogComponent } from './components/dialogs/character-dialog/character-dialog.component';
import { MaterialModule } from './modules/material/material.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HousesPageComponent,
    HouseCardComponent,
    HouseDetailsComponent,
    CharacterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
