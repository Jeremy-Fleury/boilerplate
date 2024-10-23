import { Catch, HttpStatus } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { ApplicationException } from "domain/shared/exceptions/application-exception";
import { DomainException } from "domain/shared/exceptions/domain-exception";
import { InfrastructureException } from "domain/shared/exceptions/infrastructure-exception";
import { InterfaceException } from "domain/shared/exceptions/interface-exception";

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
	private getStatusCode(exception: Error): number {
		if (exception instanceof DomainException) {
			return HttpStatus.BAD_REQUEST;
		}

		if (exception instanceof ApplicationException) {
			return HttpStatus.CONFLICT;
		}

		if (exception instanceof InfrastructureException) {
			return HttpStatus.SERVICE_UNAVAILABLE;
		}

		if (exception instanceof InterfaceException) {
			return HttpStatus.BAD_REQUEST;
		}

		return HttpStatus.INTERNAL_SERVER_ERROR;
	}

	public catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const statusCode = this.getStatusCode(exception);

		// TODO: change console to winston logger
		console.error(exception);

		response.status(statusCode).json({
			statusCode,
			message: exception.message,
			error: exception.name,
		});
	}
}
