# TODO

+ Add minification to the build process
+ Clean up the useless gulp tasks and solidify the build process
+ Implement watching
+ Replace ratchet components with ionic components
+ Reduce number of libs & use browserify
+ Implement bluetooth connectivity
+ Freeze the node_modules packages
+ Remove build folder from git tree

# WORKLOG

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
