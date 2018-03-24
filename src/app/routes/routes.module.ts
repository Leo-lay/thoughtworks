import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EarnMoneyModule } from './earn-money/earn-money.module';
import { routes } from './routes';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutesModule { }
