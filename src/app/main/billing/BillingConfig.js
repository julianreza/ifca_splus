import {authRoles} from 'app/auth';
import Billing from './Billing';
export const BillingConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/billing',
            component: Billing
        }
    ]
};
