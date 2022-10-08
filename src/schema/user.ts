import {Type, Static} from "@sinclair/typebox"

export const User = Type.Object({
  username: Type.String(),
  phone: Type.String(),
  amount: Type.Number(),
  password: Type.String(),
});

export type UserType = Static<typeof User>;

export const UserResponseSuccess = Type.Object({
  ok: Type.Literal(true),
  message: Type.String()
});

export const UserResponseError = Type.Object({
  ok: Type.Literal(false),
  message: Type.Union([
    Type.Literal('incorrect-format-username'),
    Type.Literal('amount-must-be-positive'),
    Type.Literal('phone-already-registered'),
    Type.Literal('amount-must-be-number'),
    Type.Literal('incorrect-password-format')

  ])
});

export const UserResponse = Type.Union([
  UserResponseSuccess,
  UserResponseError
]);

export type UserResponseType = Static<typeof User>;