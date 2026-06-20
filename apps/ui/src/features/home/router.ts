import { Routes } from '@angular/router';
import Detail from './detail/detail';

const router: Routes = [
    {
        path: '',
        loadComponent: () => import('./home')
    },
    {
        path: 'detail/:id',
        component: Detail
    }
];

export default router;