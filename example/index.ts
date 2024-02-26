import { IMDbClient } from './sdk/node';

(async () => {
  try {
    const client = new IMDbClient();
    const res = await client.imdb.createMovie({
      title: `The Shawshank Redemption ${Date.now()}`,
      rating: 1994,
    });
    console.log(res);

    const fetchedMovie = await client.imdb.getMovie(res.id);
    console.log(fetchedMovie);
  } catch(error) {
    console.error(error);
  }
})();
