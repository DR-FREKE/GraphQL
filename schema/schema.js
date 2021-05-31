const graphql = require("graphql");
const { author, book } = require("../controller");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

//later on we'd use mongodb but for now we use dummy data
// const books = [
//   {
//     name: "Name of the Wind",
//     genre: "Fantasy",
//     id: "1",
//     authorId: "1",
//   },
//   {
//     name: "The Last Empire",
//     genre: "Horror",
//     id: "2",
//     authorId: "3",
//   },
//   {
//     name: "The Long Earth",
//     genre: "Sci-Fi",
//     id: "3",
//     authorId: "3",
//   },
// ];

// const authors = [
//   { name: "Samuel A. Jackson", age: 35, id: "1" },
//   { name: "Solomon Ndifereke", age: 0, id: "2" },
//   { name: "J Peterson", age: 40, id: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // const find_author = authors.find(
        //   (content) => content.id == parent.authorId
        // );
        // return find_author;
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // const find_book = books.filter(
        //   (content) => content.authorId == parent.id
        // );
        // return find_book;
      },
    },
  }),
});

// how user can jump into the graph to grab data; data can be a single book, all books, single author, all authors
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //to get a single book
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to query database goes here. we could actually use or create instance of our controllers
        // const book_found = books.find((content) => content.id == args.id);
        // return book_found;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // const author_found = authors.find((content) => content.id == args.id);
        // return author_found;
        // return author.get_author(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
      },
    },
  },
});

// create a mutation to change the state of our database
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve(parent, args) {
        return author.add_author(args);
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return book.add_book(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
