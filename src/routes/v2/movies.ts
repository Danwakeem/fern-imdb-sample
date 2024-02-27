import { randomUUID } from 'crypto';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { MovieDoesNotExistError } from "../../generated/api/resources/imdb/resources/v2";
import { IGetCommandOutput } from "../../types/ddb";
import { MoviesService } from '../../generated/api/resources/imdb/resources/v2/resources/movies/service/MoviesService';
import { Movie } from '../../generated/api/resources/imdb/resources/v2/resources/movies/types';

const TableName = process.env.TABLE_NAME;
const client = new DynamoDBClient();
const ddb = DynamoDBDocumentClient.from(client);


export const movies = new MoviesService({
  getMovie: async ({ params: { id } }, res) => {
    const { Item } = (await ddb.send(new GetCommand({
      TableName,
      Key: { id },
    }))) as IGetCommandOutput<Movie>;

    if (!Item) {
      throw new MovieDoesNotExistError('This movie does not exist');
    }

    return res.send(Item);
  },
  createMovie: async (req, res) => {
    const incomingMovie = req.body;
    const Item = {
      id: randomUUID(),
      ...incomingMovie,
    };

    await ddb.send(new PutCommand({
      TableName,
      Item,
    }));
    
    res.send(Item);
  },
});