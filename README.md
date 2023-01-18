# Bingo

A multiplayer American Bingo game, where the frontend uses long polling to receive new data from the backend on a regular basis.

This repo was forked from the barebones project at:
https://github.com/FunForks/express-backend-react-frontend

Run `npm install` in three places:
* In the root directory
* In the backend directory
* In the frontend directory

Then run `npm start` in the root folder to start both frontend and backend.

Or copy and paste the following lines into your Terminal and press Enter:

```
npm install
cd backend && npm install
cd ../frontend && npm install
cd .. && npm start
```

Visit http://localhost:3001 from several browser windows: each will play the game with a different card.