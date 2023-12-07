import GoogleProvider from "next-auth/providers/google";

export const googleProvider = GoogleProvider({
  async profile(profile) {
    // Connect to the database
    // Check if a user exists in the database
    // If so, return the user object
    // If not, create a new user object and save it to the database
    // Return the user object

    // Here we get data from Google and we can do whatever we want with it

    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
    }
  },
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
});
