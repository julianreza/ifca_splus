import React from 'react';
import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const Setting_CsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/setting_cs',
            exact    : true,
            component: () => <Redirect to="/setting_cs/Section"/>
        },
        {
            path     : '/setting_cs/:tab?',
            component: FuseLoadable({
                loader: () => import('./Setting_Cs')
            })
        },
    ]
};
