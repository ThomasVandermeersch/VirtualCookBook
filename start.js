const app = require('./app');

const server = app.listen(8000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
