'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var cgUtils = require('../utils.js');
var reader = require('html-wiring');

var CgangularGenerator = module.exports = function CgangularGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.config.set('viewDirectory','view/');
        this.config.set('modalDirectory','view/');
        this.config.set('directiveDirectory','directive/');
        this.config.set('filterDirectory','filter/');
        this.config.set('serviceDirectory','service/');
        var inject = {
            // js: {
            //     file: 'index.html',
            //     marker: cgUtils.JS_MARKER,
            //     template: '<script src="<%= filename %>"></script>'
            // },
            less: {
                relativeToModule: true,
                file: '<%= module %>.less',
                marker: cgUtils.LESS_MARKER,
                template: '@import "<%= filename %>";'
            }
        };
        this.config.set('inject',inject);
        this.config.save();
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(reader.readFileAsString(path.join(__dirname, '../../package.json')));
};

util.inherits(CgangularGenerator, yeoman.generators.Base);

CgangularGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'appname',
        message: 'What would you like the angular app/module name to be?',
        default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
        this.appname = props.appname;
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.askForUiRouter = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'router',
        type:'list',
        message: 'Which router would you like to use?',
        default: 1,
        choices: ['Standard Angular Router','Angular UI Router (recommended)']
    }];

    this.prompt(prompts, function (props) {
        if (props.router === 'Angular UI Router (recommended)') {
            this.uirouter = true;
            this.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.min.js';
            this.routerModuleName = 'ui.router';
            this.routerViewDirective = 'ui-view';
        } else {
            this.uirouter = false;
            this.routerJs = 'bower_components/angular-route/angular-route.min.js';
            this.routerModuleName = 'ngRoute';
            this.routerViewDirective = 'ng-view';
        }
        this.config.set('uirouter',this.uirouter);
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.askForIe = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'ie',
        type:'list',
        message: 'Support IE8?',
        default: 1,
        choices: ['Yes','No (recommended)']
    }];

    this.prompt(prompts, function (props) {
        this.ie8 = props.ie !== 'No (recommended)';
        this.config.set('ie8',this.ie8);
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.app = function app() {
    this.directory('skeleton/','./');
};
