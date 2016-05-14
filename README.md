# PHP-Linear-Algebra
This project serves as a front end for [https://github.com/adam-r-kowalski/graph-theory](https://github.com/adam-r-kowalski/graph-theory), the excellent command line tool for solving linear algebra equeations.

Interoperability with the C++ command line is powered by a simple PHP API which parses the input provided by Angular and returns the response. Reponses can be chained so that the the output of one function can be provided directly as the input to the next.

## Hamiltonian Circuits
A solution is in place for finding hamiltonian circuits using the algorithm developed by [Johnny Viel](https://github.com/JohnnyViel). Input should be in the form of a white space and new line delimited adjacency matrix.

## Function List

The following functions are exposed through the API.

* magnitude
* dot
* scaleVector
* lower
* upper
* column
* vectorMatrixInnerProduct
* matrixVectorInnerProduct
* innerProduct
* outerProduct
* diagonal
* minorDiagonal
* trace
* scaleMatrix
* subtract
* transpose
* adjacencyFromLaplacian
* complement
* degree
* laplacian
* incidence
* algebraicConnectivity
* eigenvalues
* determinant
* connected
* hasEulerCircuit
* eulerCircuit
* minimalSpanningTree
* spectralGap
* spectralRadius
* connectedComponents
* numSpanningTrees
* isSymmetric
* isSquare
* isJagged
* hamiltonianCircuit

## Installation

Clone the graph-theory repo and compile the binary.

```bash
git clone https://github.com/adam-r-kowalski/graph-theory.github
cd graph-theory
g++ -std=c++14 -o graph_theory main.cpp -lgmpxx -lgmp -lgsl -lgslcblas -lm -g
```

Clone this repo and place the compiled binary in the web root

```bash
git clone https://github.com/ryantate13/PHP-Linear-Algebra.git
cp graph-theory/graph_theory PHP-Linear-Algebra
```