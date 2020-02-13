import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
// 31 added AdminGuard
import { AuthGuard, AdminGuard } from './_helpers';
import { DetailComponent } from './detail';
import { HomeComponent } from './home';
// 20/1 added role component
import { RoleComponent } from './role';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // 31 added AdminGuard
    { path: 'list', component: ListComponent, canActivate: [AuthGuard, AdminGuard], data: { role:'Admin'} },
    // 20/1 added role component
    { path: 'role', component: RoleComponent, canActivate: [AuthGuard, AdminGuard], data: { role:'Admin'} },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users/detail/:id', component: DetailComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);