'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var cgUtils = require('../utils.js');
var _ = require('underscore');
var chalk = require('chalk');
var fs = require('fs');
var url = require('url');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ViewGenerator, yeoman.generators.Base);

ViewGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'route',
            message: 'Enter your route url (i.e. /myview/:id).  If you don\'t want a route added for you, leave this empty.'
        }
    ];

    cgUtils.addNamePrompt(this, prompts, 'view');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = props.name;
        }
        this.route = url.resolve('', props.route);
        cgUtils.askForModuleAndDir('view', this, true, cb);
    }.bind(this));
};

ViewGenerator.prototype.files = function files() {

    this.ctrlname = _.camelize(_.classify(this.name)) + 'Ctrl';
    this.className = _.dasherize(this.appname) + '-' + _.dasherize(this.name);
    this.uirouter = this.config.get('uirouter');
    this.hasRoute = this.route && this.route.length > 0;
    this.viewUrl = (this.dir + this.name + '.html').replace(/\\/g, '/');
    
    cgUtils.processTemplates(this.name, this.dir, 'view', this, null, null, this.module);
    

};
