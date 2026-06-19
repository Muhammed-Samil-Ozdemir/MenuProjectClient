import { Routes } from '@angular/router';
import UpdateFood from './update/update';

const router: Routes = [
    {
        path: '',
        loadComponent: () => import('./foods')
    },
    {
        path: 'create',
        loadComponent: () => import('./create/create')
    },
    {
        path: 'update/:id',
        component: UpdateFood
    }
];

export default router;