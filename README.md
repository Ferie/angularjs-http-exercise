<p align="center">
    <img src="http://riccardoandreatta.com/media/image/Logo_Riccardo_Andreatta_giallo_gradient_trasparente.png" width="250" alt="Riccardo logo" />
</p>



# AngularJS exercise example

This is an exercise taken as an example for the interviews showing how I work with AngularJS and its components, HTTP requests, services and directives.



### Some notes on the web application:

- It is responsive (mobile first)
- Styles are built using SASS
- The styles are using CSSwizardry as a grid
- It is using AngularJS v1.6.9
- To compile the SASS and the JS it is using Gulp
- It is coming with a simple Node.js server to run the application locally



## Installation

Clone the project into a new folder and make sure you have installed `Node.js` and `npm` (or another package manager like `yarn`):

Go to the directory where the project has been cloned and install all the required node modules needed to have the project up and running correctly (i.e. the Gulp plugins and the node server):
```
npm install
```



### Running the application locally

When the node modules are correctly installed, please run the node server:
```
node server
```

The app is served by default at `http://localhost:9050/` but you can change the port in the `server.js` file.



### Compile the SASS and the JS

In a new terminal window, run `gulp` to compile the source files.

Automatically, it creates the `dist` folder where there are the compiled CSS and JavaScript.

If you want to change the code and watch for the changes you are making immediately, just run `gulp watch`.

With Gulp you can even concatenate 2 different Gulp's tasks at the same time:
```
gulp && gulp watch
```

**Note**: there is also another Gulp task that is compiling all the code and running a livereload server at the same time:
```
gulp server
```

With this solution you can handle all the project in just one terminal window.
