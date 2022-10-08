import {FastifyPluginAsync} from 'fastify';
import '../config'
import {ObjectId} from "@fastify/mongodb";
import {Balance, BalanceResponseError, BalanceResponseSuccess, BalanceType} from "../schema/get-balance";

export const getUsers: FastifyPluginAsync = async (app) => {
  app.route<{ Body: BalanceType, Reply: any}>({
    method: 'GET',
    url: '/get-users',
    handler: async function (req, res) {
      const users = await this.mongo.client.db('users').collection('users').find({}).toArray()
      return res.code(200).send({users});
    }
  })
};
