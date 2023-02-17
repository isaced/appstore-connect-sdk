import jwt from "jsonwebtoken";

// Options for generating the JWT token
interface GenerateAuthTokenOptions {
  // The ID of the private key to use
  apiKeyId: string;
  // The ID of the issuer (i.e., your App Store Connect account)
  issuerId: string;
  // The private key used to sign the token
  privateKey: string;
  // The time (in seconds) until the token expires (default 10 minutes)
  expirationTime?: number;
}

// Generates a JWT token for use with the App Store Connect API
export function generateAuthToken({ apiKeyId, issuerId, privateKey, expirationTime }: GenerateAuthTokenOptions) {
  // Default expiration time is 10 minutes (600 seconds)
  const EXPIRATION_TIME = expirationTime || 10 * 60;

  // Generate the token using the provided options
  const token = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: EXPIRATION_TIME,
    issuer: issuerId,
    audience: "appstoreconnect-v1",
    header: {
      // The algorithm used to sign the token (ECDSA with SHA-256)
      alg: "ES256",
      // The ID of the private key used to sign the token
      kid: apiKeyId,
      // The type of the token (JWT)
      typ: "JWT",
    },
  });

  // Log the generated token to the console for debugging purposes
  console.log("Generated JWT Token: ", token);

  // Return the generated token
  return token;
}