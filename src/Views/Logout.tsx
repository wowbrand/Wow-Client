import * as React from "react";
import { useEffect } from "react";
import { getToken } from "../utils/getToken";
export interface IAppProps {}

export function Logout(props: IAppProps) {
  const token = getToken();

  localStorage.removeItem("token");

  return (
    <div>
      <h1>You have succesfully logged out</h1>
    </div>
  );
}
