import { Routes } from '@angular/router';
import UpdateCategory from './update/update';

const router: Routes = [
    {
        path: '',
        loadComponent: () => import('./categories')
    },
    {
        path: 'create',
        loadComponent: () => import('./create/create')
    },
    {
        path: 'update/:id',
        component: UpdateCategory
    }
];

export default router;