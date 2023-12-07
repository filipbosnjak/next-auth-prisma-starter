import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { TokenSetParameters } from "openid-client";

export const githubProvider = GitHubProvider({
  profile: async (profile: GithubProfile, tokens: TokenSetParameters) => {
    // Connect to the database
    // Check if a user exists in the database
    // If so, return the user object
    // If not, create a new user object and save it to the database
    // Return the user object
    return {
        id: profile.id.toString(),
        name: profile.name || profile.login,
        email: profile.email,
        image: profile.avatar_url,
    }

  },
  clientId: process.env.GITHUB_CLIENT_ID || "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
});
