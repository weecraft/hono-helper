import { ValidationError, validate } from 'class-validator'

/**
 * ## validationMiddleware
 *
 * validate the input for the api
 * for api context, you can validate
 * for body, params and response, other.
 *
 * This working on the middleware layer
 *
 * @param dtoClass the class that include validation that contain `class-validator` validation
 * @param body request data that need to validate as object. eg `params`, `body`, `paths`
 *
 * @returns {ctx}
 */
export function validationMiddleware<T extends object>(
  dtoClass: new () => T,
  body: string,
) {
  return async (ctx: any, next: any) => {
    // spread all of the api context
    // capability
    const { req, res } = ctx

    const dtoInstance = new dtoClass()
    const requestBody = {
      body: req.body,
      query: req.query,
      params: req.params,
    }

    Object.assign(dtoInstance, requestBody[body])
    requestBody[body] = dtoInstance

    // doing validate the input
    // so it's can be easily to produce the errors
    const errors: ValidationError[] = await validate(dtoInstance, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })

    // check if the errors is found
    // if not we will pass, instead, we will send the error to the user to doing validation
    // and send the response as `validation/invalid-input` error
    if (errors.length > 0) {
      const validationErrors = errors.map(error => ({
        [error.property]: Object.values(error.constraints || {}),
      }))

      const errorMessage = 'validation/invalid-input'
      const errorResponse = { message: errorMessage, errors: validationErrors }

      res.status = 422
      res.json(errorResponse)

      return ctx
    }

    // pass the error
    // everything working fine
    return await next(ctx)
  }
}

/**
 * ## validateBody
 *
 * validate the body request
 *
 * @param dtoClass class passed as validation
 * @returns {ctx}
 */
export function validateBody<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'body')
}

/**
 * ## validateParams
 *
 * validate the params that send from incoming request
 *
 * @param dtoClass class passed as validation
 * @returns {ctx}
 */
export function validateParams<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'params')
}

/**
 * ## validateQuery
 *
 * validate the query from the income request
 *
 * @param dtoClass class passed as validation
 * @returns {ctx}
 */
export function validateQuery<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, 'query')
}
