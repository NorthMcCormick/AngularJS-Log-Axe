var ngLogAxe = angular.module('ngLogAxe', []);

ngLogAxe.config(['$provide', function($provide) {
	$provide.decorator("$log", function($delegate, logAxeFactory) {
		return logAxeFactory($delegate);
	})
}])

ngLogAxe.value('ngLogAxeConfig', {
	logAxeDebugging : false,
	tags : []
});

ngLogAxe.factory("logAxeFactory", ['ngLogAxeConfig', function(ngLogAxeConfig) {

	function returnLogArray(args) {
		var newArguments = [];
		var options = args[0];

				var shouldLog = false;

		if(options !== undefined) {
			if(ngLogAxeConfig.tags !== undefined) {
				if(ngLogAxeConfig.tags.length > 0) {
					if(options.tags !== undefined) {

						options.tags.forEach(function(tag) {
							ngLogAxeConfig.tags.forEach(function(masterTag) {
								if(tag == masterTag) {
									shouldLog = true;
								}
							})
						})
					}
				}else{
					shouldLog = true;
				}
			}else{
				shouldLog = true;
			}
		}

		if(shouldLog) {
			for(var i = 1; i < args.length; i++) {
				newArguments.push(args[i]);
			}

			return newArguments;
		}else{
			return false;
		}
	}

	return function($delegate) {
		return {
			setConfig : function(obj) {
				ngLogAxeConfig = obj;
				$delegate.info("Log Axe Configured");
			},
			setTags : function(tags) {
				ngLogAxeConfig.tags = tags;
				$delegate.info("Log Axe Tags Set");
			},
			log : function() {
				var args = returnLogArray(arguments);
				if(args !== false) {
					$delegate.log.apply(null, args);
					if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
				}
			},
			info : function() {
				var args = returnLogArray(arguments);
				if(args !== false) {
					$delegate.info.apply(null, args);
					if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
				}
			},
			error : function() {
				var args = returnLogArray(arguments);
				if(args !== false) {
					$delegate.error.apply(null, args);
					if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
				}
			},
			warn : function() {
				var args = returnLogArray(arguments);
				if(args !== false) {
					$delegate.warn.apply(null, args);
					if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
				}
			},
			debug : function() {
				var args = returnLogArray(arguments);
				if(args !== false) {
					$delegate.debug.apply(null, args);
					if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
				}
			}
		}
	}
}])