import express from "express";
import serverless from "serverless-http";
import { register } from './generated';
import { movies as v1Movies } from './routes/v1/movies';
import { movies as v2Movies } from './routes/v2/movies';

const app = express();

app.use(express.json());

register(app, {
  imdb: {
    v1: {
      movies: v1Movies
    },
    v2: {
      movies: v2Movies,
    }
  }
});

module.exports.handler = serverless(app);
