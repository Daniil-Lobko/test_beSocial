import {FastifyPluginAsync} from 'fastify';
import '../config'
import {User, UserResponseError, UserResponseSuccess, UserResponseType, UserType} from "../schema/user";

export const createUser: FastifyPluginAsync = async (app) => {
  app.route<{ Body: UserType, Reply: any}>({
    method: 'POST',
    url: '/create-user',
    schema: {
        body: User,
        response: {
            200: UserResponseSuccess,
            400: UserResponseError
        }
    },
    handler: async function (req, res) {
      const {username, phone, amount, password} = req.body;
      const users = this.mongo.client.db('users').collection('users');
      const date = new Date(Date.now());
      if (await users.findOne({'profile.phone': phone})) {
        return res.code(400).send({ok: false, message: 'phone-already-registered'});
      }
      if (!password.match(/.{3,30}/g)) {
        return res.code(400).send({ok: false, message: 'incorrect-password-format'});
      }
      if (typeof amount === 'string') {
        return res.code(400).send({ok: false, message: 'amount-must-be-number'});
      }
      if (amount < 0) {
        return res.code(400).send({ok: false, message: 'amount-must-be-positive'});
      }

      await users.insertOne({
        profile: {phone, password, username,},
        balance: {amount, date, history:[]}
      });

        return res.code(200).send({ok: true, message: 'User was successfully created'});

    }
  })
};
