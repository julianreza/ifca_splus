import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {ProfileConfig} from 'app/main/profile/ProfileConfig';
import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import {AnalyticsDashboardAppConfig} from 'app/main/analytics/AnalyticsDashboardAppConfig';

const routeConfigs = [
    ExampleConfig,
    LoginConfig,
    ProfileConfig,
    ...pagesConfigs,
    AnalyticsDashboardAppConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/dashboards"/>
    }
];

 export default routes;
