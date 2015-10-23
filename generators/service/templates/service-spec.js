///<reference path="../../../.grunt/grunt-contrib-jasmine/jasmine.js"/>
describe('<%= _.camelize(name) %>', function() {

  beforeEach(module('<%= appname %>'));

  it('should ...', inject(function(<%= _.camelize(name) %>) {

    //expect(<%= _.camelize(name) %>.doSomething()).toEqual('something');

  }));

});
