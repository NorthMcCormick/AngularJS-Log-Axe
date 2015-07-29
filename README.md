# AngularJS Log Axe

Simplify and create meaningful logs in your AngularJS projects with Log Axe. Features planned/current:
  - Log Tags
  - Default/Custom log prefix and suffix
  - Post/pre hooks
  - Run Time
  - More......?

LogAxe comes about trying to log the crap out of my Angular projects which makes my logs look like a forest you can't see through. By cutting out things you don't need to see and giving some extra key details on the things you are seeing, I hope to make my debugging easier and more managable in production and development environments. 

## Version
0.0.1

## Installation

Put angular-logaxe.js or angular-logaxe.min.js in your javascript folder and reference it.

```
<script src="js/angular/angular-logaxe.min.js"></script>
```

Then add the module to your AngularJS app.

```sh
angular.module('myApp', [ ...., 'ngLogAxe']);
```

## Usage

### Configure LogAxe

Log axe comes out of the box already configured but it's highly encouraged that you adapt this config to your needs.

| Config Name | Config Variable | Description | Default|
|-------------|-----------------|-------------|--------|
| Enable Log Axe Debugging | logAxeDebugging | This enables a fall back onto console.log that outputs the raw arguments you are logging including the options. This is useful to debug LogAxe. | false |
| Tags | tags | If 'tags' is undefined or an empty array LogAxe will log everything. If tags is set to an array of tags LogAxe will only log those specified tags. | Empty Array |
| Hidden Tags | hideTags | Any tags in this array will be hidden. Takes priority over the shown tags property.| Empty Array |
| Prefix | prefix | Define a global string or array of elements to include before each log's arguments. | Array with one element: 'time' |
| Clear Trace Parent On State Change | clearTraceOnStateChange | Wipe the trace parent prefix on state change automatically | true |
|||||

### Log Axe Debugging

LogAxe is not perfect, if you need to debug why LogAxe is not picking up an argument or showing something weird you can enable deeper debug logs that fall back and use console.log().

### Tags

Tags are a really powerful feature of LogAxe. Tags enable you to show specific logs based on the content that you say they are. For example:

```
$log.debug({
	tags : ['http']
}, "Testing");
```

If LogAxe has no tags configured this log will always be displayed. If LogAxe is set to a different set of tags however it will not:

```
$log.setTags(['notHttp', 'http_results']);
```

When your application is run, the "Testing" log will not be shown. Set your tag to http however:

```
$log.setTags(['http', 'http_results']);
```

And that log will be shown.

### Hidden Tags

Hidden tags are great for narrowing down your scope on the fly. You can set hidden tags with 
```
$log.setHiddenTags([]);
```
Or in the configuration variable using ```hideTags```

Hidden tags take priority over the shown tags that you define. For example:

```
$log.setTags(['b']);
$log.setHiddenTags(['c']);

$log.warn({ tags:['a','b','c']}, "A B C");
$log.warn({ tags:['a','b']}, "A B");
$log.warn({ tags:['a']}, "A");
```

This will only return 'A B'.

### Prefixing

Prefixing is an easy way to pin point where and when your logs are coming in. The prefix property can be set globally and set per-log. The default global is ```['time']```. The value of prefix can be an array of strings or a single string. If a string or variable in the array doesn't match one of the element types its value will be printed.

If prefix is just "My Prefix" then each log will be displayed as
```
My Prefix - Your Log Arguments
```
If prefix is an array like ```['time']``` then each log will be displayed as
```
10:42:16 GMT-0600 (MDT) - Your Log Arguments
```

Here is a table of the possible elements (prefixed in "la_" to avoid conflicts):

| Element Type | String | Description | Value |
|--------------|--------|-------------|-------|
| Time Stamp | "la_time" | Displays the current time w/ time zone for accuracy | 10:42:16 GMT-0600 (MDT) |
| Date Stamp | "la_date" | Displays the current date in a human readable format. | 2015-61-24 |
| Date/Time Stamp | "datetime" | Displays time and date stamp |  |
|||||
