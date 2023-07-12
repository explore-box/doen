// configuration for the app
// that can be easily access from the app
// using the config service
export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
})
