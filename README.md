# Udacity Neighborhood Map

This is a capstone project for Udacity's Front End Web Development nanodegree, meant to be developed using React and Google Maps API, and another API of the student's choice. This project also uses the FourSquare API and react-google-maps, and was bootstrapped with Create React App. Create React App includes by default a service worker in the production build.

## Features

This map shows pizza places in Chicago. By searching you can narrow down the results. Clicking on a marker or venue from the sidebar will bring up an info window with venue details.

## Getting Started

To install and run:

* Clone or download this repo to your local machine
* In the terminal, cd into the project directory
* Install all project dependencies with `npm install`
* Start the development server with `npm start`
* To view in the browser, open http://localhost:3000

Note: The service worker from Create React App only works in the production build. To run the app in production build:

* `npm run build`
* `serve -s build`
* Open http://localhost:5000 in the browser