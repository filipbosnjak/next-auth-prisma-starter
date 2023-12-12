/** @type {import('next').NextConfig} */
const nextConfig = {
  // disabling strict mode since the examples use
  // useEffect with no dependencies to ensure the function
  // is only run once and only run on the client.
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,

    // Fix ably errors: sqrt undefined
    swcMinify: true,

    domains: [
      "static.ably.dev",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
};

module.exports = nextConfig;

/*
module.exports = (phase, { defaultConfig }) => {
  console.log("app startup");
  return nextConfig;
};
*/
