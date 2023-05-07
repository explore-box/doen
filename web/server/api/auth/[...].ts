import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const config = useRuntimeConfig()

/**
 * !define strategies
 *
 * create the strategy to handle the authentication
 */
const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    console.log('Start to make progress')
    // const { data, error } = await useApiClient('v1/auth/email-pass', {
    //   body: {
    //     email,
    //     password
    //   }
    // })

    // if (error) {
    //   done(error)
    // } else {
    //   done(null, data)
    // }
  }
)

const githubStrategy = new GithubStrategy(
  {
    clientID: config.public.auth.strategies.github.clientId,
    clientSecret: config.public.auth.strategies.github.clientSecret,
    callbackURL: `${config.public.auth.callbackBaseUrl}/api/auth/github/callback`,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    done(null, profile)
  }
)

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.public.auth.strategies.google.clientId,
    clientSecret: config.public.auth.strategies.github.clientId,
    callbackURL: `${config.public.auth.callbackBaseUrl}/api/auth/google/callback`,
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
  }
)

// register the passport strategy
// that's allow to use it later
passport.use(localStrategy)
passport.use(githubStrategy)
passport.use(googleStrategy)

/**
 * event handler to authenticate the user
 * including with many strategy including local, google, github and so on.
 *
 * Using the passportjs support
 */
export default defineEventHandler((event) => {
  const params = (getRouterParams(event)._ as string).split('/')

  // check if the urls is matched
  // with the strategies
  // using email and password
  if (params.includes('local')) {
    passport.authenticate('local', async (err, user) => {
      return {}
    })(event.node.req, event.node.res)
  }

  // using github signin
  else if (params.includes('github')) {
    if (params.includes('callback')) {
      passport.authenticate(githubStrategy, async (err, user) => {
        if (err) {
          return sendRedirect(event, '/signin?status=fail&strategy=github')
        } else {
          return sendRedirect(event, '/signin')
        }
      })(event.node.req, event.node.res)
    } else {
      passport.authenticate(githubStrategy)(event.node.req, event.node.res)
    }
  }

  // using google signin
  else if (params.includes('google')) {
    if (params.includes('callback')) {
      return passport.authenticate(googleStrategy, async (err, user) => {
        console.log('Error coming')
      })(event.node.req, event.node.res)
    } else {
      return passport.authenticate(googleStrategy)(
        event.node.req,
        event.node.res
      )
    }
  } else {
    return sendRedirect(event, '/signin')
  }
})
