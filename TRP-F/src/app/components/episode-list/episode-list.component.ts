import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SeasonMetadataService, Season, Episode } from '../../services/season-metadata.service';

@Component({
  selector: 'app-episode-list',
  standalone: false, // Retained standalone: false as requested
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss'],
})
export class EpisodeListComponent implements OnInit {
  seasons: Season[] = [];
  selectedSeason: string = '';
  seasonName: string = '';
  seasonDesc: string = '';
  seasonPoster: string = '';
  seasonCast: string = '';
  seasonEpisodes: Episode[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private sms: SeasonMetadataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Extract and sanitize the selected season
      this.selectedSeason = params['sName'] ? params['sName'].replace(/^"|"$/g, '') : ''; // Remove quotes
      console.log('Received Season Name on EpisodeList (sanitized):', this.selectedSeason);

      this.sms.getMetadata().subscribe({
        next: (data: Season[]) => {
          this.seasons = data;
          console.log('All Seasons Metadata Received on Episode List:', this.seasons);

          // Filter the metadata for the selected season
          const selectedMetadata = this.seasons.find(season => season.name === this.selectedSeason);
          if (selectedMetadata) {
            this.seasonName = selectedMetadata.name;
            this.seasonDesc = selectedMetadata.desc;
            this.seasonPoster = selectedMetadata.poster;
            this.seasonCast = selectedMetadata.cast
            this.seasonEpisodes = selectedMetadata.episodes;
            console.log('Selected Season Metadata:', selectedMetadata);
          } else {
            console.warn('No metadata found for the selected season:', this.selectedSeason);
          }
        },
        error: (err) => {
          console.error('Error fetching metadata:', err);
        }
      });
    });
  }

  playEpisode(episode: number): void {
    console.log("Playing Episode", episode);
  
    // Construct query parameters with the selected season and episode number
    const queryParams = {
      season: this.selectedSeason, // Send the selected season name
      episode: episode // Send the episode number
    };
  
    // Navigate to the player component with query parameters
    this.router.navigate(['/player'], { queryParams });
  
    console.log("Logging QueryParams from Episode List:", queryParams);
  }
  
}
