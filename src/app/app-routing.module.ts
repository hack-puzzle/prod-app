import { NgModule } from '@angular/core';
import { Tab1Page } from './tab1/tab1.page';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './tab1/tab1.module#Tab1PageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, 'anchorScrolling': 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
