import { Route } from '@angular/router';
import { authGuard } from './guards/auth-guard';
export const appRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login')
    },
    {
        path: '',
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home'),
            },
            {
                path: 'categories',
                loadChildren: () => import('./features/categories/router'),
            },
            {
                path: 'foods',
                loadChildren: () => import('./features/foods/router'),
            },
        ]
    }
];
