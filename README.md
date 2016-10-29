Instagram Polaroider
===================

Grabs a load of images from an Instagram feed and displays them nicely on the page.

Uses some code derived from https://github.com/duplikey/instatake to actually grab the images. This project is also licensed under the MIT license.

"Instagram" and "Polaroid" are registered trademarks of their respective owners.

Configuration
=============

Settings for the scraper are in js/config.js

Instructions
============

It probably goes without saying, but this needs to be run on a proper web server. If you just download the files and open index.html in a browser, it more than likely won't work!

Hacktoberfest 2016
==================

This was developed as an internal project at ReeCreate. As part of Hacktoberfest 2016 we have decided to release it as open source and will be tweaking the code to turn it into a more useful general purpose project. Here's what we aim to achieve by the end of the month:

- ~~Remove all existing branding~~
- ~~Reimplement some "borrowed" code and release with a proper open source license~~
- ~~Remove dependency on scraped JSON at http://rc8.me/rc8polaroid.json~~
- ~~Make the project more "configurable" (number of pictures, account name, refresh time etc)~~
- ~~Make the project responsive (originally designed to run at fixed 1080x1920 portrait mode as part of a promo)~~
- ~~Randomise picture sizes and layout~~

...and we did! Although the implementation is open to improvements, of course ;)