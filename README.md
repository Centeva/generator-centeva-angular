#generator-centeva-angular

>Yeoman Generator for Centeva Projects (http://www.centeva.com/)

This generator follows the [Angular Best Practice Guidelines for Project Structure](https://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html?_escaped_fragment_=).

Features

* Provides a directory structure geared towards large Angular projects.
    * Each controller, service, filter, and directive are placed in their own file.
    * All files related to a conceptual unit are placed together.  For example, the controller, HTML, LESS, and unit test for a partial are placed together in the same directory.
* Provides a ready-made Grunt build that produces an optimized distribution.
   * Build uses [grunt-ng-annotate](https://github.com/olov/ng-annotate) so you don't have to use the Angular injection syntax for safe minification (i.e. you dont need `$inject` or `(['$scope','$http',...`.
   * `grunt serve` task allows you to run a simple development server with watch/livereload enabled.
* Integrates Bower for package management
* Includes Yeoman subgenerators for directives, services, views (partial), filters, and modules.
* Integrates LESS and includes Bootstrap via the source LESS files allowing you to reuse Bootstrap vars/mixins/etc.
* Easily Testable - Each sub-generator creates a skeleton unit test.  Unit tests can be run via `grunt test` and they run automatically during the grunt watch that is active during `grunt serve`.

Directory Layout
-------------
All subgenerators prompt the user to specify where to save the new files.  Thus you can create any directory structure you desire, including nesting.  The generator will create a handful of files in the root of your project including `index.html`, `app.js`, and `app.less`.  You determine how the rest of the project will be structured.

In this example, the user has chosen to group the app into an `admin` folder, a `search` folder, and a `service` folder.


    /app ........................... App Folder
	  /app.less .................... main app-wide styles
      /app.js ...................... angular module initialization and route setup
      /view ........................ View Container
	    /home ...................... Example view
		  /home.js ................. Example view js file
		  /home.less ............... Example less file
		  /home.html ............... Example html file
		  /home-spec.js ............ Example unit test file.
	  /directive ................... Directive Container
	    /sign-in ................... Example Directive
		  /sign-in.js .............. JS File
		  /sign-in.html ............ Html file
		  /sign-in.spec.js ......... Unit test file
		  /sign-in.less ............ Less File
    /img ........................... images (not created by default but included in /dist if added)
    /bower_component................ 3rd party libraries managed by bower
    /node_modules .................. npm managed libraries used by grunt
	.bwerrrc ....................... defines a local Centeva only bower registry
	.csslintrc ..................... css/less lint rules
	.editorconfig .................. defines editor config (only obeyed by some editors, VS can with plugin)
	.jshintrc ...................... js hint rules
	bower.json ..................... bower packages
	bower_components.json .......... place to register packages for inclusion by grunt (to avoid a large file)
	index.html ..................... main HTML file
    Gruntfile.js ................... Grunt build file
	package.json ................... NPM packages

Getting Started
-------------

Prerequisites: Node, Grunt, Yeoman, and Bower.  Once Node is installed, do:

    npm install -g grunt-cli yo bower

Next, install this generator:

    npm install -g generator-centeva-angular

To create a project:

    mkdir MyNewAwesomeApp
    cd MyNewAwesomeApp
    yo centeva-angular

Grunt Tasks
-------------

Now that the project is created, you have 3 simple Grunt commands available:

    grunt serve   #This will run a development server with watch & livereload enabled.
    grunt test    #Run local unit tests.
    grunt build   #Places a fully optimized (minified, concatenated, and more) in /dist

When `grunt serve` is running, any changed javascript files will be linted using JSHint as well as have their appropriate unit tests executed.  Only the unit tests that correspond to the changed file will be run.  This allows for an efficient test driven workflow.

Yeoman Subgenerators
-------------

There are a set of subgenerators to initialize empty Angular components.  Each of these generators will:

* Create one or more skeleton files (javascript, LESS, html, spec etc) for the component type.
* Update index.html and add the necessary `script` tags.
* Update app.less and add the @import as needed.
* For views, update the app.js, adding the necessary route call if a route was entered in the generator prompts.

There are generators for `directive`,`partial`,`service`, `filter`, `module`, and `modal`.

Running a generator:

    yo centeva-angular:directive my-awesome-directive
    yo centeva-angular:view my-view
    yo centeva-angular:service my-service
    yo centeva-angular:filter my-filter
    yo centeva-angular:module my-module
    yo centeva-angular:modal my-modal

The name paramater passed (i.e. 'my-awesome-directive') will be used as the file names.  The generators will derive appropriate class names from this parameter (ex. 'my-awesome-directive' will convert to a class name of 'MyAwesomeDirective').  Each sub-generator will ask for the folder in which to create the new skeleton files.  You may override the default folder for each sub-generator in the `.yo-rc.json` file.

The modal subgenerator is a convenient shortcut to create views that work as modals for Bootstrap v3.1 and Angular-UI-Bootstrap v0.10 (both come preconfigured with this generator).  If you choose not to use either of these libraries, simply don't use the modal subgenerator.

Subgenerators are also customizable.  Please read [CUSTOMIZING.md](CUSTOMIZING.md) for details.

Submodules
-------------

Submodules allow you to more explicitly separate parts of your application.  Use the `yo centeva-angular:module my-module` command and specify a new subdirectory to place the module into.  Once you've created a submodule, running other subgenerators will now prompt you to select the module in which to place the new component.

Preconfigured Libraries
-------------

The new app will have a handful of preconfigured libraries included.  This includes Angular 1.2, Bootstrap 3, AngularUI Bootstrap, AngularUI Utils, FontAwesome 4, JQuery 2, Underscore 1.5, LESS 1.6, and Moment 2.5.  You may of course add to or remove any of these libraries.  But the work to integrate them into the app and into the build process has already been done for you.

Build Process
-------------

The project will include a ready-made Grunt build that will:

* Build all the LESS files into one minified CSS file.
* Uses [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) to turn all your views into Javascript.
* Uses [grunt-ng-annotate](https://github.com/olov/ng-annotate) to preprocess all Angular injectable methods and make them minification safe.  Thus you don't have to use the array syntax.
* Concatenates and minifies all Javascript into one file.
* Replaces all appropriate script references in `index.html` with the minified CSS and JS files.
* Minifies the `index.html`.

The resulting build loads only a few highly compressed files.

Release History
-------------
* 11/9/2014 - v3.2.0 - Switch from ngmin to ng-annotate.  Disabling grunt-contrib-imagemin so Windows users don't encounter its issues.  Subgenerators prompt for a name if not entered.  Other fixes.
* 7/6/2014 - v3.1.2 - Fix for directive template URLs with backslashes on Windows.
* 6/10/2014 - v3.1.1 - Fix for backslashes being used in injected routes/tags on subgenerators.
* 5/1/2014 - v3.1.0 - New subgenerators for modules and modals.  Replaced grunt-contrib-jasmine with grunt-karma.  Karma allows us to test against actual browsers other than PhantomJS.
* 3/10/2014 - v3.0.2 - Fix for directive files not being named correctly.  Fix for htmlmin from affecting some Bootstrap styles.
* 3/03/2014 - v3.0.0 - All subgenerators now ask the user for a directory enabling any user-defined project structure.  Gruntfile has been altered to allow scripts, partials, and LESS files to be located anywhere in the project directory structure.  An option to use `angular-ui-router` is now available when initializing a new project. `js/setup.js` and `css/app.less` moved to `app.js` and `app.less`.  `grunt server` is now `grunt serve`.  Inside `index.html` all user script tags are grouped together instead of split out into groups for services/filters/etc.  New ability to customize the subgenerators.
* 2/10/2014 - v2.1.1 - Fix for the directive spec file named with a .less extension.
* 1/06/2014 - v2.1.0 - Nice enhancements for unit testing.  Specs are now placed in the same directory as the component they're testing.  Additionally, unit tests are now run during `grunt server` allowing for an easy and efficient test-driven workflow.
* 12/30/2013 - v2.0.0 - Big Update.  Angular 1.2 and Bootstrap 3.  Newer versions of Angular UI, Font Awesome, and JQuery.  Lodash was replaced with Underscore.  Lots of other small changes.
* 9/06/2013 - V1.0.4 - Fixed templating issue with generated specs for `yo centeva-angular:service` subgenerator.
* 8/29/2013 - V1.0.3 - Renamed `/lib` back to `/bower_components` as clarity trumps brevity.  Renamed `/bin` to `/dist`. Fixed spelling error in generated directive's js template location.  Moved up to later version of `yeoman-generator` dependency to solve "Cannot read bold of undefined" error coming from Yeoman.  JSHint options now read from `.jshintrc`.  And more small stuff.
* 7/08/2013 - V1.0.2 - Added utf8 charset to index.html.  Fix for "EMFile, too many open files" on `grunt watch` by no longer watching the `lib` folder.
* 6/20/2013 - v1.0.1 - Fixed a ton of known issues.  Replaced `grunt-regarde` with `grunt-contrib-watch`.  Fixed and tweaked the unit test specs and `grunt test`.  Fixed issues with the build.  Generator is now ready for real use.
* 6/18/2013 - v1.0.0 - Initial release of template as Yeoman generator.