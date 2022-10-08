import {FastifyPluginAsync} from 'fastify';
import '../config'
import {ObjectId} from "@fastify/mongodb";
import {Balance, BalanceResponseError, BalanceResponseSuccess, BalanceType} from "../schema/get-balance";

export const getBalance: FastifyPluginAsync = async (app) => {
  app.route<{ Body: BalanceType, Reply: any}>({
    method: 'POST',
    url: '/get-balance',
    schema: {
      body: Balance,
      response: {
        200: BalanceResponseSuccess,
        400: BalanceResponseError
      }
    },
    handler: async function (req, res) {
      const {_id, currency} = req.body;
      const users = await this.mongo.client.db('users').collection('users');
      const user = await users.findOne({ _id: new ObjectId(_id) });
      const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', {
        headers: {'Content-Type': 'application/json'},
        method: "GET"
      })
      const data = await response.json()
      let array_currencies: any[]
      array_currencies = Array.from(data)
      let currency_data = array_currencies.find((item) => item.cc === currency )
      let usd_currency = array_currencies.find((item) => item.cc === 'USD' )

        if (!user) {
        return res.code(400).send({ok: false, message: 'user-not-found'});
      }
      if (currency === 'USD'){
        return res.code(200).send({ok: true, message: `balance: ${(user.balance.amount)} USD`});
      }
      if (currency === 'UAH'){
        return res.code(200).send({ok: true, message: `balance: ${(user.balance.amount*(usd_currency.rate)).toFixed(2)} UAH`});
      }
        return res.code(200).send({ok: true, message: `balance: ${((user.balance.amount*(usd_currency.rate))/currency_data.rate).toFixed(2)} ${currency_data.cc}`});
    }
  })
};
