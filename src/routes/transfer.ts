import {FastifyPluginAsync} from 'fastify';
import '../config'
import {TransferResponseError, TransferResponseSuccess, TransferType, Transfer} from "../schema/transfer";
import {ObjectId} from "@fastify/mongodb";

export const transfer: FastifyPluginAsync = async (app) => {
  app.route<{ Body: TransferType, Reply: any}>({
    method: 'POST',
    url: '/transfer',
    schema: {
      body: Transfer,
      response: {
        200: TransferResponseSuccess,
        400: TransferResponseError
      }
    },
    handler: async function (req, res) {
      const {id_from, id_to, amount, description} = req.body;
      const users = await this.mongo.client.db('users').collection('users');
      const user_from = await users.findOne({ _id: new ObjectId(id_from) });
      const user_to = await users.findOne({ _id: new ObjectId(id_to) });
      const date = new Date(Date.now());
      console.log('user_from: ', user_from);
      console.log('user_to: ', user_to);
      if (!user_from) {
        return res.code(400).send({ok: false, message: 'user-sender-not-found'});
      }
      if (!user_to) {
        return res.code(400).send({ok: false, message: 'user-receiver-not-found'});
      }
      if (user_from.balance.amount < amount) {
        return res.code(400).send({ok: false, message: 'balance-not-enough'});
      }
      if (typeof amount === 'string') {
        return res.code(400).send({ok: false, message: 'amount-must-be-number'});
      }
      if (amount < 0) {
        return res.code(400).send({ok: false, message: 'amount-must-be-positive'});
      }

      await users.updateOne({_id: new ObjectId(id_from)}, {
        "$inc": {['balance.amount']: -amount},
        "$push": {'balance.history': {receiver: user_to?.profile.username, date, amount, description} }
      });

      await users.updateOne({_id: new ObjectId(id_to)}, {
        "$inc": {['balance.amount']:  amount},
        "$push": {'balance.history': {sender: user_from?.profile.username, date, amount, description }}
      });

      return res.code(200).send({ok: true, message: 'Transfer successfull'});

    }
  })
};
