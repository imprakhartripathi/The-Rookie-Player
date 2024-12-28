// dev.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Episode {
  epno: number;
  title: string;
  desc: string;
}

export interface Season {
  name: string;
  desc: string;
  poster: string;
  location: string;
  cast: string;
  episodes: Episode[];
}


@Injectable({
  providedIn: 'root'
})
export class SeasonMetadataService {
  private metadataUrl = 'assets/seasons-metadata.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getMetadata(): Observable<any[]> {
    return this.http.get<any[]>(this.metadataUrl);
  }
}
