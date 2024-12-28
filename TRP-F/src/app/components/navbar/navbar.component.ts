import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 logoURL: string = 'assets/rookie_logo.png';

 constructor(
     private route: ActivatedRoute,
     public dialog: MatDialog,
     private router: Router
   ) {}

   navigateHome(){
    this.router.navigate(['/'])
   }

   
}
