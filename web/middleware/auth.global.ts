export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie<string>('accessToken').value

  // protect the user to
  // signin
  if (to.path.includes('signin') && accessToken) {
    return navigateTo('/app')
  }

  // protect the app
  // routes
  if (to.path.includes('app') && !accessToken) {
    return navigateTo('/signin')
  }
})
