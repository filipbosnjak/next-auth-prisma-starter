const nextConfig = {
    images: {
        domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
    },
};

module.exports = (phase, {defaultConfig}) => {
    console.log("app startup")
    return nextConfig
};
