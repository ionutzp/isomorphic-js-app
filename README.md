# Isomorphic javascript app

This is a simple example of a Isomorphic Javascript Application that shares the Router and the rendering between client and server. It runs on Node on the server and uses MongoDB for data storage.

## Prerequisites
- Node
- MongoDB
- Node Inspector
- Nodemon

## Runnign the app
1. ```npm install```
2. run the MongDB daemon ```mongod```
3. run the app with ```gulp start```

The node inspector is now running at ```http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=585``` and the application at ```http://localhost:3000/```

## Demo functionality
- Displaying of todos, rendered first on the server than updated on the client
- Adding of todos, sync with the backend
- Filtering of available todos based on the router ```http://localhost:3000/test```
