//#region API_URL

import { getCookie } from "@/utils/cookies";

export const API_URL: string = "http://79.174.83.183:5000";
//#endregion

export type IMethodDefault = {
    path: string;
    body?: BodyInit;
    method?: "GET" | "POST" | "DELETE";
    headers?: Record<string, string>;
};

export const methodDefault = ({
    path,
    body,
    method,
    headers = {},
}: IMethodDefault): Promise<any> =>
    fetch(`${API_URL}/${path}`, {
        body,
        method,
        headers: {
            "content-type": "application/json",
            ...headers,
        },
    })
        .then(async (e) => {
            return await e.json()

        })
        .catch((e) => ({ error: "No Connect" }));
