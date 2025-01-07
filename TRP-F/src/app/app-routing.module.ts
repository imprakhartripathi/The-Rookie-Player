import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './components/selector-page/selector-page.component';
import { PlayerComponent } from './components/player/player.component';
import { SupportComponent } from './components/support/support.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';

const routes: Routes = [
  { path: '', component: SelectorPageComponent, data: { title: 'The Rookie - All Seasons' } },
  { path: 'player', component: PlayerComponent, data: { title: 'The Rookie - Player' } },
  { path: 'help', component: SupportComponent, data: { title: 'The Rookie - Help' } },
  { path: 'episodelist', component: EpisodeListComponent, data: { title: 'The Rookie - Episode List' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
