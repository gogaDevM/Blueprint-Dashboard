interface ParsedCookie {
  name: string | undefined;
  value: string | undefined;
  expires: string | undefined;
  maxAge: string | undefined;
  path: string | undefined;
}

const parseCookies = (
  responseCookies: string[] | undefined
): ParsedCookie[] => {
  if (!responseCookies) return [];

  return responseCookies.map((cookie) => {
    const cookieAttributes = cookie.split(";");

    let name;
    let value;
    let expires;
    let maxAge;
    let path;

    cookieAttributes.forEach((attribute) => {
      const [key, val] = attribute.trim().split("=");

      if (key === "X-Auth-Access-Token" || key === "X-Auth-Refresh-Token") {
        name = key;
      }

      if (key.toLowerCase() === "path") {
        path = val;
      }

      if (key.toLowerCase() === "expires") {
        expires = val;
      }

      if (key.toLowerCase() === "max-age") {
        maxAge = val;
      }
    });

    if (name === "X-Auth-Access-Token" || name === "X-Auth-Refresh-Token") {
      const [cookieName, cookieValue] = cookieAttributes[0].split("=");

      value = cookieValue;
    }

    return { name, value, expires, maxAge, path };
  });
};

const findCookie = (
  cookies: ParsedCookie[],
  cookieName: string
): ParsedCookie | undefined => {
  return cookies.find((cookie) => cookie.name === cookieName);
};

const Cookies = {
  parseCookies,
  findCookie,
};

export default Cookies;
