const express = require("express");
const path = require("path");
const cors = require("cors");
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/recipe-app', { useUnifiedTopology : true, useNewUrlParser : true })
        .then(() => console.log('Connected to DB...'))
        .catch((err) => console.log(err));

// Middlewares
app.use(cors({}));

// Static Files
app.use(express.static(path.join(__dirname, "/../client/build")));


// GraphQL
app.use('/graphql', graphqlHTTP({
  schema : require('./graphql/schema'),
  rootValue : require('./graphql/resolvers'),
  graphiql: true
}))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
