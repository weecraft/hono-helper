import { Context, Hono, Next } from 'hono'
import { HttpErrorException } from './http-exception'
import { H } from 'hono/dist/types/types'

type FallBackFunctionReturnType = (
  ctx: Context,
  next: Next,
) => Promise<void | Context | any> | (void | Context | any)

/**
 * ## routeHandler
 *
 * allow to handle the api call
 * and manage the resource and throw into a response api
 *
 * @param fallbackFunction function to handle and return something
 * @returns {Context}
 */
export function routeHandler(fallbackFunction: FallBackFunctionReturnType): H {
  return async (ctx: Context, next: Next) => {
    try {
      // get the initial data from the given fallback
      // allow to infer all of the function to running
      // then pass the response as json to api
      const returnedData = await fallbackFunction(ctx, next)

      if (returnedData && returnedData.req && returnedData.res) {
        return await next()
      }

      return ctx.json(returnedData)
    } catch (err) {
      // catch some error
      // then spread it into a custom error http exception
      // this will work with custom http exceptions
      const { message, statusCode, description } = err as HttpErrorException
      ctx.status(statusCode)
      return ctx.json({ message, error: description, statusCode })
    }
  }
}
