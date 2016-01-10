# TODO

## 0.2+
+ Add transitions
+ Research best use of router...?
+ Groups makes a return!
	+ Make '/groups' indexroute & corresponding changes
	+ Add 'add-group' button
	+ Tabs Implementation
		- lmfao, it's simple.
		- Make the tab controls switch the state of the Page component.
		- render different content depending on the state.tab.
+ Make ButtonLinks & IconLinks
+ Update to react-router 2.0.0
+ Switch to ES7?

## For 0.2 release
+ Implement bluetooth connectivity
+ Add animation to list-item swiping
+ Backend & BFF
	+ Move synthetic/important methods into BFF
	+ Link users to sockets
	+ Implement backend
+ Implement a content component that adjusts for header/footer
+ Make session service & session objects setting the user
+ Add minification to the build process
+ Style the socketItem better
	- Vertically align this to middle line
	- Add icons to range item

## For 0.1 release
+ Add splashscreen
+ Figure out why Ionic isn't displaying properly on my device
	- Turns out 'platform-{os}' classes need to be added to the body tag for each specific os. See (http://stackoverflow.com/questions/30419810/ionic-css-renders-differently-on-ionic-serve-android-emulator-and-android-devi)
+ !!reorganize directory tree
	+ Change Utilities to Common
	+ Integrate Redux
+ Add form checking to registration (validation, autofill, matching & strength)
+ Distribute cordova APKs

# WORKLOG

**1.10.2016**
+ SocketView
	+ Reorganize beginning section
	+ Add brightness label
	+ Make proximity sense a section by itself with a distance item
	+ Add remove button to socketView (non-functional)

**1.9.2016**
+ Remove tabs + Group section for now
+ SocketItem Single Press
	- Implement lose focus -> collapse
	- Make sure it will only collapse when main section is pressed (probably just wrap the range in a non-click-through-able div so I can't accidentally touch the li)
+ Layout the SocketItem correctly
+ Make login screen yellow
+ Modify login page as per design meeting
	+ Create Footer component
	+ Modify bff to return login error msgs

**1.6.2016**
+ Implement group view
+ Swipe instead of press to access specific socket view
+ Add network settings to options page
+ Make options page into inputs listing the info (username & {admin}), instead of just 'change X'

**1.4.2016**
+ Reduce number of libs
+ Implement the SocketItem Touch-slide
+ Implement ToggleItems, RangeItems and make Toggles & Ranges LowerLevel
+ Implement just a List
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
