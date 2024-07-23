import { ApolloServer } from "@apollo/server" 
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import db from "./_db.js"

const resolvers = {
	Query: {
		games: () => db.games,
		game: (_, { id }) => db.games.find(game => game.id === id),
		reviews: () => db.reviews,
		review: (_, { id }) => db.reviews.find(review => review.id === id),
		authors: () => db.authors,
		author: (_, { id }) => db.authors.find(author => author.id === id),
	},
	Game: {
		reviews: (parent) => db.reviews.filter(review => review.game_id === parent.id),
	},
	Author: {
		reviews: (parent) => db.reviews.filter(review => review.author_id === parent.id),
	},
	Review: {
		author: (parent) => db.authors.find(a => a.id === parent.author_id),
		game: (parent) => db.games.find(g => g.id === parent.game_id),
	},
	Mutation: {
		addGame(parent, args) {
			const game = {
				id: db.games.length + 1,
				...args.input
			}
			db.games.push(game)
			return game
		},
		deleteGame(parent, args) {
			db.games = db.games.filter(game => game.id !== args.id)
			return db.games
		}
	}
}

const server = new ApolloServer({
	//type definitions
	typeDefs,
	// resolvers
	resolvers,
	
})

const {} = await startStandaloneServer(server, {
	listen: {port: 4000},
})

console.log("server started at Port:", 4000)