import { ApolloServer } from "@apollo/server" 
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import db from "./_db.js"

const resolvers = {
	Query: {
		games: () => db.games,
		reviews: () => db.reviews,
		authors: () => db.authors,
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