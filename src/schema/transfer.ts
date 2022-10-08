import {Type, Static} from "@sinclair/typebox"

export const Transfer = Type.Object({
  id_from: Type.String(),
  id_to: Type.String(),
  amount: Type.Number(),
  description: Type.String()
});

export type TransferType = Static<typeof Transfer>;

export const TransferResponseSuccess = Type.Object({
  ok: Type.Literal(true),
  message: Type.String()
});

export const TransferResponseError = Type.Object({
  ok: Type.Literal(false),
  message: Type.Union([
    Type.Literal('user-not-found'),
    Type.Literal('balance-not-enough'),
    Type.Literal('amount-must-be-number'),
    Type.Literal('amount-must-be-positive'),
    Type.Literal('user-sender-not-found'),
    Type.Literal('user-receiver-not-found'),
  ])
});

export const TransferResponse = Type.Union([
  TransferResponseSuccess,
  TransferResponseError
]);

export type TransferResponseType = Static<typeof Transfer>;