# TODO

1. Currently doing a huge error by explicitly putting everythin in global scope by declaring React classes as window.SomeClass = React...
2. Figure out JSX -> JS transpiling with Gulp so I can get this working


# WORKLOG

**12.14.15**

+ Set up working build process
	1. gulp concat-jsx to put all the jsx into one file
	2. gulp copy-html to copy new html file into the new one
	2. gulp replace-jsx to replace the old tags with the bundled jsx file
 	- missing jsx->(babel)->js transpilation
