'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var cgUtils = require('../utils.js');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
var chalk = require('chalk');
var path = require('path');
var slash = require('slash');

var ModalGenerator = module.exports = function ModalGenerator(args, options, config) {

    cgUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ModalGenerator, yeoman.generators.Base);

ModalGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addNamePrompt(this,prompts,'modal');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        cgUtils.askForModuleAndDir('modal',this,true,cb);
    }.bind(this)); 

};

ModalGenerator.prototype.files = function files() {
    this.uirouter = this.config.get('uirouter');
    this.srvname = _.camelize(this.name);
    this.ctrlname = _.camelize(_.classify(this.name)) + 'Ctrl';
    this.className = _.dasherize(this.appname) + '-' + _.dasherize(this.name);
    this.templateUrl = slash(path.join(this.dir,this.name + '.html'));
    cgUtils.processTemplates(this.name,this.dir,'modal',this,null,null,this.module);
};