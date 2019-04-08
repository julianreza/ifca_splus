import {authRoles} from 'app/auth';
import Project from './Project';
export const ProjectConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/project',
            component: Project
        }
    ]
};
