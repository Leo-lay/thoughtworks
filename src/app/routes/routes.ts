import { LayoutComponent } from '../layout/layout.component';
import { EarnMoneyComponent } from './earn-money/earn-money.component';

export const routes = [
    {
        path: 'app',
        component: LayoutComponent,
        children: [
            {
                path: '', redirectTo: 'earn-money', pathMatch: 'full'
            },
            {
                path: 'earn-money', loadChildren: './earn-money/earn-money.module#EarnMoneyModule'
            },
        ]
    },
    { path: '**', redirectTo: 'app/earn-money', pathMatch: 'full' }
];
