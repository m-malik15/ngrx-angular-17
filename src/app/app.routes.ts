import { CanActivateFn, Routes } from '@angular/router';
import { PostShellComponent } from './Post/post-shell/post-shell.component';
import { MsalGuard } from '@azure/msal-angular';
import { of } from 'rxjs';

export const ApiAvailabilityGuard: CanActivateFn = () => {
  console.log('ApiAvailabilityGuard returning, true');
  return of(true);
};

export const routes: Routes = [
  {
    path: 'post',
    component: PostShellComponent,
    canActivate: [ApiAvailabilityGuard, MsalGuard],
  }
];


