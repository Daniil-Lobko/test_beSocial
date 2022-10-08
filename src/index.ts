import fastify from 'fastify'
import './config'
import fastifySwagger from '@fastify/swagger'
import fastifyMongodb from "@fastify/mongodb";
import {createUser} from "./routes";
import * as routes from './routes/';

const app = fastify()
const mongoConnectionUrl = process.env.MONGODB_CONNECTION_URL

app.get('/', async (request, reply) => {
  return `started`
})

app.register(fastifyMongodb, {
  forceClose: true,
  url: mongoConnectionUrl
});

console.log('succussfully connected')

app.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/api/docs',
  swagger: {
    info: {
      title: 'BeSocial API',
      description: 'BeSocial API documents',
      version: 'v0',
    },
    schemes:  ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
})


app.register((app, options, done) => {
  app.register(routes.createUser);
  app.register(routes.transfer);
  app.register(routes.transaction);
  app.register(routes.getBalance);
  app.register(routes.getHistory);
  done();
}, {prefix: '/v0'});


app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at http://127.0.0.1:8080/`)
})