'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');
const chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
      super(args, opts);
    };

    initializing() {
      this.log(yosay('Yo! Welcome to the humble ' + chalk.blue.bold('SSM') + ' generator!'));
      this.sourceRoot(path.join(__dirname, 'templates'));
      this.data = {
        appName: path.basename("markup"),
      };
    };

    prompting() {
      let done = this.async();

      let prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is the folder you want to create?',
        default: this.data.appName
      },{
        type: 'list',
        name: 'OperationSystem',
        message: 'Operation System?',
        choices: [{
          name: 'IOs',
          value: 'IOs',
          checked : true
        }, {
          name: 'Windows',
          value: 'Windows',
          checked : false
        }]
      },{
        type: 'list',
        name: 'platform',
        message: 'Do you have Implementation?',
        choices: [{
          name: 'WP',
          value: 'WP',
          checked : false
        }, {
          name: 'markup',
          value: 'Markup Only',
          checked : true
        }]
      },{
        type: 'list',
        name: 'framework',
        message: 'Preprocessor?',
        choices: [{
          name: 'Bootstrap Less',
          value: 'bootstrap-less',
          checked : false
        }, {
          name: 'Bootstrap',
          value: 'bootstrap',
          checked : false
        },{
          name: 'Less',
          value: 'less',
          checked : false
        }, {
          name: 'Sass',
          value: 'sass',
          checked : true
        }]
      }];

      this.prompt(prompts).then(function(answers) {
        this.data.appName = answers.appName;
        this.data.platform = answers.platform;
        this.data.framework = answers.framework;
        this.data.operationSystem = answers.OperationSystem;

        done();
      }.bind(this));
    };

    writing() {
      this.fs.copy(
        this.templatePath('markup'),
        this.destinationPath(this.data.appName + '/markup')
      );
      this.fs.copy(
        this.templatePath('dev/head.pug'),
        this.destinationPath(this.data.appName + '/markup/src/includes/head.pug')
      );
      if(this.data.operationSystem == 'IOs') {
        this.fs.copy(
          this.templatePath('dev/gulp-start.app'),
          this.destinationPath(this.data.appName + '/gulp.app')
        );
      }
      else {
        this.fs.copy(
          this.templatePath('dev/gulp.bat'),
          this.destinationPath(this.data.appName + '/gulp.bat')
        );
      };
      if(this.data.platform == 'Markup Only') {
        if(this.data.framework == "sass") {
          this.fs.copy(
            this.templatePath('dev/scss-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/scss-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/scss'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
        }
        else if(this.data.framework == "less") {
          this.fs.copy(
            this.templatePath('dev/less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/less-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/less'),
            this.destinationPath(this.data.appName + '/markup/src/less')
          );
        }
        else if(this.data.framework == 'bootstrap') {
          this.fs.copy(
            this.templatePath('dev/tb-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/tb-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/tb-bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/scss'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/includes/head.pug')
          );
        }
        else if(this.data.framework == 'bootstrap-less') {
          this.fs.copy(
            this.templatePath('dev/tb-less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/tb-less-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/tb-less-bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/less'),
            this.destinationPath(this.data.appName + '/markup/src/less')
          );
          this.fs.copy(
            this.templatePath('dev/tb-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/includes/head.pug')
          );
        };
      }
      else{
        if(this.data.framework == "sass") {
          this.fs.copy(
            this.templatePath('dev/wp/scss-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/wp/scss-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/scss'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/includes/head.pug')
          );
        }
        else if(this.data.framework == "less") {
          this.fs.copy(
            this.templatePath('dev/wp/less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/wp/less-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/less'),
            this.destinationPath(this.data.appName + '/markup/src/less')
          );
          this.fs.copy(
            this.templatePath('dev/wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/includes/head.pug')
          );
        }
        else if(this.data.framework == 'bootstrap') {
          this.fs.copy(
            this.templatePath('dev/wp/tb-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/wp/tb-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/wp/tb-bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/scss'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/includes/head.pug')
          );
        }
        else if(this.data.framework == 'bootstrap-less') {
          this.fs.copy(
            this.templatePath('dev/wp/tb-less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/wp/tb-less-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/wp/tb-less-bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/less'),
            this.destinationPath(this.data.appName + '/markup/src/less')
          );
          this.fs.copy(
            this.templatePath('dev/tb-wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/includes/head.pug')
          );
        };
      }
    };

    install() {
      process.chdir(this.data.appName + '/markup');
      if(this.data.framework == "sass" || this.data.framework == "less") {
        this.installDependencies({
          bower: false,
          npm: true
        });
      }
      else if(this.data.framework == "bootstrap-less" || this.data.framework == "bootstrap") {
        this.installDependencies({
          bower: true,
          npm: true
        });
      }
    };

    // end() {
    //   var sys = require('util'),
    //       exec = require('child_process').exec,
    //       addr = "cd" + this.data.appName;
    //     exec("gulp serve", function(err, stdout, stderr) {})
    // };
};