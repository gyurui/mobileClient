export enum ErrorConst {
    AccountNotFound = "E_ACCOUNT_NOT_FOUND",
    UserAlreadyExists = "E_USER_ALREADY_EXISTS",
    OAuthAlreadyExists = "E_OAUTH_ALREADY_EXISTS",
    BadCredentials = "E_BAD_CREDENTIALS",
    BadRequest = "E_BAD_REQUEST",
    WeakPassword = "E_WEAK_PASSWORD",
    OAuthError = "E_OAUTH_ERROR",
    IllegalArgument = "E_ILLEGAL_ARGUMENT",
    Unauthorized = "E_UNAUTHORIZED",
    Forbidden = "E_FORBIDDEN",
    InternalError = "E_INTERNAL",
    NotFound = "E_NOT_FOUND",
    ValidationError = "E_VALIDATION",
    Unknown = "E_UNKNOWN",
}

export class ApplicationError extends Error {
    public readonly errorConst: ErrorConst;
    public readonly errorMessage?: string;

    constructor(errorConst: ErrorConst, errorMessage?: string) {
        super();
        this.errorMessage = errorMessage;
        this.errorConst = errorConst;
    }
}
