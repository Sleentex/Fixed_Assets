var app = angular.module('fixed_assets', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/videos', {
            templateUrl: 'partials/videos/videos.html',
            controller: 'VideosCtrl'
        })
        .when('/video/:id', {
            templateUrl: 'partials/videos/video.html',
            controller: 'VideoCtrl'
        })
        .when('/add-video', {
            templateUrl: 'partials/videos/video-form.html',
            controller: 'AddVideoCtrl'
        })
      
        .when('/video/update/:id7', {
            templateUrl: 'partials/videos/video-form.html',
            controller: 'EditVideoCtrl'
        })
        .when('/video/delete/:id', {
            templateUrl: 'partials/videos/video-delete.html',
            controller: 'DeleteVideoCtrl'
        })
//persons---------------------------------------------------------------------------
        .when('/persons', {
            templateUrl: 'partials/persons/persons.html',
            controller: 'PersonsCtrl'
        })
        .when('/person/:id', {
            templateUrl: 'partials/persons/person.html',
            controller: 'PersonCtrl'
        })
        .when('/add-person', {
            templateUrl: 'partials/persons/person-form.html',
            controller: 'AddPersonCtrl'
        })
        .when('/person/update/:id7', {
            templateUrl: 'partials/persons/person-form.html',
            controller: 'EditPersonCtrl'
        })
        .when('/person/delete/:id', {
            templateUrl: 'partials/persons/person-delete.html',
            controller: 'DeletePersonCtrl'
        })
//departments---------------------------------------------------------------------------
        .when('/departments', {
            templateUrl: 'partials/departments/departments.html',
            controller: 'DepartmentsCtrl'
        })
        .when('/department/:id', {
            templateUrl: 'partials/departments/department.html',
            controller: 'DepartmentCtrl'
        })
        .when('/add-department', {
            templateUrl: 'partials/departments/department-form.html',
            controller: 'AddDepartmentCtrl'
        })
        .when('/department/update/:id7', {
            templateUrl: 'partials/departments/department-form.html',
            controller: 'EditDepartmentCtrl'
        })
        .when('/department/delete/:id', {
            templateUrl: 'partials/departments/department-delete.html',
            controller: 'DeleteDepartmentCtrl'
        })
//fixed_assets------------------------------------------------------------------------------
        .when('/fixed_assets', {
            templateUrl: 'partials/fixed_assets/fixed_assets.html',
            controller: 'Fixed_AssetsCtrl'
        })
        .when('/fixed_asset/:id', {
            templateUrl: 'partials/fixed_assets/fixed_asset.html',
            controller: 'Fixed_AssetCtrl'
        })
        .when('/add-fixed_asset', {
            templateUrl: 'partials/fixed_assets/fixed_asset-form.html',
            controller: 'AddFixed_AssetCtrl'
        })
        .when('/fixed_asset/update/:id7', {
            templateUrl: 'partials/fixed_assets/fixed_asset-form.html',
            controller: 'EditFixed_AssetCtrl'
        })
        .when('/fixed_asset/delete/:id', {
            templateUrl: 'partials/fixed_assets/fixed_asset-delete.html',
            controller: 'DeleteFixed_AssetCtrl'
        })
//info------------------------------------------------------------------------------
        .when('/infos', {
            templateUrl: 'partials/infos/infos.html',
            controller: 'InfosCtrl'
        })
        .when('/info/:id', {
            templateUrl: 'partials/infos/info.html',
            controller: 'InfoCtrl'
        })
        .when('/add-info', {
            templateUrl: 'partials/infos/info-form.html',
            controller: 'AddInfoCtrl'
        })
        .when('/info/update/:id7', {
            templateUrl: 'partials/infos/info-form.html',
            controller: 'EditInfoCtrl'
        })
        .when('/info/delete/:id', {
            templateUrl: 'partials/infos/info-delete.html',
            controller: 'DeleteInfoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
//----------------------------------------------------
app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var Videos = $resource('api/videos');

        Videos.query(function(videos3) {
            $scope.videosHTML = videos3;
        });
    }]);

app.controller('VideosCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var Videos = $resource('api/videos');

        Videos.query(function(videos3) {
            $scope.videosHTML = videos3;
        });
    }]);

app.controller('VideoCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams) {
        var Video = $resource('/api/videos/:id');
        Video.get({ id: $routeParams.id }, function(video) {
            $scope.video = video;
        });
    }
]);

app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.save = function() {
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function() {
                $location.path('/');
            });
        };
    }]);

app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Videos = $resource('/api/videos/:id8',  { id8: '@_id'}, {
            update: { method: 'PUT' }
        });

        Videos.get({ id8: $routeParams.id7 }, function(video) {
            $scope.video = video;
        });

        $scope.save = function() {
            Videos.update($scope.video, function() {
                $location.path('/');
            });
        }
    }]);
 
