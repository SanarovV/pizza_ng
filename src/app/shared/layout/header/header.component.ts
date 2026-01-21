import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedState: boolean = false;
  constructor(public cartService: CartService,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.loggedState = isLoggedIn;
      // other logic
      console.log('State has been changed: ' + isLoggedIn);
    })
  }

  login(): void {
    this.authService.logIn();
  }

  logout(): void {
    this.authService.logOut();
  }
}
