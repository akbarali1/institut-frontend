import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { LaravelJWTScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/login",
    "logout": "/",
    "home": "/",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "laravelJWT"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // laravelJWT
  $auth.registerStrategy('laravelJWT', new LaravelJWTScheme($auth, {
  "url": "https://backend.questa.uz/api/v1/",
  "endpoints": {
    "login": {
      "url": "https://backend.questa.uz/api/v1/auth/login",
      "method": "post",
      "propertyName": "token"
    },
    "refresh": {
      "url": "https://backend.questa.uz/api/v1/auth/refresh",
      "method": "post"
    },
    "logout": {
      "url": "https://backend.questa.uz/api/v1/auth/logout",
      "method": "destroy"
    },
    "user": {
      "url": "https://backend.questa.uz/api/v1/auth/user",
      "method": "get"
    }
  },
  "token": {
    "property": "access_token",
    "maxAge": 604800
  },
  "tokenRequired": true,
  "tokenType": "Bearer",
  "globalToken": true,
  "refreshToken": {
    "property": false,
    "data": false,
    "maxAge": 604800,
    "required": false,
    "tokenRequired": true
  },
  "name": "laravelJWT",
  "user": {
    "property": false
  },
  "clientId": false,
  "grantType": false
}))

  // local
  $auth.registerStrategy('local', new LaravelJWTScheme($auth, {
  "url": "https://backend.questa.uz/api/v1/",
  "endpoints": {
    "login": {
      "url": "https://backend.questa.uz/api/v1/auth/web3/verify",
      "method": "post",
      "propertyName": "token"
    },
    "refresh": {
      "url": "https://backend.questa.uz/api/v1/auth/refresh",
      "method": "post"
    },
    "logout": {
      "url": "https://backend.questa.uz/api/v1/auth/logout",
      "method": "destroy"
    },
    "user": {
      "url": "https://backend.questa.uz/api/v1/auth/user",
      "method": "get",
      "propertyName": false
    }
  },
  "token": {
    "property": "access_token",
    "maxAge": 604800
  },
  "tokenRequired": true,
  "tokenType": "Bearer",
  "globalToken": true,
  "refreshToken": {
    "property": false,
    "data": false,
    "maxAge": 604800,
    "required": false,
    "tokenRequired": true
  },
  "name": "local",
  "user": {
    "property": false
  },
  "clientId": false,
  "grantType": false
}))

  // telegram
  $auth.registerStrategy('telegram', new LaravelJWTScheme($auth, {
  "url": "https://backend.questa.uz/api/v1/",
  "endpoints": {
    "login": {
      "url": "https://backend.questa.uz/api/v1/auth/telegram/login",
      "method": "post",
      "propertyName": "token"
    },
    "refresh": {
      "url": "https://backend.questa.uz/api/v1/auth/refresh",
      "method": "post"
    },
    "logout": {
      "url": "https://backend.questa.uz/api/v1/auth/logout",
      "method": "destroy"
    },
    "user": {
      "url": "https://backend.questa.uz/api/v1/auth/user",
      "method": "get",
      "propertyName": false
    }
  },
  "token": {
    "property": "access_token",
    "maxAge": 604800
  },
  "tokenRequired": true,
  "tokenType": "Bearer",
  "globalToken": true,
  "refreshToken": {
    "property": false,
    "data": false,
    "maxAge": 604800,
    "required": false,
    "tokenRequired": true
  },
  "name": "telegram",
  "user": {
    "property": false
  },
  "clientId": false,
  "grantType": false
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