app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Videos = $resource('/api/videos/:id');

        Videos.get({ id: $routeParams.id }, function(video) {
            $scope.video = video;
        });

        $scope.delete = function() {
            Videos.delete({ id: $routeParams.id }, function(video) {
                $location.path('/');
            });
        }
    }]);

//info-------------------------------------------------------------------------------------------------

app.controller('InfosCtrl', ['$scope', '$resource', 
    function($scope, $resource) {
        var Fixed_Assets = $resource('api/fixed_assets/:id');
        var Type_Moves = $resource('api/type_moves/:id');
        var Persons = $resource('api/persons/:id');
        var Infos = $resource('/api/info');        
        Infos.query(function(infos) {

            infos.forEach(info => {
                Fixed_Assets.get({id:info.fixed_asset_id}, function(fixed_asset) {
                    info.fixed_asset = fixed_asset;
                });

                Type_Moves.get({id:info.type_move_id}, function(type_move) {
                    info.type_move = type_move;
                });

                Persons.get({id:info.person_id}, function(person) {
                    info.person = person;
                });
            });

            $scope.infos = infos;
        });
    }
]);
 
app.controller('InfoCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams) {
        var Infos = $resource('/api/info/:id');     
        var Fixed_Assets = $resource('api/fixed_assets/:id');
        var Type_Moves = $resource('api/type_moves/:id');
        var Persons = $resource('api/persons/:id');
          
        Infos.get({id:$routeParams.id}, function(info) {
            Fixed_Assets.get({id:info.fixed_asset_id}, function(fixed_asset) {
                info.fixed_asset = fixed_asset;
            });

            Type_Moves.get({id:info.type_move_id}, function(type_move) {
                info.type_move = type_move;
            });

            Persons.get({id:info.person_id}, function(person) {
                info.person = person;
            });

            $scope.info = info;
        });
    }
]);

app.controller('AddInfoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.add = true;

        var Infos = $resource('/api/info');
        var Persons = $resource('/api/persons');
        var Fixed_Assets = $resource('/api/fixed_assets');
        var Type_Moves = $resource('/api/type_moves');

        Type_Moves.query(function(type_moves) {
            $scope.type_moves = type_moves;
        });

        Fixed_Assets.query(function(fixed_assets) {
            $scope.fixed_assets = fixed_assets;
        });

        Persons.query(function(persons) {
            $scope.persons = persons;
        });

        $scope.save = function() {
            Infos.save($scope.info, function() {
                $location.path('/info');
            });
        };
    }
]);

app.controller('EditInfoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Infos = $resource('/api/info/:id8',  { id8: '@_id'}, {
            update: { method: 'PUT' }
        });

        Infos.get({ id8: $routeParams.id7 }, function(info) {
            $scope.info = info;
        });

        var Persons = $resource('/api/persons');
        var Fixed_Assets = $resource('/api/fixed_assets');
        var Type_Moves = $resource('/api/type_moves');

        Type_Moves.query(function(type_moves) {
            $scope.type_moves = type_moves;
        });

        Fixed_Assets.query(function(fixed_assets) {
            $scope.fixed_assets = fixed_assets;
        });

        Persons.query(function(persons) {
            $scope.persons = persons;
        });
       
        $scope.save = function() {
            Infos.update($scope.info, function() {
                $location.path('/infos');
            });
        }
    }
]);

app.controller('DeleteInfoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Infos = $resource('/api/info/:id');
        var Fixed_Assets = $resource('api/fixed_assets/:id');
        var Type_Moves = $resource('api/type_moves/:id');
        var Persons = $resource('api/persons/:id');
          
        Infos.get({id:$routeParams.id}, function(info) {
            Fixed_Assets.get({id:info.fixed_asset_id}, function(fixed_asset) {
                info.fixed_asset = fixed_asset;
            });

            Type_Moves.get({id:info.type_move_id}, function(type_move) {
                info.type_move = type_move;
            });

            Persons.get({id:info.person_id}, function(person) {
                info.person = person;
            });

            $scope.info = info;
        });

        $scope.delete = function() {
            Infos.delete({ id: $routeParams.id }, function() {
                $location.path('/');
            });
        }
    }
]);


//persons----------------------------------------------------------------------------------------------

app.controller('PersonsCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var Persons = $resource('api/persons');

        Persons.query(function(persons) {
            $scope.persons = persons;
        });
    }
]);

app.controller('PersonCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams) {
        var Person = $resource('/api/persons/:id');
        Person.get({ id: $routeParams.id }, function(person) {
            $scope.person = person;
        });
    }
]);

