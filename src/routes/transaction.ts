import {FastifyPluginAsync} from 'fastify';
import '../config'
import {TransferResponseError, TransferResponseSuccess, TransferType, Transfer} from "../schema/transfer";
import {ObjectId} from "@fastify/mongodb";
import {
  Transaction,
  TransactionResponseError,
  TransactionResponseSuccess,
  TransactionResponseType,
  TransactionType
} from "../schema/transaction";

export const transaction: FastifyPluginAsync = async (app) => {
  app.route<{ Body: TransactionType, Reply: any}>({
    method: 'POST',
    url: '/transaction',
    schema: {
      body: Transaction,
      response: {
        200: TransactionResponseSuccess,
        400: TransactionResponseError
      }
    },
    handler: async function (req, res) {
      const {_id, amount, description} = req.body;
      const users = await this.mongo.client.db('users').collection('users');
      const user = await users.findOne({ _id: new ObjectId(_id) });
      const date = new Date(Date.now());
      if (!user) {
        return res.code(400).send({ok: false, message: 'user-not-found'});
      }
      if (typeof amount === 'string') {
        return res.code(400).send({ok: false, message: 'amount-must-be-number'});
      }

      await users.updateOne({_id: new ObjectId(_id)}, {
        "$inc": {['balance.amount']: amount},
        "$push": {'balance.history': {date, amount, description} }
      });

      return res.code(200).send({ok: true, message: 'Transfer successfull'});

    }
  })
};
