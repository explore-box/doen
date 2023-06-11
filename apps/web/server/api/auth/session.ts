export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  // start to set the session
  if (method == 'POST') {
    const body = await readBody<{
      key: string
      value: any
    }>(event)
    if (body) {
      setCookie(event, body.key, body.value, {
        maxAge: 86400
      })

      return {}
    }
  }

  return sendRedirect(event, '/signin')
})
