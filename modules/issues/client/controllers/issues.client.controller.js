'use strict';

// Issues controller
angular.module('issues').controller('IssuesController', ['$scope', '$stateParams', '$state', 'Authentication', 'Socket', 'Issues',
	function ($scope, $stateParams, $state, Authentication, Socket, Issues) {
        $scope.authentication = Authentication;
        
        // make sure the user is authenticated
        if (!$scope.authentication.user) $state.go('authentication.signin');
        
        // Make sure the Socket is connected
        if (!Socket.socket) {
            Socket.connect();
        }
        
        // Only register the event listeners if the current user has the 'admin' role.
        if ($scope.authentication.user.roles.indexOf('admin') !== -1) {
            // Add an event listener to the 'issueAdded' event
            Socket.on('issueAdded', function (notification) {
                $scope.issues.unshift(notification.data);
            });

            // Add an event listener to the 'issueRemoved' event
            Socket.on('issueRemoved', function (notification) {
                console.log(notification);
                // iterate through the issues to make sure we remove the intended data
                for (var i in $scope.issues) {
                    if ($scope.issues[i]._id.toString() === notification.data._id.toString()) {
                        $scope.issues.splice(i, 1);
                    }
                }
            });

            // TODO: We may want to send a notification when a Issue is updated. ?? @mleanos 07/29/2015
        }
        
        // Create new Issue
        $scope.create = function () {
            // Create new Issue object
            var issue = new Issues({
                title: this.title,
                description: this.description
            });
            
            // Handle notification after save
            issue.$save(function () {
                
                // build the new Issue notification
                var notification = {
                    type: 'issueAdded',
                    data: issue
                };
                
                // Emit a 'issueNotification' message event
                Socket.emit('issueNotification', notification);
                
                // Clear form fields
                $scope.title = '';
                $scope.description = '';
                
                // redirect to the new Issue view
                $state.go('issues.view', {
                    issueId: issue._id
                });
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        // Remove existing Issue
        $scope.remove = function (issue) {
            if (issue) {
                issue.$remove();
                
                $scope.issues.splice($scope.issues.indexOf(issue), 1);

                // build the new Issuenotification
                var notification = {
                    type: 'issueRemoved',
                    data: issue
                };
                
                // Emit a 'issueNotification' message event
                Socket.emit('issueNotification', notification);

            } else {
                $scope.issue.$remove(function (issue) {
                    // build the new Issuenotification
                    var notification = {
                        type: 'issueRemoved',
                        data: issue
                    };
                    
                    // Emit a 'issueNotification' message event
                    Socket.emit('issueNotification', notification);                    

                    $state.go('issues.list');
                });
            }
        };
        
        // Update existing Issue
        $scope.update = function () {
            var issue = $scope.issue;
            
            issue.$update(function () {
                $state.go('issues.view', {
                    issueId: issue._id
                });
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        // Find a list of Issues
        $scope.find = function () {
            $scope.issues = Issues.query();
        };
        
        // Find existing Issue
        $scope.findOne = function () {
            $scope.issue = Issues.get({
                issueId: $stateParams.issueId
            });
        };

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function () {
            Socket.removeListener('issueAdded');
            Socket.removeListener('issueRemoved');
        });

    }
]);
