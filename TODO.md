# TODO

## 1.0+
+ Add transitions
+ Research best use of router...?
+ Add minification to the build process
+ Make '/groups' indexroute & corresponding changes
+ Integrate Redux
+ Implement a content component that adjusts for header/footer
+ backend
+ Make ButtonLinks & IconLinks
+ Add 'add-group' button
+ Make session service & session objects setting the user
+ Add session service (maybe) and a session verification with APIs
+ Move synthetic/important methods into BFF
+ Update to react-router 2.0.0
+ Switch to ES7?
+ Implement bluetooth connectivity
+ Add splash screen?
+ Figure out why Ionic isn't displaying properly on my device

## For 1.0 release
+ Implement ToggleItems, RangeItems and make Toggles & Ranges LowerLevel
+ Implement just a List
+ Implement group view
+ !!reorganize directory tree
	+ Change Utilities to Common
+ Add network settings to options page
+ Add form checking to registration (validation, autofill, matching & strength)
+ Make options page into inputs listing the info (username & {admin}), instead of just 'change X'
+ Add remove button to socketView
+ Swipe instead of press, maybe? to access specific socket view?
+ Style the SocketItem correctly
+ Implement the SocketItem Touch-slide
+ Change jQ deferreds to HTML5 promises
+ Reduce number of libs
+ Distribute cordova APKs

# WORKLOG

**1.4.2016**
+ Make microservice methods promise-less
+ Change nav buttons eventlisteners to touchends
+ Change android's statusbar color pls
	- calculated this using the HSL values, lol
+ Implement groups
+ Add tabbed interface for groups + solos
	- Currently, tabbed interfaces are implemented using separate pages.

**1.2.2016**
+ Use cordova's alert & status bar plugins to not look ass
+ Change OptionView to use context.bff
+ Complete registration flow
+ Add icon

**1.1.2016**
+ Speed app navigation - it was the onEnter function, creating a new BFF object just to verify if user was loggedIn. It's nice and quick now.
+ Change (socketService's) jQ deferreds to HTML5 promises
+ Change onclick handlers to touchstarts
+ Change (some) headers to yellow/energized
+ Implement the SocketItem state indicator
+ Implement the SocketItem Toggling

**12.30-31.2015**
+ Design & build a login system
+ Add options screen
+ Change (some) headers to yellow/energized
+ Change (some) jQ deferreds to HTML5 promises

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
