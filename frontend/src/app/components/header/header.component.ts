import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private cartService: CartService, private oidcSecurityService: OidcSecurityService) { }

  isAuthenticated: boolean = false;
  username: string = "";

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(
      ({ isAuthenticated, userData, accessToken }) => {
        console.log("CheckAuth result:", { isAuthenticated, userData, accessToken });
        this.isAuthenticated = isAuthenticated;
        this.username = userData.preferred_username
      }
    );

    console.log(this.isAuthenticated);

    this.cartService.getCartItemSize().subscribe(size => {
      this.cartItemSize = size;
    })

    // this.oidcSecurityService.isAuthenticated$.subscribe(
    //   ({ isAuthenticated }) => {
    //     this.isAuthenticated = isAuthenticated
    //   }, (error) => {
    //     console.log(error);

    //   }
    // )

    // this.oidcSecurityService.userData$.subscribe(
    //   ({ userData }) => {
    //     this.username = userData.preferred_username
    //   }, (error) => {
    //     console.log(error);

    //   }
    // )
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }


  nikeCategories: string[] = [
    "Air Force",
    "Air Max",
    "Dunks",
    "Nike Basketball",
    "Jordan"
  ]

  adidasCategories: string[] = [
    "Samba",
    "Gazelle",
    "Stan Smith",
    "Spezial",
    "Superstar",
  ]

  cartItemSize: number = 0;




}
