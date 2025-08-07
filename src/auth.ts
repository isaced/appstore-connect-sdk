import * as jose from "jose";

// Options for generating the JWT token
interface GenerateAuthTokenOptions {
  // The ID of the private key to use
  apiKeyId: string;
  // The ID of the issuer (i.e., your App Store Connect account)
  // Required for Team API keys, optional for Individual API keys
  issuerId?: string;
  // The private key used to sign the token
  privateKey: string;
  // The expiration time of the token (in seconds since the Unix epoch)
  expirationTime: number;
}

// Generates a JWT token for use with the App Store Connect API
export async function generateAuthToken({ apiKeyId, issuerId, privateKey, expirationTime }: GenerateAuthTokenOptions) {
  const alg = "ES256";
  const key = await jose.importPKCS8(privateKey, alg);

  const jwtBuilder = new jose.SignJWT({})
    .setProtectedHeader({
      // The algorithm used to sign the token (ECDSA with SHA-256)
      alg,
      // The ID of the private key used to sign the token
      kid: apiKeyId,
      // The type of the token (JWT)
      typ: "JWT",
    })
    .setAudience("appstoreconnect-v1")
    .setExpirationTime(expirationTime);

  if (issuerId) {
    // Team API key: use issuerId as issuer
    jwtBuilder.setIssuer(issuerId);
  } else {
    // Individual API key: set subject to "user" (no issuer required)
    jwtBuilder.setSubject("user");
  }

  const token = await jwtBuilder.sign(key);

  // Return the generated token
  return token;
}
