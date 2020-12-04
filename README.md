# CookBook
 CookBook is a platform for sharing recipes online with your friends

## Installation
This program uses nodeJS
1. Install [node.js](https://nodejs.org/en/download/)
2. Clone this directory
3. Install all dependencies
```bash
npm install
```
4. Launch the server with 
```bash
npm start
```
5. Open on [localhost:8000](http://localhost:8000)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Policy
This website respects the facebook [policy](/policy.html) on the usage of private data

## Our different folders

- [Controller](/Controller)
Different function made to format data in order to get updated in a database
- [Models](/Models)
Defines different models used in this project
- [MongoDB management](/MongoDB management)
Sending all the formated data to mongoDB, our default database
- [Public](/public)
Regrouping javascripts, CSS, and public images
- [Test](/test)
Unit test are present 
- [Views](/views)
This folder contains all the different pages for this project
This project is written using pug syntax
