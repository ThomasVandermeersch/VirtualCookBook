# CookBook
 CookBook is a platform for sharing recipes online with your friends.

## Installation
This program uses nodeJS
1. Install [node.js](https://nodejs.org/en/download/)
2. Clone this repository
3. Install all dependencies
3.1 Open terminal shell in current folder
3.2 Type following command
```bash
npm install
```
4. Launch the server

For development 
```bash
npm start
```

For production 
```bash
node app.js
```
5. Open on [localhost:8000](http://localhost:8000)

## License
[MIT LICENSE](/LICENSE)

## Privacy policy
This website respects the facebook [privacy policy](/views/privacy_policy.pug) on the usage of private data

## Our different folders

- [Controller](/Controller)

Different function controlling the entire system.

- [Models](/Models)

Defines different object models used in this project.

- [MongoDB management](/MongoDBmanagement)

Sending and recieving all request to our MongoDB database.

- [Public](/public)

Regrouping javascripts, CSS, and public images.

- [Test](/test)

UnitTest to ensure the proper functioning of our system.

- [Views](/views)

This folder contains all the web pages of this project.
The project is written using pug syntax which is compiled into HTML.

##Authors 

Sing Martin and Vandermeersch Thomas