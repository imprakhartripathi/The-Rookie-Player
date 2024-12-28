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
    const queryParams = {
      sName: JSON.stringify(seasonName) // serialize form data as JSON string
    };

    this.router.navigate(['/episodelist'], { queryParams });
    console.log("Logging QueryParams from the Selector "+queryParams);
  }

  playSeason(seasonName: string): void {
    console.log("Playing ", seasonName, "Episode ", 1);
  
    // Construct query parameters with the selected season and episode number
    const queryParams = {
      season: seasonName, // Send the selected season name
      episode: 1 // Send the episode number
    };
  
    // Navigate to the player component with query parameters
    this.router.navigate(['/player'], { queryParams });
  
    console.log("Logging QueryParams from Selector:", queryParams);
  }
}
