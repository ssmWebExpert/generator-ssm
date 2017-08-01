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
          name: 'Mac Operation System',
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
          name: 'Markup Only',
          value: 'Markup Only',
          checked : true
        }, {
          name: 'WP CMS',
          value: 'WP',
          checked : false
        }]
      },{
        type: 'list',
        name: 'framework',
        message: 'Preprocessor?',
        choices: [{
          name: 'Sass',
          value: 'sass',
          checked : true
        }, {
          name: 'Bootstrap',
          value: 'bootstrap',
          checked : false
        }, {
          name: 'Bootstrap Less',
          value: 'bootstrap-less',
          checked : false
        }, {
          name: 'Less',
          value: 'less',
          checked : false
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
        this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
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
            this.templatePath('dev/bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
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
            this.templatePath('dev/bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
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
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
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
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
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
            this.templatePath('dev/scss-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/wp/theme-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/theme-gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/scss-package.json'),
            this.destinationPath(this.data.appName + '/markup/theme-package.json')
          );
          this.fs.copy(
            this.templatePath('dev/bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/scss'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        }
        else if(this.data.framework == "less") {
          this.fs.copy(
            this.templatePath('dev/wp/less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/less-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/wp/theme-less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/theme-gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/less-package.json'),
            this.destinationPath(this.data.appName + '/markup/theme-package.json')
          );
          this.fs.copy(
            this.templatePath('dev/bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/less'),
            this.destinationPath(this.data.appName + '/markup/src/less')
          );
          this.fs.copy(
            this.templatePath('dev/wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        }
        else if(this.data.framework == 'bootstrap') {
          this.fs.copy(
            this.templatePath('dev/wp/tb-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/tb-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/wp/theme-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/theme-gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/scss-package.json'),
            this.destinationPath(this.data.appName + '/markup/theme-package.json')
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
            this.templatePath('dev/tb-wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        }
        else if(this.data.framework == 'bootstrap-less') {
          this.fs.copy(
            this.templatePath('dev/wp/tb-less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/tb-less-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/wp/theme-less-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/theme-gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/less-package.json'),
            this.destinationPath(this.data.appName + '/markup/theme-package.json')
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
            this.templatePath('dev/tb-wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        };
      }
    };

    install() {
      process.chdir(this.data.appName + '/markup');
      this.installDependencies({
        bower: true,
        npm: true
      });
    };
};