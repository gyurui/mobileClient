import { ErrorConst } from "@src/const/ErrorConst";

export class ApiError extends Error {
    private readonly code?: ErrorConst;

    public constructor(code?: ErrorConst, message?: string) {
        super(message);
        this.code = code;
    }

    public toString(): string {
        return `code=${this.code} message=${this.message}`;
    }
}
