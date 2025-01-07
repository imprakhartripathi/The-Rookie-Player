// player.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  videoProgress: number = 0;
  bufferProgress: number = 0;
  isPlaying: boolean = true;
  videoElement!: HTMLVideoElement;
  isFullscreen: boolean = false;
  safeURL: string = 'assets/rookie.mp4';

  constructor(private location: Location, private sanitizer: DomSanitizer) {
   
  }

  ngOnInit(): void {
    this.videoElement = document.getElementById('video-player') as HTMLVideoElement;

    this.videoElement.addEventListener('timeupdate', () => {
      this.videoProgress = (this.videoElement.currentTime / this.videoElement.duration) * 100;
    });

    this.videoElement.addEventListener('progress', () => {
      if (this.videoElement.buffered.length > 0) {
        const bufferedEnd = this.videoElement.buffered.end(0);
        this.bufferProgress = (bufferedEnd / this.videoElement.duration) * 100;
      }
    });
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.videoElement.pause();
    } else {
      this.videoElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  forward10Seconds(): void {
    this.videoElement.currentTime += 10;
  }

  rewind10Seconds(): void {
    this.videoElement.currentTime -= 10;
  }

  toggleFullscreen(): void {
    if (!this.isFullscreen) {
      this.videoElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullscreen = !this.isFullscreen;
  }

  closePlayer(): void {
    this.location.back();
  }
}