app.controller('AddPersonCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.add = true;
        $scope.save = function() {
            var Persons = $resource('/api/persons');
            Persons.save($scope.person, function() {
                $location.path('/persons');
            });
        };
    }
]);

app.controller('EditPersonCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Persons = $resource('/api/persons/:id8',  { id8: '@_id'}, {
            update: { method: 'PUT' }
        });

        Persons.get({ id8: $routeParams.id7 }, function(person) {
            $scope.person = person;
        });

        $scope.save = function() {
            Persons.update($scope.person, function() {
                $location.path('/persons');
            });
        }
    }
]);
 
app.controller('DeletePersonCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Persons = $resource('/api/persons/:id');

        Persons.get({ id: $routeParams.id }, function(person) {
            $scope.person = person;
        });

        $scope.delete = function() {
            Persons.delete({ id: $routeParams.id }, function(person) {
                $location.path('/');
            });
        }
    }
]); 

//departments----------------------------------------------------------------------------------

app.controller('DepartmentsCtrl', ['$scope', '$resource', 
    function($scope, $resource) {
        var Departments = $resource('/api/departments');        
        Departments.query(function(departments) {
            $scope.departments = departments;
        });
    }
]);

app.controller('DepartmentCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams) {
        var Departments = $resource('/api/departments/:id');     
        var Persons = $resource('/api/departments/:id/persons'); 
          
        Departments.get({id:$routeParams.id}, function(department) {
            $scope.department = department;
            Persons.query({id:$routeParams.id}, function(persons) {
                $scope.department.persons = persons;
            })
        });
    }
]);

app.controller('AddDepartmentCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.add = true;

        var Departments = $resource('/api/departments');
        var Persons = $resource('/api/persons');

        Persons.query(function(persons) {
            $scope.persons = persons;
        });

        $scope.save = function() {
            Departments.save($scope.department, function() {
                $location.path('/departments');
            });
        };
    }
]);

app.controller('EditDepartmentCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Departments = $resource('/api/departments/:id8',  { id8: '@_id'}, {
            update: { method: 'PUT' }
        });

        Departments.get({ id8: $routeParams.id7 }, function(department) {
            $scope.department = department;
        });

        var Persons = $resource('/api/persons');
        Persons.query(function(persons) {
            $scope.persons = persons;
        });
       
        $scope.save = function() {
            Departments.update($scope.department, function() {
                $location.path('/departments');
            });
        }
    }
]);

app.controller('DeleteDepartmentCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Departments = $resource('/api/departments/:id');
        var Persons = $resource('/api/departments/:id/persons');   
        Departments.get({id:$routeParams.id}, function(department) {
            $scope.department = department;
            Persons.query({id:$routeParams.id}, function(persons) {
                $scope.department.persons = persons;
            })
        });

        $scope.delete = function() {
            Departments.delete({ id: $routeParams.id }, function(department) {
                $location.path('/');
            });
        }
    }
]);

//fixed_assets-------------------------------------------------------------------------------------------

app.controller('Fixed_AssetsCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var Fixed_Assets = $resource('api/fixed_assets');

        Fixed_Assets.query(function(fixed_assets) {
            $scope.fixed_assets = fixed_assets;
        });
    }
]);

app.controller('Fixed_AssetCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams) {
        var Fixed_Asset = $resource('/api/fixed_assets/:id');

        Fixed_Asset.get({ id: $routeParams.id }, function(fixed_asset) {
            $scope.fixed_asset = fixed_asset;
        });
    }
]);

app.controller('AddFixed_AssetCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.add = true;
        $scope.save = function() {
            var Fixed_Assets = $resource('/api/fixed_assets');
            Fixed_Assets.save($scope.fixed_asset, function() {
                $location.path('/fixed_assets');
            });
        };
    }
]);

app.controller('EditFixed_AssetCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Fixed_Assets = $resource('/api/fixed_assets/:id8',  { id8: '@_id'}, {
            update: { method: 'PUT' }
        });

        Fixed_Assets.get({ id8: $routeParams.id7 }, function(fixed_asset) {
            $scope.fixed_asset = fixed_asset;
        });

        $scope.save = function() {
            Fixed_Assets.update($scope.fixed_asset, function() {
                $location.path('/fixed_assets');
            });
        }
    }
]);
 
app.controller('DeleteFixed_AssetCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Fixed_Assets = $resource('/api/fixed_assets/:id');

        Fixed_Assets.get({ id: $routeParams.id }, function(fixed_asset) {
            $scope.fixed_asset = fixed_asset;
        });

        $scope.delete = function() {
            Fixed_Assets.delete({ id: $routeParams.id }, function() {
                $location.path('/');
            });
        }
    }
]); 