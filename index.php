<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$input = file_get_contents('php://input');
	$inputData = json_decode($input);

	$binary = './graph-theory';

	$cmd = $binary . ' ' . $inputData->func . ' ';

	foreach ($inputData->args as $arg) {
        foreach ($arg as $key => $val) {
            if (strpos($key, '$') === false) {
                $cmd .= escapeshellarg($val) . ' ';
            }
        }
	}

    $escaped = escapeshellcmd($cmd);

	$output = `$escaped`;

    $response = new stdClass();

	if (strpos($output, 'error') !== false) {
		$response->error = $output;
	}
	else {
		$response->output = $output;
	}

	header('Content-Type: application/json');

	echo json_encode($response);

    exit;
}
else{
?><!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Linear Algebra</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="apple-touch-icon" href="apple-touch-icon.png">

	<link rel="stylesheet" href="css/bootstrap.min.css">
	<style>
		body {
			padding-top: 50px;
			padding-bottom: 20px;
		}
	</style>
	<link rel="stylesheet" href="css/main.css">

	<script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
    <link rel="stylesheet" href="/css/font-awesome.min.css">
</head>
<body>
<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Linear Algebra</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">

		</div><!--/.navbar-collapse -->
	</div>
</nav>

<div class="functions container" ng-app="linAlg" ng-controller="funcs">
	<!-- Example row of columns -->
	<div class="row">
        <div class="col-sm-9" id="funcList">
            <div class="col-sm-6" ng-repeat="(funcKey, funcValue) in functions">
                <div class="well bs-component">
                    <form class="form-horizontal" ng-init="funcValue.data.id = funcKey">
                        <fieldset>
                            <legend>Function {{funcKey}}<span class="pull-right"><a ng-click="rmFunction(funcKey)" href="#"><i class="fa fa-times"></i></a></span></legend>
                            <div class="form-group">
                                <select class="form-control" name="selectedFunction" id="selectedFunction" ng-model="funcValue.data.func" ng-change="funcValue.data.args = functionMap[funcValue.data.func].args">
                                    <option ng-repeat="(cppFuncKey, cppFuncValue) in functionMap" value="{{cppFuncKey}}">{{cppFuncKey}}</option>
                                </select>
                            </div>

                            <div class="panel panel-danger" ng-if="funcValue.error">
                                <div class="panel-heading">
                                        <h3 class="panel-title">Error</h3>
                                    </div>
                                <div class="panel-body">
                                    {{funcValue.error}}
                                </div>
                            </div>

                            <div class="form-group" ng-repeat="(argKey, argValue) in funcValue.data.args" ng-if="funcValue.data.func">
                                <div ng-repeat="(innerArgKey, innerArgValue) in argValue">
                                    <div class="col-xs-12" ng-if= "innerArgKey == 'vector' || innerArgKey == 'matrix'">
                                        <label for="{{innerArgKey}}" class="col-lg-2 control-label">{{innerArgKey}}</label>
                                        <div class="col-lg-10">
                                            <textarea class="form-control" rows="5" ng-model="funcValue.data.args[argKey][innerArgKey]"  placeholder="{{innerArgValue}}"></textarea>
                                            <span class="help-block"></span>
                                        </div>
                                    </div>
                                    <div class="col-xs-12" ng-if= "innerArgKey == 'scalar'">
                                        <label for="{{innerArgKey}}" class="col-lg-2 control-label">{{innerArgKey}}</label>
                                        <div class="col-lg-10">
                                            <input type="text" step="0.00001" ng-model="funcValue.data.args[argKey][innerArgKey]" class="form-control" placeholder="{{innerArgValue}}">
                                        </div>
                                    </div>
                                    <div class="col-xs-12" ng-if= "innerArgKey == 'bool'">
                                        <label for="{{innerArgKey}}" class="col-lg-2 control-label">{{innerArgKey}}</label>
                                        <div class="col-lg-10">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" ng-model="funcValue.data.args[argKey][innerArgKey]"> {{innerArgValue}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12" ng-if="funcKey" style="margin:top:1em;">
                                        <div class="btn-group pull-right">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fa fa-paste"></i> &nbsp; Action <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a ng-click="funcValue.data.args[argKey][innerArgKey] = functions[funcKey - 1].response.trim()">Copy from previous function</a></li>
                                                <li role="separator" class="divider"></li>
                                                <li><a ng-click="funcValue.data.args[argKey][innerArgKey] = lastResponse.trim()">Copy from results area</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="col-xs-12" ng-if="funcValue.data.func">
                            <button class="btn btn-success pull-right" style="border-radius: 50%;" ng-click="call(functions[funcKey].data)"><a style="color:white;" title="Call Function"><i class="fa fa-arrow-right"></i></a></button>
                        </div>
                        <div class="col-xs-12" ng-if="funcValue.response">
                            <h4>Result</h4>
                            <pre style="background-color: white;">{{funcValue.response}}</pre>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <h3>Last Result <span ng-if="selectedCppName">of {{selectedCppName}}</span></h3>
            <pre>{{lastResponse}}</pre>
        </div>
	</div>



	<footer>
        <div class="row">
            <div class="col-xs-12">
                <button class="btn btn-primary" style="border-radius: 50%;" ng-click="addFunction()"><a style="color:white;" title="Add Function"><i class="fa fa-plus"></i></a></button>
            </div>
        </div>
	</footer>
</div> <!-- /container -->

<script src="js/vendor/jquery-1.11.2.min.js"></script>

<script src="js/vendor/bootstrap.min.js"></script>

<script src="js/main.js"></script>

</body>
</html>
<?php
}
