import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarnMoneyComponent } from './earn-money.component';
import { Routes, RouterModule } from '@angular/router';
import { EarnMoneyService } from './earn-money.service';
import { HttpClientModule } from '@angular/common/http';
import { IterablePipe } from './iterable.pipe';

const routes: Routes = [
  { path: '', component: EarnMoneyComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EarnMoneyComponent,
    IterablePipe
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EarnMoneyService,
    HttpClientModule,
    IterablePipe
  ]
})
export class EarnMoneyModule { }
