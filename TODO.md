# TODO

+ Implement the SocketItem state indicator
+ Implement the SocketItem Toggling/Touch-slide
+ Change headers to yellow/energized
+ Change jQ deferreds to HTML5 promises
+ Distribute cordova APKs
+ Design & build a login system
+ Add tabbed interface for groups + solos
+ Add options screen
+ Add minification to the build process
+ Reduce number of libs & use browserify
+ Implement bluetooth connectivity
+ Reasearch best use of router...?

# WORKLOG

**12.30.2015**
+ Implement setBrightness and setProximity using HTML5 promises in SocketService.
+ Implement brightness and proximity editing in the socket view.
+ Implement a proper socket nickname display/edit input

**12.29.2015**
+ Fix some state-linkage issues in Common

**12.27-28.2015**
+ Make view load the proper socket info [sorta]
+ Add full socket screen
+ Link socket-items with to their view pages

**12.26.2015**
+ Freeze the node_modules packages
+ Implement watching
+ Replace ratchet components with ionic components
+ Clean up the useless gulp tasks and solidify the build process
+ Remove build folder from git tree

**12.24.2015**
+ Reorganize home screen/whatever

**12.20.15**

+ Fix the JS Service issues - why ain't they loading??
	- Nice, fixed the 'sockets not showing up' issue. It was because the HomeView getDefaultProps was mis-spelled as geDefaultProps.

**12.14.2015**

+ Turn the react script lib into a require
+ Implemented routing
+ Removed the concating & switched to browserify - still fixed the window.component = React.create... global namespace polluting issue
+ Figured out JSX -> JS transpiling with Gulp so I can get this working
	- sorta, using browserify's reactify plugin
	+ current workflow:
	$ gulp copy-html
	$ gulp browserify-jsx
	$ gulp replace

**12.14.15 - indecent hours**

+ Set up working build process
	1. gulp concat-jsx to put all the jsx into one file
	2. gulp copy-html to copy new html file into the new one
	2. gulp replace-jsx to replace the old tags with the bundled jsx file
 	- missing jsx->(babel)->js transpilation
+ Also, by concating
