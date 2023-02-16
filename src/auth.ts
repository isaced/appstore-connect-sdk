import jwt from "jsonwebtoken";

interface GenerateAuthTokenOptions {
  apiKeyId: string;
  issuerId: string;
  privateKey: string;
  expirationTime?: number;
}

export function generateAuthToken({ apiKeyId, issuerId, privateKey, expirationTime }: GenerateAuthTokenOptions) {
  const EXPIRATION_TIME = expirationTime || 10 * 60;
  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: EXPIRATION_TIME,
    issuer: issuerId,
    audience: "appstoreconnect-v1",
    header: {
      alg: "ES256",
      kid: apiKeyId,
      typ: "JWT",
    },
  });
  console.log("Gen JWT Token: ", token);
  return token;
}
