import { Result } from "./type";
import { dataToQuery } from "./parseQuery";

const request = <T>(
  url: string,
  data?: Record<string, any>,
  option?: RequestInit,
): Promise<Result<T>> => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token") || "";
    const inti: RequestInit = {
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        authorization: token,
        "Content-Type": "application/json",
        ...option?.headers,
      },
      ...option,
    };
    fetch(url, inti)
      .then((response) => {
        response.text().then((resStr) => {
          const obj = JSON.parse(resStr);
          if (obj.code !== 0) {
            reject(obj.msg);
          } else {
            resolve(obj);
          }
        });
      })
      .catch((e) => reject(e));
  });
};
export const get = <T>(
  url: string,
  query?: Record<string, any>,
  option?: RequestInit,
): Promise<Result<T>> => {
  const { method, headers, ...rest } = option || {};
  return request<T>(
    `${url}${query ? `?${dataToQuery(query)}` : ""}`,
    undefined,
    { method: "get", ...rest },
  );
};
export const post = <T>(
  url: string,
  data?: Record<string, any>,
  option?: RequestInit,
): Promise<Result<T>> => {
  const { method, headers, ...rest } = option || {};
  return request<T>(url, data, { method: "post", ...rest });
};
