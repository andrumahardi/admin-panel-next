"use client";

import { Button, FormControl, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useReducer } from "react";
import { ACTION_TYPES, initialState, reducer } from "./reset-password-reducer";

export function ResetPassword() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: ACTION_TYPES.CHANGE_FIELD,
      name: e.target.name as "email",
      value: e.target.value
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state.values.email) {
      console.log(state);
    }
  }

  return (
    <VStack
      as="form"
      onSubmit={onSubmit}
      bgColor="#ffffff"
      w="400px"
      padding="20px"
      borderRadius="5px"
      boxShadow="4px 10px 20px #0000003d"
      spacing={4}
    >
      <Text textAlign="center">Reset Password</Text>
      <FormControl>
        <Input name="email" onChange={onChange} placeholder="Email" />
      </FormControl>
      <Button w="full" colorScheme="blue" type="submit" isDisabled={!state.values.email}>
        Send Password Reset Link
      </Button>
    </VStack>
  );
}
