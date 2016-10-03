Instagram Polaroider
===================

Grabs a load of images from an Instagram feed and displays them nicely on the page. Runs entirely in-browser (no access to local filesystem).

The original project used some code from https://github.com/duplikey/instatake to actually grab the images.
It also had some CSS inspired by http://zurb.com/playground/css3-polaroids to make them look a bit like Polaroids.

Other people's proprietary code will be removed in the process of open sourcing the project.

"Instagram" and "Polaroid" are registered trademarks of their respective owners.

Hacktoberfest 2016
==================

This was developed as an internal project at ReeCreate. As part of Hacktoberfest 2016 we have decided to release it as open source and will be tweaking the code to turn it into a more useful general purpose project. Here's what we aim to achieve by the end of the month:

- Remove all existing branding
- Reimplement some "borrowed" code and release with a proper open source license
- Remove dependency on scraped JSON at http://rc8.me/rc8polaroid.json and use a proper CORS proxy instead
- Make the project responsive (originally designed to run at fixed 1080x1920 portrait mode as part of a promo)
- Make the project more "configurable" (number of pictures, account name, refresh time etc)
- Randomise picture sizes and layout