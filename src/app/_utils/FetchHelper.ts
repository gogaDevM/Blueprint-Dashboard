import AuthManager from "./AuthManager";

import Mode from "./Mode";

import General from "./General";

const PAGE_LIMIT = 20;

const handleValidateTokens = async (validateTokens: boolean) => {
  if (validateTokens) {
    await AuthManager.validateTokens();
  }
};

const hasError = ({ code, success }: { code: number; success: boolean }) => {
  return code < 200 || code > 299 || !success;
};

const getError = (responseJson: any) => {
  let error = null;
  if (responseJson.message) {
    error = responseJson.message;
  } else if (responseJson.non_field_errors) {
    error =
      responseJson.non_field_errors instanceof Array
        ? responseJson.non_field_errors[0]
        : responseJson.non_field_errors;
  } else {
    error = responseJson;
  }

  if (error && error.constructor === Object) {
    error = parseError(error[Object.keys(error)[0]], Object.keys(error)[0]);
  }

  let message = "An unexpected error occurred";

  if (error) {
    message = error;
  }

  return { error, message };
};
const parseError = (error: any, key: string): string | undefined => {
  if (error instanceof Array) {
    if (error[0] instanceof Object) {
      return parseError(error[0], key);
    }
    return `${General.snakeCaseToTitleCase(key)}: ${error[0]}`;
  } else if (typeof error === "string") {
    return `${General.snakeCaseToTitleCase(key)}: ${error}`;
  } else if (error instanceof Object) {
    return parseError(error[Object.keys(error)[0]], Object.keys(error)[0]);
  }
};

const FetchHelper = {
  get: async (endpoint: string, validateTokens: boolean = true) => {
    let data = {} as any;
    let statusCode = null;

    if (endpoint.indexOf("live=") === -1) {
      let modeParam = `live=${!Mode.isDemoToggled()}`;
      endpoint +=
        endpoint.indexOf("?") > -1 ? `&${modeParam}` : `?${modeParam}`;
    }

    await handleValidateTokens(validateTokens);

    data["headers"] = AuthManager.getHeaders(
      "application/json",
      validateTokens
    );
    const response = await fetch(endpoint, data);
    statusCode = response.status;
    const responseJson = await response.json();

    let status = { code: statusCode, success: responseJson.status };
    if (hasError(status)) {
      throw getError(responseJson);
    }

    return responseJson;
  },

  getPaginated: async (
    endpoint: string,
    page: number,
    validateTokens: boolean = true,
    pageLimit: number = PAGE_LIMIT
  ) => {
    if (endpoint.includes("?")) {
      endpoint += "&";
    } else {
      endpoint += "?";
    }

    await handleValidateTokens(validateTokens);
    return FetchHelper.get(endpoint + "page=" + page);
  },

  post: async (
    endpoint: string,
    data: any,
    isMultiPart: boolean = false,
    validateTokens: boolean = true
  ) => {
    let statusCode = null;

    await handleValidateTokens(validateTokens);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: isMultiPart
        ? AuthManager.getHeaders("multipart/form-data", validateTokens)
        : AuthManager.getHeaders("application/json", validateTokens),
      body: isMultiPart ? data : JSON.stringify(data),
    });

    console.log("RESPONSE FETCH HELPER POST", response);

    statusCode = response.status;
    const responseJson =
      statusCode === 204 || statusCode === 200
        ? response
        : await response.json();

    let status = { code: statusCode, success: responseJson.status };
    if (hasError(status)) {
      throw getError(responseJson);
    }

    return responseJson;
  },

  put: async (
    endpoint: string,
    data: any,
    stringify: boolean = true,
    validateTokens: boolean = true
  ) => {
    let statusCode = null;
    await handleValidateTokens(validateTokens);
    let headers = AuthManager.getHeaders("application/json", validateTokens);

    if (stringify) {
      data = JSON.stringify(data);
    } else {
      headers = AuthManager.getHeaders("multipart/form-data", validateTokens);
    }

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: headers,
      body: data,
    });
    statusCode = response.status;
    const responseJson = await response.json();

    let status = { code: statusCode, success: responseJson.status };
    if (hasError(status)) {
      throw getError(responseJson);
    }

    return responseJson;
  },

  patch: async (
    endpoint: string,
    data: any,
    stringify: boolean = true,
    validateTokens: boolean = true
  ) => {
    let statusCode = null;
    await handleValidateTokens(validateTokens);
    let headers = AuthManager.getHeaders("application/json", validateTokens);

    if (stringify) {
      data = JSON.stringify(data);
    } else {
      headers = AuthManager.getHeaders("multipart/form-data", validateTokens);
    }

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: headers,
      body: data,
    });
    statusCode = response.status;
    const responseJson = await response.json();

    let status = { code: statusCode, success: responseJson.status };
    if (hasError(status)) {
      throw getError(responseJson);
    }

    return responseJson;
  },
};

export default FetchHelper;
