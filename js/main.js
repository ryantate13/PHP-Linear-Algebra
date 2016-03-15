var app = angular.module('linAlg', []);
app.controller('funcs', function($scope, $http) {
    $scope.functionMap = {
        'magnitude' : {
            'args' : [
                {'vector': 'Vector'}
            ],
            'description': 'get the magnitude of a vector'
        },
        'dot' : {
            'args' : [
                {'vector': 'Vector 1'},
                {'vector': 'Vector 2'}
            ],
            'description': 'get the dot product of two vectors'
        },
        'scaleVector' : {
            'args' : [
                {'scalar': 'Scalar'},
                {'vector': 'Vector'}
            ],
            'description': 'multiply each element of a vector by a scalar'
        },
        'lower' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the bottom left triangle matrix'
        },
        'upper' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the upper right triangle matrix'
        },
        'column' : {
            'args' : [
                {'scalar': 'Scalar'},
                {'matrix': 'Matrix'}
            ],
            'description': 'get the nth column from a matrix'
        },
        'vectorMatrixInnerProduct' : {
            'args' : [
                {'vector': 'Vector'},
                {'matrix': 'Matrix'}
            ],
            'description': 'get the inner product of a vector and a matrix'
        },
        'matrixVectorInnerProduct' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'vector': 'Vector'}
            ],
            'description': 'get the inner product of a matrix and a vector'
        },
        'innerProduct' : {
            'args' : [
                {'matrix': 'Matrix 1'},
                {'matrix': 'Matrix 2'}
            ],
            'description': 'get the inner product of two matrices'
        },
        'outerProduct' : {
            'args' : [
                {'matrix': 'Matrix 1'},
                {'matrix': 'Matrix 2'}
            ],
            'description': 'get the outer product of two matrices'
        },
        'diagonal' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the major diagonal of a square matrix'
        },
        'minorDiagonal' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the minor diagonal of a square matrix'
        },
        'trace' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the trace of a square matrix (sum of diagonal)'
        },
        'scaleMatrix' : {
            'args' : [
                {'scalar': 'Scalar'},
                {'matrix': 'Matrix'}
            ],
            'description': 'multiply each element in a matrix by a scalar'
        },
        'subtract' : {
            'args' : [
                {'matrix': 'Matrix 1'},
                {'matrix': 'Matrix 2'}
            ],
            'description': 'subtract two matrices from each other element wise'
        },
        'transpose' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'flip the rows and columns of a matrix'
        },
        'adjacencyFromLaplacian' : {
            'args' : [
                {'matrix': 'Laplacian Matrix'}
            ],
            'description': 'get the adjacency matrix given a laplacian matrix'
        },
        'complement' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the complement of a matrix'
        },
        'degree' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the degree matrix given a adjacency matrix'
        },
        'laplacian' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ],
            'description': 'get the laplacian matrix given a adjacency matrix'
        },
        'incidence' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ],
            'description': 'get the incidence matrix given a adjacency matrix'
        },
        'algebraicConnectivity' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the algebraic connectivity given a adjacency matrix'
        },
        'eigenvalues' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the eigenvalues of a matrix'
        },
        'determinant' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the determinant of a matrix'
        },
        'connected' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'given a adjacency matrix, check if the graph is connected'
        },
        'hasEulerCircuit' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ],
            'description': 'given a adjacency matrix, check if euler circuit exists'
        },
        'eulerCircuit' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ],
            'description': 'given a adjacency matrix, find the euler circuit'
        },
        'minimalSpanningTree' : {
            'args' : [
                {'matrix': 'Adjacency Matrix'}
            ],
            'description': 'given a adjacency matrix, get the adjacency matrix of minimal spanning tree. sum the upper matrix to get the cost of traversal'
        },
        'spectralGap' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the spectral gap given a adjacency matrix'
        },
        'spectralRadius' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the spectral radius given a adjacency matrix'
        },
        'connectedComponents' : {
            'args' : [
                {'matrix': 'Matrix'},
                {'bool': 'Is adjacency?'}
            ],
            'description': 'get the number of connected components given an adjacency matrix'
        },
        'numSpanningTrees' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the number of spanning trees given an adjacency matrix'
        },
        'isSymmetric' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'check whether a matrix is symmetric'
        },
        'isSquare' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'check whether a matrix is square'
        },
        'isJagged' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'check whether a matrix is jagged'
        },
        'hamiltonianCircuit' : {
            'args' : [
                {'matrix': 'Matrix'}
            ],
            'description': 'get the hamiltonian circuit given a adjacency matrix'
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

app.filter('capitalize', function() {
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});