# AngularJS Log Axe

Simplify and create meaningful logs in your AngularJS projects with Log Axe. Features planned/current:
  - Log Categories
  - Default/Custom log prefix and suffix
  - Persistent log objects
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
| Tags | tags | If 'tags' is undefined or an empty array LogAxe will log everything. If tags is set to an array of tags LogAxe will only log those specified tags. | [] (Empty Array) |
|||||