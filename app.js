const express = require("express");
const { graphqlHTTP } = require("express-graphql"); //the name is a convention
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

// connect to atlas db
mongoose.connect(
  "mongodb+srv://solomonndi96:solagbaby96@cluster0.qtper.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const con = mongoose.connection;
con.once("open", () => console.log("connected to db"));
con.on("error", (err) => console.error(err));

/**
 * go to graphql route. express sees this and knows that this is something that should
 *  go to express-graphql
 */
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => console.log("app listening on port 4000"));
