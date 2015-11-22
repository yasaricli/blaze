# blaze
Easy reactive templating.

## Installation for your projects

`Blaze` is available through the `Bower` package manager. Learn more about using and installing [bower](http://bower.io). To add `blaze` to your application, you can run:

```sh
bower install blaze
```

Additionally, you can include the `--save` option to add `blaze` to your `bower.json` file.

Simply reference the `JavaScript` file using a `<script>` tag somewhere on your `HTML` pages. For example,

```html
<script type='text/javascript' src='bower_components/blaze/target/blaze.min.js'></script>
```

What you need to build your own `blaze`
--------------------------------------

In order to build blaze, you need to have the latest Node.js/npm and git 1.7 or later. Earlier versions might work, but are not supported.

For Windows, you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).

OS X users should install [Homebrew](http://brew.sh/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.


How to build your own `blaze`
----------------------------

Clone a copy of the main Blaze git repo by running:

```bash
git clone git://github.com/yasaricli/blaze.git
```

Enter the blaze directory and run the build script:
```bash
cd blaze && npm install
```

#### Build

Once you have the repository cloned, building a copy of `blaze.js` is really easy.

```sh
gulp
```

At this point, you should now have a `build/` directory populated with everything you need to use Blaze.


#### Update current version meteor:

```sh
./blaze --server
```

#### Download starting server files.

```sh
./blaze --download
```
