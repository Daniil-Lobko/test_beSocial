import {Type, Static} from "@sinclair/typebox"

export const Transaction = Type.Object({
  _id: Type.String(),
  amount: Type.Number(),
  description: Type.String()
});

export type TransactionType = Static<typeof Transaction>;

export const TransactionResponseSuccess = Type.Object({
  ok: Type.Literal(true),
  message: Type.String()
});

export const TransactionResponseError = Type.Object({
  ok: Type.Literal(false),
  message: Type.Union([
    Type.Literal('user-not-found'),
    Type.Literal('balance-not-enough'),
    Type.Literal('amount-must-be-number'),
  ])
});

export const TransactionResponse = Type.Union([
  TransactionResponseSuccess,
  TransactionResponseError
]);

export type TransactionResponseType = Static<typeof Transaction>;