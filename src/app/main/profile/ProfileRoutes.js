import {FuseLoadable} from '@fuse';
// import Profile from './Profile';

export const ProfileRoutes = [
    {
        path     : '/profile/profile_information',
        component: FuseLoadable({
            loader: () => import('./profile-information/ProfileInformation')
        })
    },
    {
        path     : '/profile/reset_password',
        component: FuseLoadable({
            loader: () => import('./reset-password/ResetPassword')
        })
    },
    {
        path     : '/profile/edit_profile',
        component: FuseLoadable({
            loader: () => import('./edit-profile/EditProfile')
        })
    }
];

