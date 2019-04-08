import {authRoles} from 'app/auth';
import Helpdesk from './Helpdesk';
export const HelpdeskConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/helpdesk',
            component: Helpdesk
        }
    ]
};
