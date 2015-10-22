# blaze
Live HTML templates.

What you need to build your own Blaze
--------------------------------------

In order to build Blaze, you need to have the latest Node.js/npm and git 1.7 or later. Earlier versions might work, but are not supported.

For Windows, you have to download and install [git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/download/).

OS X users should install [Homebrew](http://brew.sh/). Once Homebrew is installed, run `brew install git` to install git,
and `brew install node` to install Node.js.


How to build your own Blaze
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
