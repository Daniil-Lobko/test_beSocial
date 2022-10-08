import {Type, Static} from "@sinclair/typebox"

export const Balance = Type.Object({
  _id: Type.String(),
  currency: Type.String()
});

export type BalanceType = Static<typeof Balance>;

export const BalanceResponseSuccess = Type.Object({
  ok: Type.Literal(true),
  message: Type.String()
});

export const BalanceResponseError = Type.Object({
  ok: Type.Literal(false),
  message: Type.Union([
    Type.Literal('user-not-found'),
  ])
});

export const BalanceResponse = Type.Union([
  BalanceResponseSuccess,
  BalanceResponseError
]);

export type BalanceResponseType = Static<typeof Balance>;