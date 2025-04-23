import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { QuantriComponent } from './features/quantri/quantri.component';

export const routes: Routes = [
        {
            path: '', component: LandingComponent,
            children: [
            ]
        },
        {
            path: 'quan-tri', component: QuantriComponent,
            children: [
            ]
        }
    ];
