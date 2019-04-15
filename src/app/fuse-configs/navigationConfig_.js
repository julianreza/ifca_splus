const navigationConfig = [
    {
        'id'   : 'dashboard',
        'title': 'Dashboard',
        'type' : 'item',
        'icon' : 'ballot',
        'url'  : '/dashboards'
    },
    {
        'id'   : 'billing',
        'title': 'Billing',
        'type' : 'item',
        'icon' : 'ballot',
        'url'  : '/billing'
    },
    {
        'id'   : 'helpdesk',
        'title': 'Helpdesk',
        'type' : 'item',
        'icon' : 'ballot',
        'url'  : '/helpdesk'
    },
    {
        'id'   : 'meter',
        'title': 'Meter',
        'type' : 'item',
        'icon' : 'ballot',
        'url'  : '/pages/coming-soon'
    },
    {
        'id'   : 'overtime',
        'title': 'Overtime',
        'type' : 'item',
        'icon' : 'access_time',
        'url'  : '/pages/coming-soon'
    },
    {
        'id'   : 'example',
        'title': 'Example',
        'type' : 'item',
        'icon' : 'access_time',
        'url'  : '/example'
    },
]

const navigationConfig2 = [
{
    'id'      : 'test-group-level-1',
    'title'   : 'Test Group Level 1',
    'type'    : 'group',
    'icon'    : 'apps',
    'children': [
        {
            'id'      : 'test-collapse-level-1',
            'title'   : 'Test Collapse Level 1',
            'type'    : 'collapse',
            'icon'    : 'dashboard',
            'children': [
                {
                    'id'   : 'test-item-level-1',
                    'title': 'Test Item Level 1',
                    'type' : 'item',
                    'url'  : '#'
                },
                {
                    'id'    : 'test-link-level-1',
                    'title' : 'Test Link Level 1',
                    'type'  : 'link',
                    'url'   : 'http://fusetheme.com',
                    'target': '_blank'
                },
                {
                    'id'      : 'test-collapse-2',
                    'title'   : 'Test Collapse Level 2',
                    'type'    : 'collapse',
                    'children': [
                        {
                            'id'   : 'test-item-level-2',
                            'title': 'Test Item Level 2',
                            'type' : 'item',
                            'url'  : '#'
                        },
                        {
                            'id'    : 'test-link-level-2',
                            'title' : 'Test Link Level 2',
                            'type'  : 'link',
                            'url'   : 'http://fusetheme.com',
                            'target': '_blank'
                        },
                        {
                            'id'      : 'test-collapse-level-3',
                            'title'   : 'Test Collapse Level 3',
                            'type'    : 'collapse',
                            'children': [
                                {
                                    'id'   : 'test-item-level-3',
                                    'title': 'Test Item Level 3',
                                    'type' : 'item',
                                    'url'  : '#'
                                },
                                {
                                    'id'    : 'test-link-level-3',
                                    'title' : 'Test Link Level 3',
                                    'type'  : 'link',
                                    'url'   : 'http://fusetheme.com',
                                    'target': '_blank'
                                },
                                {
                                    'id'      : 'test-collapse-level-4',
                                    'title'   : 'Test Collapse Level 4',
                                    'type'    : 'collapse',
                                    'children': [
                                        {
                                            'id'   : 'test-item-level-4',
                                            'title': 'Test Item Level 4',
                                            'type' : 'item',
                                            'url'  : '#'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'id'      : 'test-group-level-2',
                    'title'   : 'Test Group Level 2',
                    'type'    : 'group',
                    'icon'    : 'apps',
                    'children': [
                        {
                            'id'      : 'test-collapse-level-2-2',
                            'title'   : 'Test Collapse Level 2',
                            'type'    : 'collapse',
                            'children': [
                                {
                                    'id'   : 'test-item-level-2-2',
                                    'title': 'Test Item Level 2',
                                    'type' : 'item',
                                    'url'  : '#'
                                },
                                {
                                    'id'    : 'test-link-level-2-2',
                                    'title' : 'Test Link Level 2',
                                    'type'  : 'link',
                                    'url'   : 'http://fusetheme.com',
                                    'target': '_blank'
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
]

console.log(navigationConfig2)

export default navigationConfig;
