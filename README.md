# LMIWebDev Boilerplate (Front-End Starting Point) 

Repository for skeleton application for use as a starting point to build LMI marketing websites.

## Dependencies
* [Node JS](http://nodejs.org/)
* [Gulp](http://gulpjs.com/)

## Installation
Once you have installed the above dependencies:

1. Clone this repository into your development folder
2. `cd` into the root of the new project folder and run `npm install` from the command line

## Running
From the root of the project, several commands can be issued from terminal:

1. `gulp`: Runs the default Gulp task. This builds the project with source maps from the `app` folder into the `release` folder, spawns a Node server, opens a new browser with the website at http://localhost:3000, and listens for subsequent changes. When you edit and save a new file, Gulp will recompile accordingly and refresh your browser window with the latest changes automatically.
2. `gulp build`: Runs the above Gulp task without spawning a server.
3. `gulp build --minify`: Runs the above Gulp task, but produces minified CSS and JS.
4. `gulp serve`: Spawns a Node server and serves files from the `release` folder. This is useful if you want to proof the production build before pushing it to a remote server.

## Project Architecture
#### Folder Structure

* `app/`: _All_ work should be done in the `app` folder. This is where your website's source code lives.
* `release/`: When running Gulp, files from `app` are compiled into `release`. If you work out of the `release` folder, your work will be overwritten and you will be sad. Don't work out of the `release` folder.
* `gulp/`: This contains all of the Gulp tasks that the project relies on. There is also a `config.js` file that most of the tasks reference to make file paths and preferences more manageable.
* `node_modules/`: The folder where node modules are installed when you run `npm install`.
* `.jshintrc`: The configuration file to enforce syntactical rules for JS linting.
* `.jsbeautifyrc`: The configuration file that can be used with Sublime Text's [HTML-CSS-JS Prettify](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify) and Atom's [atom-beautify](https://atom.io/packages/atom-beautify) plugins.  Allows you to format your HTML, CSS, JavaScript, and JSON code. These plugins look for a `.jsbeautifyrc` file in the same directory as the source file you're prettifying (or any directory above if it doesn't exist, or in your home folder if everything else fails) and uses those options along the default ones.
* `.scss-lint.yml`: The configuration file for "linting" Sass/SCSS files.
* `gulpfile.js`: This references all of the tasks in `gulp/tasks/`. Tasks are broken apart for organizational purposes and referenced when you run `gulp`.
* `package.json`: Contains the project's dependencies. Modules specified in this files are installed into `node_modules` when you run `npm install`.
* `README.md`: You're reading it.

## Usage
#### Writing HTML
Your HTML lives in the `app` folder, and can contain references to reusable includes (which live in `app/includes/`). For example:

    //= include includes/core/head.html

This allows you to write a piece of code once and reuse it in multiple places. When Gulp runs, it takes these includes and compiles the full HTML into the `release` folder.

_Note: The paths in which these includes are referenced are relative to the HTML file you are authoring. If you include an include from another include, that path will need to be prefixed with `../` accordingly._

#### Writing Sass
##### Sass Structure
Your styles live in the `app/styles/sass` folder. This project uses [Autoprefixer](https://github.com/postcss/autoprefixer) to add vendor prefixes necessary for browser support to your styles automatically when processed. 

#### Writing JS
##### JS Structure

* `app/scripts/libs/`: This is where your vendor libraries and plugins live if a NPM package has not been made for the required vendor code. Use this directory as a last resort. Otherwise, libraries and plugins are found in the `node_modules` directory. 
* `app/scripts/app.js`: This is your application bootstrap. All JS kicks off from here.

## Common issues

#### When I run `gulp`, the command line errors out. WTF?
Make sure you've installed _ALL_ dependencies specified above. Also, make sure you have up-to-date versions of Ruby and Node.

#### Gulp is not picking up on changes that I made to a file? WTF?
The `watch` task only picks up on changes made to files that existed when the task was started. When you edit a Gulp task, a config file, or add any new file to the `app` folder, you must stop and restart Gulp.
