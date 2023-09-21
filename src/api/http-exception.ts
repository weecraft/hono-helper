import { HTTPException } from 'hono/http-exception'

/**
 * Provide custome http exception that allow to infer the
 * error into a response to API
 *
 * working with api handler
 */

export class HttpErrorException extends HTTPException {
  statusCode: number
  description: string

  constructor(statusCode: number, message?: string, description?: string) {
    super(statusCode, { message })
    this.description = description
    this.statusCode = statusCode
  }
}

export class BadRequestException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(400, message || 'Bad Request', description)
  }
}

export class UnauthorizedException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(401, message || 'Unauthorized', description)
  }
}

export class NotFoundException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(404, message || 'Not Found', description)
  }
}

export class NotAcceptableException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(406, message || 'Not Acceptable', description)
  }
}

export class RequestTimeoutException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(408, message || 'Request Timeout', description)
  }
}

export class ConflictException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(409, message || 'Conflict', description)
  }
}

export class GoneException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(410, message || 'Gone', description)
  }
}

export class PayloadTooLargeException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(413, message || 'Payload Too Large', description)
  }
}

export class UnsupportedMediaTypeException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(400, message || 'Bad Request', description)
  }
}

export class UnprocessableEntityException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(415, message || 'Unsupported Media Type', description)
  }
}

export class InternalServerErrorException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(500, message || 'Internal Server Error', description)
  }
}

export class NotImplementedException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(501, message || 'Not Implemented', description)
  }
}

export class MethodNotAllowedException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(405, message || 'Method Not Allowed', description)
  }
}

export class BadGatewayException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(502, message || 'Bad Gateway', description)
  }
}

export class ForbiddenException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(403, message || 'Forbidden', description)
  }
}

export class ServiceUnavailableException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(503, message || 'Service unavailable', description)
  }
}

export class GatewayTimeoutException extends HttpErrorException {
  constructor(message?: string, description?: string) {
    super(504, message || 'Gateway Timeout', description)
  }
}
