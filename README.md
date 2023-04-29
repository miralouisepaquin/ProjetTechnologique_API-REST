# ProjetTechnologique_API-REST
API/REST pour le projet d'alarme en projet technologique

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
### General Info
***
L'application utilise un API Rest avec Node js sur un serveur distant avec une base de donnée en MongoDB. 
## Technologies
***
Voici la liste des technologies utilisées dans le projet:
* [API Rest](https://www.bezkoder.com/node-express-mongodb-crud-rest-api/): Version 4.18.1
* [MongoDB](https://www.mongodb.com/docs/manual/installation/): Version 5.0.8
## Installation
***
Afin de pouvoir utiliser l'application et la lancé, il faudra d'abord installer Node js, express et mongoDB.
```
$ mkdir nodejs-express-mongodb
$ cd nodejs-express-mongodb
```
Dans le dossier du projet, on initialise notre application comme suit:
```
$ npm init

name: (nodejs-express-mongodb) 
version: (1.0.0) 
description: Node.js Restful CRUD API with Node.js, Express and MongoDB
entry point: (index.js) server.js
test command: 
git repository: 
keywords: nodejs, express, mongodb, rest, api
author: bezkoder
license: (ISC)

Is this ok? (yes) yes
```
Puis il sera possible d'installer le tout:
```
$ npm install express mongoose cors --save
```
