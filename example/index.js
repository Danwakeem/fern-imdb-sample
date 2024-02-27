const { IMDbClient } = require('./sdk/node');

(async () => {
  // Get first argument
  let environment = process.argv[2];
  if (environment) {
    environment = `https://${environment.trim()}-imdb.demos.danwakeem.com/imdb`;
  }
  const client = new IMDbClient({
    environment,
  });
  const res = await client.imdb.v1.movies.createMovie({
    title: `The Shawshank Redemption ${Date.now()}`,
    rating: 1994,
  });
  console.log(res);

  const fetchedMovie = await client.imdb.v1.movies.getMovie(res.id);
  console.log(fetchedMovie);
})();
