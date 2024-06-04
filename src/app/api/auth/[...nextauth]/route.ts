import NextAuth from "next-auth/next";
import { options } from "./options";
import { NextApiRequest, NextApiResponse } from "next";

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options(req, res));
};

const handler = Auth;

export { handler as GET, handler as POST };
