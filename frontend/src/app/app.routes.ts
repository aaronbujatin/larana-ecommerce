import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { TestComponent } from './components/test/test.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'prod', component: ProductDetailsComponent },
    { path: 'products/:id', component: ProductDetailsComponent},
    { path: 'collections/:category', component: ProductListComponent}

];
