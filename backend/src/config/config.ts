export const _config = Object.freeze({
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 9000,
  databaseUrl: `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || 7,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || 1,
  frontendDomain: process.env.FRONTEND_DOMAIN,
});

(() =>
  Object.entries({
    databaseUrl: _config.databaseUrl,
    refreshTokenSecret: _config.refreshTokenSecret,
    accessTokenSecret: _config.accessTokenSecret,
  }).forEach(([key, value]) => {
    if (!value)
      throw new Error(`Environment variable "${key}" is missing or empty!`);
  }))();
