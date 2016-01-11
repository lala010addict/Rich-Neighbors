# Rich Neighbors

A web and mobile community-focused crowdfunding platform for pooling money, resources, and volunteers.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Website

#[Live Demo](https://rneighbors.herokuapp.com/)

![Rich Neighbors](/screenshots/RichNeighbors.png?raw=true "Rich Neighbors")

![Rich Neighbors](/screenshots/RichNeighbors1.png?raw=true "Rich Neighbors")

## Testing

Running `npm test` will run the unit tests with karma.
