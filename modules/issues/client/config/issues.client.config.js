'use strict';

// Configuring the Issues module
angular.module('issues').run(['Menus',
	function (Menus) {
        // Add the issues dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Issues',
            state: 'issues',
            type: 'dropdown'
        });
        
        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'issues', {
            title: 'List Issues',
            state: 'issues.list'
        });
        
        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'issues', {
            title: 'Create Issue',
            state: 'issues.create'
        });
    }
]);
