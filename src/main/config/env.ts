export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'fb453SW46FSD-34KBE5'
}

//   nodeEnv: process.env.NODE_ENV || 'development'
