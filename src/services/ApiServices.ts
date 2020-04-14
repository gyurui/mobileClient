import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Env } from "@utils/Env";
import { HttpHeader } from "@src/const/HttpHeader";
import { HttpMethod } from "@src/const/HttpMethod";
import { HttpStatusCode } from "@src/const/HttpStatusCode";
import { ErrorConst } from "@src/const/ErrorConst";
import { SerializationUtils } from "@utils/SerializationUtils";
import { ApiError } from "@models/error/ApiError";
import * as _ from "lodash";

enum ApiPath {
    data = "/data",
}

export class ApiService {
    private static readonly noCache: string = "no-cache";
    private static readonly accept = "*/*";
    private static userAgent: string;
    private static apiUrl: string;

    private static httpClient: AxiosInstance;

    public static async init(): Promise<void> {
        ApiService.apiUrl = Env.get.apiUrl;

        ApiService.httpClient = axios.create({
            timeout: Env.get.apiTimeout,
            headers: {
                [HttpHeader.UserAgent]: ApiService.userAgent,
                [HttpHeader.Authorization]: undefined,
                [HttpHeader.CacheControl]: ApiService.noCache,
                [HttpHeader.Pragma]: ApiService.noCache,
                [HttpHeader.Accept]: ApiService.accept,
            },
        });
    }

    /**
     * request send data to the server
     */
    public static async sendData(plotData: PlotData[]): Promise<void> {
        const response: AxiosResponse<{ success: boolean }> = await ApiService.call(HttpMethod.POST, ApiPath.data, { data: { plotData: JSON.stringify(plotData) } }, false);
    }

    /**
     *
     * @param method request method eg. Method.get
     * @param apiPath see ApiPath enum
     * @param requestConfig request config data
     * @param refreshTokenAllowed default true, allow to call refresh token if exists and response status is unauthorized
     * @param validStatusCodes check response codes
     * @param defaultError error to throw id status code validation fails
     */
    private static async call<T>(
        method: HttpMethod,
        apiPath: ApiPath | string,
        requestConfig: AxiosRequestConfig = {},
        refreshTokenAllowed = true,
        validStatusCodes = [HttpStatusCode.Ok, HttpStatusCode.NoContent, HttpStatusCode.Created, HttpStatusCode.Accepted, HttpStatusCode.NotModified],
        defaultError = ErrorConst.InternalError,
    ): Promise<AxiosResponse<T>> {
        const response = await ApiService.httpClient.request({
            ...requestConfig,
            method: method,
            url: ApiService.apiUrl + apiPath,
            validateStatus: (status) => status < 600,
        } as AxiosRequestConfig);

        if (response.status >= HttpStatusCode.InternalServerError) {
            console.log(
                `requestMethod=${method}`,
                `requestConfig=${SerializationUtils.safeStringify(requestConfig)}`,
                `apiPath=${apiPath}`,
                `refreshTokenAllowed=${refreshTokenAllowed}`,
                `responseCode=${response.status}`,
                `responseData=${SerializationUtils.safeStringify(response.data)}`,
            );
            throw new ApiError(ErrorConst.InternalError, SerializationUtils.safeStringify(response.data));
        }

        // validate other response codes
        if (!_.includes(validStatusCodes, response.status)) {
            throw new ApiError(_.get(response.data, "error", defaultError), SerializationUtils.safeStringify(response.data));
        }
        return response;
    }
}
