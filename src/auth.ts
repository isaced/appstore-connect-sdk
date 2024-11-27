import * as jose from "jose";

// Options for generating the JWT token
interface GenerateAuthTokenOptions {
  // The ID of the private key to use
  apiKeyId: string;
  // The ID of the issuer (i.e., your App Store Connect account)
  issuerId: string;
  // The private key used to sign the token
  privateKey: string;
  // The expiration time of the token (in seconds since the Unix epoch)
  expirationTime: number;
}

// Generates a JWT token for use with the App Store Connect API
export async function generateAuthToken({ apiKeyId, issuerId, privateKey, expirationTime }: GenerateAuthTokenOptions) {
  const alg = "ES256";
  const key = await jose.importPKCS8(privateKey, alg);
  const token = await new jose.SignJWT({})
    .setProtectedHeader({
      // The algorithm used to sign the token (ECDSA with SHA-256)
      alg,
      // The ID of the private key used to sign the token
      kid: apiKeyId,
      // The type of the token (JWT)
      typ: "JWT",
    })
    .setIssuer(issuerId)
    .setAudience("appstoreconnect-v1")
    .setExpirationTime(expirationTime)
    .sign(key);

  // Return the generated token
  return token;
}
