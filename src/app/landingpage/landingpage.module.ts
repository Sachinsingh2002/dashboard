import { NgModule } from '@angular/core';
import { routes } from './landingpage.routing';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [],
  declarations: [LandingpageComponent, LoginComponent, ResetPasswordComponent, RegisterComponent],
  exports: [RouterModule],
})
export class LandingPageModule {}
