# plug static site generator with Pug

*By *

Source files are compiled (and copied) from the `src/` directory to the `dist/`. The `dist/` directory is empty by default and removed everytime Grunt launches to re-create / re-compile the source material to the destination directory.

## Grunt or Gulp

Grunt or Gulp will watch for file changes to the following files:

* *.pug
* *.scss
* *.js
* *.img

When any of these change Grunt or Gulp will compile / copy over those changes from the `src/` to the `dist/` directory and refresh the web browser.

## Pug

In the `src/` are Pug `*.pug` files. These are the source HTML files and watched by Grunt or Gulp to compile to the `dist/*.html` directory.

### Extends

In the `src/extends` are Pug extend file locate. These are used as master layout files that the `index.pug` uses.

### Includes

Pug can use include files as well to have content created once and re-used.