# Wildshape Webapp 

Repository for druidic animal forms for the 5th edition of dungeons and dragons.

## Dependencies
* [NodeJS v.8+](http://nodejs.org/)
* [Gulp CLI](http://gulpjs.com/)

It is recommended that you use a package manager like _Homebrew_ or _Chocolatey_ to install Node on your machine.

After you install Node, you will also need to install _Gulp CLI_. You can install it by running `npm install -g gulp-cli` from the terminal.

## Installation
Once you have installed the above dependencies:

1. Clone this repository into your development folder
2. Navigate to the root of the project folder and run `npm install` from the command line to begin installing dependencies.

## Running the Project
Once the project is installed, several commands can be issued from the root of the project folder:

`gulp`: Runs the default Gulp task. This builds the project with source maps from the _app_ folder into the _release_ folder, spawns a Node server, opens a new browser with the website at http://localhost:3000, and listens for subsequent changes. When you edit and save a new file, Gulp will recompile accordingly and refresh your browser window with the latest changes automatically.

The following optional commands are also available:

`gulp build`: Runs the above Gulp task without spawning a server.

`gulp serve`: Spawns a Node server and serves files from the _release_ folder. This is useful if you want to proof the minified\production build before pushing it to a remote server.

## Production Code
When you are ready to move minified code to production, you can run the following command:

`gulp build --minify`: Runs the Gulp task without spawning a server and produces minified CSS and JS. 

## Project Architecture
#### Folder Structure

* __app/__ : _ALL_ work should be done in the _app_ folder. This is where your website's source code lives.
* __release/__ : When running Gulp, files from _app_ are compiled into _release_. If you work out of the _release_ folder, your work will be overwritten and you will be sad. Don't work out of the _release_ folder.
* __gulp/__ : This contains all of the Gulp tasks that the project relies on. There is also a _config.js_ file that most of the tasks reference to make file paths and preferences more manageable.
* __node_modules/__ : The folder where node modules are installed when you run `npm install`.
* __.babelrc__: The configuration file for ES6 presets.
* __.csscomb.json__: The configuration file that can be used with [CSSComb](https://github.com/csscomb/csscomb.js) or similar, editor specific plugins to automatically sort and format CSS declarations.
* __.eslintrc__ : The configuration file to enforce syntactical rules for JS linting.
* __.jsbeautifyrc__ : The configuration file that can be used with Sublime Text's [HTML-CSS-JS Prettify](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify) and Atom's [atom-beautify](https://atom.io/packages/atom-beautify) plugins.  Allows you to format your HTML, CSS, JavaScript, and JSON code.
* __.scss-lint.yml__: The configuration file for "linting" Sass/SCSS files.
* __gulpfile.js__ : This references all of the tasks in _gulp/tasks/_. Tasks are broken apart for organizational purposes and referenced when you run `gulp`.
* __package.json__ : Contains the project's dependencies. Modules specified in this files are installed into _node\_modules_ when you run `npm install`.
* __README.md__ : You're reading it.

## Usage
#### Writing HTML
Your HTML can be found in the _app_ folder, and can contain references to reusable includes (which live in _app/includes/_). For example:

`//= include includes/core/head.html`

This allows you to write a piece of code once and reuse it in multiple places. When Gulp runs, it takes these includes and compiles the full HTML into the _release_ folder.

_Note: The paths in which these includes are referenced are relative to the HTML file you are authoring. If you include an include from another include, that path will need to be prefixed with "../" accordingly._

#### Writing SASS

This project uses [Autoprefixer](https://github.com/postcss/autoprefixer) to add vendor prefixes necessary for browser support to your styles automatically when processed. Because of this, you do not need to include vendor prefixes on a majority of declarations to support cross-browser styling. The current Autoprefixer settings include style property rules for the latest 4 versions of all major browsers, as well as any browser with a global market share greater than 1%.

Additionally, the project makes use of a custom sort order for css properties based on a box-model approach, aranged from the outside in. By using this standard, instead of a more common alphabetical system, the project allows related properties to be adjacent to each other in declarations while still maintaining some logic to the order. To help with this process, each project includes a `.sass-lint.yml` file to help enforce the order and code styling, as well as a `.csscomb.json` to help automatically sort properites while using your editor of choice. 

_Note: If you are using Node Version Manager (NVM) and wish to use a tool like CSSComb to manage your sort order automaticaly, you will have to configure your CSSComb plugin or installation to indicate where your current version of Node is installed. You can create a symlink between your Node installation and `/user/local/bin`._

##### SASS Structure

Your styles live in the _app/styles/sass_ folder, split amongst multiple _*.scss_ partials. The Boilerplate comes with a number of partials pre-populated in this directory as examples, but they can be modified to meet the needs of the site.

#### Writing JS

All JS for the site is split into modules, found in the _/scripts/modules_ directory. When the site JS is loaded, it checks the DOM for any element with a _data-module_ attribute. If and element with that attribute exists, it loads the module with the name matching the value of that attribute. 

When writing new modules, add them to the registry of imported modules listed in the _app.js_ file and add _data-module="[MODULE NAME]"_ to the element that requires the script.

This project makes use of [Babel](https://babeljs.io/), a compiler that allows you to write ES6 style JS in the project and still maintain browser-compatible JS for production.

##### JS Structure

* __app/scripts/app.js__ : This is your application bootstrap. All JS kicks off from here. This file is where the registry of imorted modules is created.  
* __app/scripts/modules/__ : This is where your site/feature scripts are located. Each module should be related to only one feature. The _Common.js_ file in this folder is the only module that fires on every page, regardless of _data-module_ attribute in the DOM. Place site-wide scripts here.
* __app/scripts/libs/__ : This is where your vendor libraries and plugins live if a NPM package has not been made for the required vendor code. Use this directory as a last resort. Otherwise, libraries and plugins are found in the _node\_modules_ directory. 

## Common issues

#### When I run `gulp`, the command line errors out. WTF?
Make sure you've installed _ALL_ dependencies specified above. Also, make sure you have the most up up-to-date version of Node. 

If you continue to have issues, especially after updating to a newer version of Node, delete the _node\_modules_ directory and _package-lock.json_ file and re-run `npm install`.

#### Gulp is not picking up on changes that I made to a file? WTF?
The `watch` task only picks up on changes made to files that existed when the task was started. When you add any new file to the _app_ folder, you must stop and restart Gulp.

#### WTF are these messages complaining about my CSS?
The project uses linting rules which enforce specific CSS formatting standards, including a custom sort order (_See "Writing SASS"_). Make sure to follow those guidelines before committing finalized code to the repository. You can use tools like CSSComb to automatically match these standards in the editor of your choice.

#### Gulp is not picking up on changes that I made to a file? WTF?
The `watch` task only picks up on changes made to files that existed when the task was started. When you edit a Gulp task, a config file, or add any new file to the `app` folder, you must stop and restart Gulp.
