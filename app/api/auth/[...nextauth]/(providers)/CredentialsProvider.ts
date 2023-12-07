import CredentialsProvider from "next-auth/providers/credentials";


export const credentialsProvider = CredentialsProvider({
  type: "credentials",
  id: "credentials",
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  //@ts-ignore
  async authorize(credentials, request) {
    try {
      // Connect to the database
      // Check if a user exists in the database
      // If so, compare the password from the form with the stored password
      // If the password matches, return the user object
      // If the password does not match, return null
    } catch (error) {
      console.log("error: ", error);
    }
    return { error: "No user found" };
  },
});
