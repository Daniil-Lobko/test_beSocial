import {Type, Static} from "@sinclair/typebox"
import {Transfer} from "./transfer";
import {Transaction} from "./transaction";

export const History = Type.Object({
  _id: Type.String()
});

export type HistoryType = Static<typeof History>;

export const HistoryResponseSuccess = Type.Object({
  ok: Type.Literal(true),
  message: Type.Any()
});

export const HistoryResponseError = Type.Object({
  ok: Type.Literal(false),
  message: Type.Union([
    Type.Literal('user-not-found'),
  ])
});

export const HistoryResponse = Type.Union([
  HistoryResponseSuccess,
  HistoryResponseError
]);

export type HistoryResponseType = Static<typeof History>;