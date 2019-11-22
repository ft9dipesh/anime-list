const app = require('./app');

const PORT = process.env.PORT;

require('./utils/db/mongodb');

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
