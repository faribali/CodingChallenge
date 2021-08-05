import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesPageComponent } from './components/houses-page/houses-page.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';

const routes: Routes = [
  { path: '', component: HousesPageComponent, data: { houseInfo: {} } },
  { path: 'houseDetails', component: HouseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
