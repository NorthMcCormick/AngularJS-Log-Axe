var ngLogAxe = angular.module('ngLogAxe', []);

ngLogAxe.config(['$provide', function($provide) {
	$provide.decorator("$log", function($delegate, logAxeFactory) {
		return logAxeFactory($delegate);
	})
}])

/*
	Config Object
*/

/* Prefix Types
	time - time stamp
	date - just the date
	timedate - both
	controller - current controller
	function - function
*/

ngLogAxe.value('ngLogAxeConfig', {
	logAxeDebugging : false,
	tags : [],
	prefix : ['la_time'],
	production : true,
	hideOnProduction : [],
	traceParent : ''
});

ngLogAxe.factory("logAxeFactory", ['ngLogAxeConfig', function(ngLogAxeConfig) {

	function returnLogArray(args) {
		var newArguments = [];
		var options = args[0];

		/*
			options.prefix = string or array of options
			options.suffix = string or array of options
			options.prehook = function
			options.posthook = function
			options.tags = array of tags
		*/

		var shouldLog = false;

		if(options !== undefined) {
			if(ngLogAxeConfig.tags !== undefined) { // Tags
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

			if(ngLogAxeConfig.prefix !== null && ngLogAxeConfig.prefix !== '') {
				var prefix = '';

				if(ngLogAxeConfig.logAxeDebugging == true) console.log(Object.prototype.toString.call(ngLogAxeConfig.prefix));
				if(ngLogAxeConfig.logAxeDebugging == true) console.log(ngLogAxeConfig.prefix);
				if(ngLogAxeConfig.logAxeDebugging == true) console.log(ngLogAxeConfig);

				switch(Object.prototype.toString.call(ngLogAxeConfig.prefix)) {
					case '[object Array]':
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("Object Array Prefix Type");

						function formatDate(dateObject) {
							return (dateObject.getFullYear() + "-" + dateObject.getMonth() + 1) + "-" + dateObject.getDate();
						}

						ngLogAxeConfig.prefix.forEach(function(prefixType, ind) {
							switch(prefixType) {
								case 'la_time':
									prefix += new Date().toTimeString();
								break;

								case 'la_date':
									prefix += formatDate(new Date());
								break;

								default:
									prefix += prefixType;
								break;
							}

							if(ind !== ngLogAxeConfig.prefix.length-1) {
								prefix += '|';
							}
						})
					break;
					case '[object String]':
						prefix = ngLogAxeConfig.prefix;
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("String Prefix Type");
					break;
					default: 
						prefix = 'Invalid Prefix Type';
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("Invalid Prefix Type");
					break;
				}

				if(options.traceParent !== undefined) {
					prefix += options.traceParent;
					if(ngLogAxeConfig.logAxeDebugging == true) console.log("Trace Parent (from opts): ", options.traceParent);
				}else{
					if(ngLogAxeConfig.traceParent !== '') {
						prefix += ngLogAxeConfig.traceParent;
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("Trace Parent (from config): ", ngLogAxeConfig.traceParent);
					}
				}



				if(ngLogAxeConfig.logAxeDebugging == true) console.log("Prefix", prefix);
				if(ngLogAxeConfig.logAxeDebugging == true) console.log("Prefix Raw", ngLogAxeConfig.prefix);

				if(args[1] !== undefined) {
					if(typeof args[1] === 'string') {
						args[1] = prefix + '-' + args[1];
					}else{
						args.splice(1, 0, prefix);
					}
				}else{
					args[1] == prefix;
				}
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

				if(obj.logAxeDebugging == undefined) {
					obj.logAxeDebugging = false;
				}

				if(obj.tags == undefined) {
					obj.tags = [];
				}

				if(obj.prefix == undefined) {
					obj.prefix = ['la_time'];
				}

				if(obj.production == undefined) {
					obj.production = true;
				}

				if(obj.hideOnProduction == undefined) {
					obj.hideOnProduction = [];
				}

				if(obj.traceParent == undefined) {
					obj.traceParent = '';
				}

				ngLogAxeConfig = obj;
				$delegate.info("Log Axe Configured");
			},
			setTraceParent : function(newTraceParent) {
				ngLogAxeConfig = newTraceParent;
			},
			setTags : function(tags) {
				ngLogAxeConfig.tags = tags;
				$delegate.info("Log Axe Tags Set");
			},
			log : function() {
				try {
					var args = returnLogArray(arguments);
					if(args !== false) {
						$delegate.log.apply(null, args);
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
					}
				} catch(e) {
					console.error("LogAxe Exception: " + e);
				}
			},
			info : function() {
				try {
					var args = returnLogArray(arguments);
					if(args !== false) {
						$delegate.info.apply(null, args);
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
					}
				}catch(e) {
					console.error("LogAxe Exception: " + e);
				}
			},
			error : function() {
				try {
					var args = returnLogArray(arguments);
					if(args !== false) {
						$delegate.error.apply(null, args);
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
					}
				}catch(e) {
					console.error("LogAxe Exception: " + e);
				}
			},
			warn : function() {
				try {
					var args = returnLogArray(arguments);
					if(args !== false) {
						$delegate.warn.apply(null, args);
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
					}
				}catch(e) {
					console.error("LogAxe Exception: " + e);
				}
			},
			debug : function() {
				try {
					var args = returnLogArray(arguments);
					if(args !== false) {
						$delegate.debug.apply(null, args);
						if(ngLogAxeConfig.logAxeDebugging == true) console.log("LOGAXE: ", arguments);
					}
				}catch(e) {
					console.error("LogAxe Exception: " + e);
				}
			}
		}
	}
}])