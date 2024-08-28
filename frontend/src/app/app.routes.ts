import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { TestComponent } from './components/test/test.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },

    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'collections/:category', component: ProductListComponent },
    { path: 'carts', component: CartComponent },

    {
        path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], data: { roles: ['user'] }
    },
    { path: '**', redirectTo: '' },

];
