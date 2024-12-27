import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SeasonMetadataService, Season } from '../../services/season-metadata.service';

@Component({
  selector: 'app-selector-page',
  standalone: false, // Retained standalone: false as requested
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss'] // Fixed the key from `styleUrl` to `styleUrls`
})
export class SelectorPageComponent implements OnInit {
  logoURL: string = 'assets/rookie_logo.png';
  seasons: Season[] = [];
  showFullText: boolean[] = []; // Tracks the state of 'Read More' for each season

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sms: SeasonMetadataService
  ) {}

  ngOnInit(): void {
    // Initialize the `showFullText` array after fetching the seasons data
    this.sms.getMetadata().subscribe({
      next: (data: Season[]) => {
        this.seasons = data; // No need to map if data is already typed as `Season[]`
        this.showFullText = Array(this.seasons.length).fill(false); // Properly initialize after data is fetched
        console.log('All Seasons:', this.seasons);
      },
      error: (err) => {
        console.error('Failed to load season metadata:', err);
      }
    });
  }

  truncateText(text: string, wordLimit: number = 30): string {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  }

  toggleText(index: number): void {
    this.showFullText[index] = !this.showFullText[index];
  }

  navigateToSeason(seasonName: string): void {
    console.log(`Redirected to ${seasonName} Episode List`)
    this.router.navigate(['/episodelist', seasonName]); // Fixed the navigate function syntax
  }

  playSeason(seasonName: string): void {
    console.log(`Playing season: ${seasonName}`); // Implement your play logic here
    this.router.navigate(['/player', seasonName]); // Fixed the navigate function syntax
  }
}
