import { Routes } from '@angular/router';
import UpdateSocialMedia from './update/update';

const router: Routes = [
    {
        path: '',
        loadComponent: () => import('./social-medias')
    },
    {
        path: 'create',
        loadComponent: () => import('./create/create')
    },
    {
        path: 'update/:id',
        component: UpdateSocialMedia
    }
];

export default router;