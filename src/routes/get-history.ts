import {FastifyPluginAsync} from 'fastify';
import '../config'
import {ObjectId} from "@fastify/mongodb";
import {Balance, BalanceResponseError, BalanceResponseSuccess, BalanceType} from "../schema/get-balance";
import {History, HistoryResponseError, HistoryResponseSuccess, HistoryType} from "../schema/get-history";

export const getHistory: FastifyPluginAsync = async (app) => {
  app.route<{ Body: HistoryType, Reply: any}>({
    method: 'POST',
    url: '/get-history',
    schema: {
      body: History,
      response: {
        200: HistoryResponseSuccess,
        400: HistoryResponseError
      }
    },
    handler: async function (req, res) {
      const {_id} = req.body;
      const users = await this.mongo.client.db('users').collection('users');
      const user = await users.findOne({ _id: new ObjectId(_id) });
      let data = user?.balance.history
      console.log(user?.balance.history)
      if (!user) {
        return res.code(400).send({ok: false, message: 'user-not-found'});
      }
      return res.code(200).send({ok: true, message: data});
    }
  })
};
