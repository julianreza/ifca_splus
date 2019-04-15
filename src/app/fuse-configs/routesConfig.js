import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {BillingConfig} from 'app/main/billing/BillingConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {HelpdeskConfig} from 'app/main/helpdesk/HelpdeskConfig';
import {ProfileConfig} from 'app/main/profile/ProfileConfig';
import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import {ProjectConfig} from 'app/main/project/ProjectConfig';
import {AnalyticsDashboardAppConfig} from 'app/main/analytics/AnalyticsDashboardAppConfig';

const routeConfigs = [
    ExampleConfig,
    BillingConfig,
    LoginConfig,
    ProfileConfig,
    HelpdeskConfig,
    ProjectConfig,
    ...pagesConfigs,
    AnalyticsDashboardAppConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/dashboards"/>
    },
    {
        component: () => <Redirect to="/pages/coming-soon"/>
    }
];

 export default routes;
