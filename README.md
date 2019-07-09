<p align="center">
    <img src="http://riccardoandreatta.com/media/image/Logo_Riccardo_Andreatta_giallo_gradient_trasparente.png" width="250" alt="Riccardo logo" />
</p>

![Heroku](http://heroku-badge.herokuapp.com/?app=filter-and-order-production&root=index.html)

# AngularJS exercise

This is an exercise for an interview showing how I work with AngularJS and its components, HTTP requests, services and directives.

In the sidebar there is a list of people retrieved using a service. This list is receiving this information via a HTTP request to a JSON file in the data directory (this file could be found in a remote server or requested trough an API).

This list can be ordered alphabetically or by rating (each person has a rating detail). A single person can be eventually searched by the search field in real time.

Clicking on one of those names, the details of the selected person can be seen in the middle of the screen (please note that the images are always different because I am using a lorem ipsum website for images, instead of a proper cdn).

On mobile resolutions, the sidebar is sliding in and out to save space for the main page content. The sidebar can be opened via the "Hamburgher menu" in the header and closed by clicking away of it or via the black cross at the top of the sidebar itself.


### Live Demo

[See it in action!](https://filter-and-order-production.herokuapp.com/)



### Some notes about this web application:

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



### Compile the SASS and the JS locally

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
