var app = angular.module('linAlg', []);
app.controller('funcs', function($scope, $http) {
    $scope.functionMap = {
        'magnitude' : {
            'args' : [
                {'vector': 'Vector'}
            ]
        },
        'dot' : {
            'args' : [
                {'vector': 'Vector 1'},
                {'vector': 'Vector 2'}
            ]
        },
        'scaleVector' : {
            'args' : [
                {'scalar': 'Scalar'},
                {'vector': 'Vector'}
            ]
        },
        'lower' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'upper' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'column' : {
            'args' : [
                {'scalar': 'Scalar'},
                {'matrix': 'Matrix'}
            ]
        },
        'vectorMatrixInnerProduct' : {
            'args' : [
                {'vector': 'Vector'},
                {'matrix': 'Matrix'}
            ]
        },
        'matrixVectorInnerProduct' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'vector': 'Vector'}
            ]
        },
        'matrixMatrixInnerProduct' : {
            'args' : [
                {'matrix': 'Matrix 1'},
                {'matrix': 'Matrix 2'}
            ]
        },
        'outerProduct' : {
            'args' : [
                {'matrix': 'Matrix 1'},
                {'matrix': 'Matrix 2'}
            ]
        },
        'diagonal' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'minorDiagonal' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'trace' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'scaleMatrix' : {
            'args' : [
                {'scalar': 'Scalar'},
                {'matrix': 'Matrix'}
            ]
        },
        'subtractMatrix' : {
            'args' : [
                {'matrix': 'Matrix 1'},
                {'matrix': 'Matrix 2'}
            ]
        },
        'transpose' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'adjacencyFromLaplacian' : {
            'args' : [
                {'matrix': 'Laplacian Matrix'}
            ]
        },
        'complement' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'degree' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'laplacianFromAdjacency' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ]
        },
        'laplacianFromAdjacencyAndDegree' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'},
                {'matrix': 'Degree Matrix'}
            ]
        },
        'incidence' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ]
        },
        'algebraicConnectivity' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'bool': 'Is adjacency?'}
            ]
        },
        'eigenvalues' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'determinant' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'connected' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'bool': 'Is adjacency?'}
            ]
        },
        'eulerCircuit' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ]
        },
        'minimalSpanningTree' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ]
        },
        'spectralGap' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'bool': 'Is adjacency?'}
            ]
        },
        'spectralRadius' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'bool': 'Is adjacency?'}
            ]
        },
        'connectedComponents' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'bool': 'Is adjacency?'}
            ]
        },
        'isSymmetric' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'isSquare' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'isJagged' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        },
        'HamiltonianCircuit' : {
            'args' : [
                {'matrix': 'Matrix'}
            ]
        }

    };

    $scope.lastResponse = 'Function output will go here...';

    $scope.functionPrototype = {
        'name': 'Function',
        'data': {}
    };

    $scope.functions = [
        angular.copy($scope.functionPrototype)
    ];

    $scope.addFunction = function(index){
        console.log('Adding Function...');

        index = index || $scope.functions.length;

        $scope.functions.splice(index,0,
            angular.copy(
                $scope.functionPrototype
            )
        );

        $('#funcList').animate({ scrollLeft: '+=500'}, 500);
    };

    $scope.rmFunction = function(funcIndex){
        $scope.functions.splice(funcIndex,1)
    };

    $scope.call = function(func){
        $http.post(
            '/',
            JSON.stringify(func)
        ).then(function successCallback(response) {
            console.log(response);
            var sentData = angular.fromJson(response.config.data);
            var formId = sentData.id;
            if (response.data.error) {
                $scope.functions[formId].error = response.data.error;
            }
            else{
                $scope.functions[formId].response = response.data.output;
                $scope.functions[formId].error = false;
                $scope.lastResponse = response.data.output;
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});
