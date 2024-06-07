"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from "@/_types/common/FetchHelper"

import { CONFIG } from "./Constants"

import { iterateObject } from "./Helpers"

import { axiosInstance } from "./AxiosInstance"

const parseResponse = async (response: Response) => {
    if (response.status == CONFIG.STATUS_CODES.NO_CONTENT) {
        return null
    } else if (!response.ok) {
        const json = await response.json()
        throw new Error(parseResponseError(json))
    }
    try {
        return await response.json()
    } catch (error) {
        return null
    }
}
/**
 * Extracts and constructs an error message from a response object.
 *
 * This function iterates over the response object and constructs an error message.
 *
 * @param response - The response object containing error information.
 * @returns The constructed error message.
 */
export const parseResponseError = (response: Response) => {
    const errorMessage = iterateObject(response)
    return errorMessage
}

/**
 * Appends query parameters to a URL.
 *
 * This function creates a new URL object based on the provided URL and appends the given
 * query parameters. Existing query parameters are cleared before appending the new ones.
 *
 * @param url - The base URL to which the parameters will be appended.
 * @param params - An optional object containing key-value pairs of parameters to append.
 * @returns A new URL object with the appended query parameters.
 */
const appendParams = (url: URL, params?: Record<string, any>): URL => {
    const newUrl = new URL(url.href)
    if (params && Object.keys(params).length) {
        newUrl.searchParams.forEach((_, key) => {
            newUrl.searchParams.delete(key)
        })
        Object.entries(params).forEach(([key, value]) => {
            newUrl.searchParams.set(key, value)
        })
    }
    return newUrl
}

/**
 * Helper object for making various HTTP requests with automatic token refreshing.
 */
export const FetchHelper = {
    get: async (url: URL, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "GET" })
    },
    post: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "POST", data })
    },
    put: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "PUT", data })
    },
    patch: async (url: URL, data: object, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "PATCH", data })
    },
    delete: async (url: URL, params?: Params): Promise<any> => {
        url = appendParams(url, params)
        return await axiosInstance({ url: url.toString(), method: "DELETE" })
    },
    putFileData: async (url: URL, data: any, contentType: string) => {
        return await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": contentType,
            },
            body: data,
        }).then(parseResponse)
        // no need for catch here as we don't want to swallow errors
    },
}
