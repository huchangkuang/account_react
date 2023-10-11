import { message } from "boat-ui-react";

export const errorToast = (e: any) => {
  if (typeof e === "string") {
    message.error(e);
    return;
  }
  if (e instanceof Object && typeof e.msg === "string") {
    message.error(e.msg);
    return;
  }
};
