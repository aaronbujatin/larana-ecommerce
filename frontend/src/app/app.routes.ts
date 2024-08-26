import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'prod', component: ProductDetailsComponent },
    { path: 'products/:id', component: ProductDetailsComponent}

];
