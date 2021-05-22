export default {
  jwt: {
    secret: process.env.SECRET || 'default',
    expiresIn: 3600 // 1hour
  }
}
