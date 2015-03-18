/*
 Copyright 2015 Province of British Columbia

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 */

'use strict';

angular.module('bcdevxApp.resources', ['ngRoute', 'ngSanitize', 'ui.highlight'])

    .config(['$routeProvider', function($routeProvider) {

    }])

    .factory('ResourceList', ['$resource', function($resource) {
        var results = $resource('/resources');
        $("#pgloading").hide();
        return results;
    }])

    .factory('SourceList', ['$resource', function($resource) {
        return $resource('/resources-sources');
    }])


    .controller('ResourcesCtrl', ['$rootScope', '$scope', '$location', '$window', 'ResourceList', 'SourceList', function($rootScope, $scope, $location, $window, ResourceList, SourceList) {

        $scope.selectedSource = '';
        $scope.selectedSourceTitle = '';
        $scope.predicateTitle = '';

        ResourceList.get({}, function(data) {
            $scope.resources = data.resources;
        });

        SourceList.get({}, function(data) {
            $scope.sources = data.sources;
        });

        $scope.hasMatchingSource = function(actual, expected) {
            if(expected.short_name == "") return true; // Filtering by null should show all results
            if(!actual.short_name || !expected.short_name) return false;
            return actual.short_name == expected.short_name;
        }

        $scope.selectSource = function(event, newSource, newSourceTitle) {
            event.preventDefault();
            $scope.selectedSource = newSource;
            $scope.selectedSourceTitle = newSourceTitle;
        }
    }]);