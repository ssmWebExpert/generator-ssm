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
        appName: path.basename("project_name"),
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
        }, {
          name: 'Add NaN',
          value: 'Add',
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
          name: 'Bootstrap3',
          value: 'bootstrap3',
          checked : false
        }, {
          name: 'Bootstrap4',
          value: 'bootstrap4',
          checked : false
        }]
      }];

      this.prompt(prompts).then(function(answers) {
        this.data.appName = answers.appName;
        this.data.framework = answers.framework;
        this.data.platform = answers.platform;

        done();
      }.bind(this));
    };

    writing() {
      this.fs.copy(
        this.templatePath('markup'),
        this.destinationPath(this.data.appName + '/markup')
      );
      this.fs.copy(
        this.templatePath('dev/gitignore'),
        this.destinationPath(this.data.appName + '/markup/.gitignore')
      );
      this.fs.copy(
        this.templatePath('dev/head.pug'),
        this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
      );
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
        else if(this.data.framework == 'bootstrap3') {
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
            this.templatePath('dev/scssTB'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        }
        else if(this.data.framework == 'bootstrap4') {
          this.fs.copy(
            this.templatePath('dev/tb4-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/tb-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/tb4-bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/scssTB'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        };
      }
      else if(this.data.platform == 'WP') {
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
        else if(this.data.framework == 'bootstrap3') {
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
            this.templatePath('dev/scssTB'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        }
        else if(this.data.framework == 'bootstrap4') {
          this.fs.copy(
            this.templatePath('dev/wp/tb4-gulpfile.js'),
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
            this.templatePath('dev/tb4-bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/scssTB'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-wp-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        };
      }
      else {
        if(this.data.framework == "sass") {
          this.fs.copy(
            this.templatePath('dev/add/scss-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/scss-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/add/theme-gulpfile.js'),
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
            this.templatePath('dev/head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        }
        else if(this.data.framework == 'bootstrap3') {
          this.fs.copy(
            this.templatePath('dev/add/tb-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/tb-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/add/theme-gulpfile.js'),
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
            this.templatePath('dev/scssTB'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-head.pug'),
            this.destinationPath(this.data.appName + '/markup/src/pug/includes/styles.pug')
          );
        }
        else if(this.data.framework == 'bootstrap4') {
          this.fs.copy(
            this.templatePath('dev/add/tb4-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/tb-package.json'),
            this.destinationPath(this.data.appName + '/markup/package.json')
          );
          this.fs.copy(
            this.templatePath('dev/add/theme-gulpfile.js'),
            this.destinationPath(this.data.appName + '/markup/theme-gulpfile.js')
          );
          this.fs.copy(
            this.templatePath('dev/scss-package.json'),
            this.destinationPath(this.data.appName + '/markup/theme-package.json')
          );
          this.fs.copy(
            this.templatePath('dev/tb4-bower.json'),
            this.destinationPath(this.data.appName + '/markup/bower.json')
          );
          this.fs.copy(
            this.templatePath('dev/scssTB'),
            this.destinationPath(this.data.appName + '/markup/src/scss')
          );
          this.fs.copy(
            this.templatePath('dev/tb-head.pug'),
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