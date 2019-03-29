import {authRoles} from 'app/auth';
import Example from './Example';
export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/example',
            component: Example
        }
    ]
};
