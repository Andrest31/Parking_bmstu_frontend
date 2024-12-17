/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /**
   * Username
   * @maxLength 50
   */
  username?: string | null;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface Parking {
  /**
   * Id
   * Уникальный идентификатор парковки
   */
  id?: number;
  /**
   * Name
   * Название парковки
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Place
   * Местоположение парковки
   * @maxLength 25
   */
  place?: string | null;
  /**
   * Sports
   * Виды спорта, доступные на парковке
   * @maxLength 100
   */
  sports?: string | null;
  /**
   * Open hour
   * Часы открытия парковки
   * @min -2147483648
   * @max 2147483647
   */
  open_hour?: number | null;
  /**
   * Close hour
   * Часы закрытия парковки
   * @min -2147483648
   * @max 2147483647
   */
  close_hour?: number | null;
  /**
   * Image card
   * URL изображения парковки
   * @maxLength 200
   */
  image_card?: string | null;
  /**
   * Status
   * Статус парковки (активна/неактивна)
   */
  status?: true | false | null;
}

export interface Pass {
  /**
   * Id
   * Уникальный идентификатор заказа
   */
  id?: number;
  /**
   * User
   * Пользователь, сделавший заказ
   */
  user?: number | null;
  /**
   * Planned date
   * Запланированная дата заказа
   * @format date-time
   */
  planned_date?: string | null;
  /**
   * Planned deadline
   * Запланированный срок выполнения заказа
   * @format date-time
   */
  planned_deadline?: string | null;
  /**
   * Created at
   * Дата и время создания заказа
   * @format date-time
   */
  created_at?: string | null;
  /**
   * Sumbited at
   * Дата и время подачи заказа
   * @format date-time
   */
  sumbited_at?: string | null;
  /**
   * Accepted at
   * Дата и время принятия заказа
   * @format date-time
   */
  accepted_at?: string | null;
  /**
   * Status
   * Статус заказа
   */
  status: "draft" | "deleted" | "formed" | "completed" | "rejected";
}

export interface PassParking {
  /**
   * Id
   * Уникальный идентификатор позиции заказа
   */
  id?: number;
  parking?: Parking;
  /**
   * Quantity
   * Количество мест, забронированных в заказе
   * @min -2147483648
   * @max 2147483647
   */
  quantity?: number;
}

export interface PassDetail {
  /**
   * Id
   * Уникальный идентификатор заказа
   */
  id?: number;
  /**
   * User
   * Пользователь, сделавший заказ
   */
  user?: number | null;
  /**
   * Moderator
   * Модератор, проверивший заказ
   */
  moderator?: number | null;
  /**
   * Planned date
   * Запланированная дата заказа
   * @format date-time
   */
  planned_date?: string | null;
  /**
   * Planned deadline
   * Запланированный срок выполнения заказа
   * @format date-time
   */
  planned_deadline?: string | null;
  /**
   * Created at
   * Дата и время создания заказа
   * @format date-time
   */
  created_at?: string | null;
  /**
   * Sumbited at
   * Дата и время подачи заказа
   * @format date-time
   */
  sumbited_at?: string | null;
  /**
   * Accepted at
   * Дата и время принятия заказа
   * @format date-time
   */
  accepted_at?: string | null;
  /**
   * Status
   * Статус заказа
   */
  status: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /**
   * Completed at
   * Дата и время завершения заказа
   * @format date-time
   */
  completed_at?: string | null;
  /**
   * Rejected at
   * Дата и время отклонения заказа
   * @format date-time
   */
  rejected_at?: string | null;
  parkings?: PassParking[];
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutDelete
     * @request DELETE:/logout/
     * @secure
     */
    logoutDelete: (data: User, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "DELETE",
        body: data,
        secure: true,
        ...params,
      }),
  };
  parkings = {
    /**
     * No description
     *
     * @tags parkings
     * @name ParkingsList
     * @request GET:/parkings/
     * @secure
     */
    parkingsList: (params: RequestParams = {}) =>
      this.request<Parking[], any>({
        path: `/parkings/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление новой услуги
     *
     * @tags parkings
     * @name ParkingsCreateCreate
     * @request POST:/parkings/create/
     * @secure
     */
    parkingsCreateCreate: (data: Parking, params: RequestParams = {}) =>
      this.request<Parking, void>({
        path: `/parkings/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить информацию о парковке по ID
     *
     * @tags parkings
     * @name ParkingsRead
     * @request GET:/parkings/{id}/
     * @secure
     */
    parkingsRead: (id: number, params: RequestParams = {}) =>
      this.request<Parking, void>({
        path: `/parkings/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавить изображение к парковке
     *
     * @tags parkings
     * @name ParkingsAddImageCreate
     * @request POST:/parkings/{id}/add-image/
     * @secure
     */
    parkingsAddImageCreate: (
      id: string,
      data: {
        /**
         * Изображение парковки
         * @format binary
         */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Сообщение об успешной загрузке */
          detail?: string;
          /** URL загруженного изображения */
          image_url?: string;
        },
        void
      >({
        path: `/parkings/${id}/add-image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавить парковку в черновик заказа
     *
     * @tags parkings
     * @name ParkingsAddToDraftCreate
     * @request POST:/parkings/{id}/add-to-draft/
     * @secure
     */
    parkingsAddToDraftCreate: (
      id: string,
      data: {
        /** Количество */
        quantity?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Сообщение об успешном добавлении */
          detail?: string;
          /** Обновлённое количество */
          quantity?: number;
        },
        void
      >({
        path: `/parkings/${id}/add-to-draft/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление услуги по ID
     *
     * @tags parkings
     * @name ParkingsDeleteDelete
     * @request DELETE:/parkings/{id}/delete/
     * @secure
     */
    parkingsDeleteDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/parkings/${id}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменение услуги
     *
     * @tags parkings
     * @name ParkingsUpdateUpdate
     * @request PUT:/parkings/{id}/update/
     * @secure
     */
    parkingsUpdateUpdate: (id: number, data: Parking, params: RequestParams = {}) =>
      this.request<Parking, void>({
        path: `/parkings/${id}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags parkings
     * @name ParkingsUpdatePartialUpdate
     * @request PATCH:/parkings/{id}/update/
     * @secure
     */
    parkingsUpdatePartialUpdate: (id: number, data: Parking, params: RequestParams = {}) =>
      this.request<Parking, any>({
        path: `/parkings/${id}/update/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  passItems = {
    /**
     * @description Удалить позицию из заявки
     *
     * @tags pass-items
     * @name PassItemsDeleteDelete
     * @request DELETE:/pass-items/{pass_id}/{parking_id}/delete/
     * @secure
     */
    passItemsDeleteDelete: (passId: string, parkingId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/pass-items/${passId}/${parkingId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Обновить количество паркинга в заявке
     *
     * @tags pass-items
     * @name PassItemsUpdateUpdate
     * @request PUT:/pass-items/{pass_id}/{parking_id}/update/
     * @secure
     */
    passItemsUpdateUpdate: (
      passId: string,
      parkingId: string,
      data: {
        /** Новое количество паркинга */
        quantity?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/pass-items/${passId}/${parkingId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  passes = {
    /**
     * @description Получить список заявок с возможностью фильтрации по дате и статусу
     *
     * @tags passes
     * @name PassesList
     * @request GET:/passes/
     * @secure
     */
    passesList: (
      query?: {
        /**
         * Дата начала фильтрации (в формате YYYY-MM-DD)
         * @format date
         */
        start_date?: string;
        /**
         * Дата окончания фильтрации (в формате YYYY-MM-DD)
         * @format date
         */
        end_date?: string;
        /** Статус заявки (например, 'formed', 'completed', 'rejected') */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Pass[], any>({
        path: `/passes/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить информацию о заявке по ID
     *
     * @tags passes
     * @name PassesRead
     * @request GET:/passes/{id}/
     * @secure
     */
    passesRead: (id: number, params: RequestParams = {}) =>
      this.request<PassDetail, void>({
        path: `/passes/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Завершить или отклонить заявку
     *
     * @tags passes
     * @name PassesCompleteUpdate
     * @request PUT:/passes/{id}/complete/
     * @secure
     */
    passesCompleteUpdate: (
      id: string,
      data: {
        /** Новый статус заявки */
        status?: "completed" | "rejected";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/passes/${id}/complete/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Удалить заявку по ID
     *
     * @tags passes
     * @name PassesDeleteDelete
     * @request DELETE:/passes/{id}/delete/
     * @secure
     */
    passesDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/passes/${id}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Сформировать заявку
     *
     * @tags passes
     * @name PassesFormUpdate
     * @request PUT:/passes/{id}/form/
     * @secure
     */
    passesFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/passes/${id}/form/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Обновить поля заявки
     *
     * @tags passes
     * @name PassesUpdateUpdate
     * @request PUT:/passes/{id}/update/
     * @secure
     */
    passesUpdateUpdate: (id: number, data: Pass, params: RequestParams = {}) =>
      this.request<Pass, void>({
        path: `/passes/${id}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags passes
     * @name PassesUpdatePartialUpdate
     * @request PATCH:/passes/{id}/update/
     * @secure
     */
    passesUpdatePartialUpdate: (id: number, data: Pass, params: RequestParams = {}) =>
      this.request<Pass, any>({
        path: `/passes/${id}/update/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersRegisterList
     * @request GET:/users/register/
     * @secure
     */
    usersRegisterList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users/register/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request email ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersRegisterRead
     * @request GET:/users/register/{id}/
     * @secure
     */
    usersRegisterRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersRegisterUpdate
     * @request PUT:/users/register/{id}/
     * @secure
     */
    usersRegisterUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersRegisterPartialUpdate
     * @request PATCH:/users/register/{id}/
     * @secure
     */
    usersRegisterPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags users
     * @name UsersRegisterDelete
     * @request DELETE:/users/register/{id}/
     * @secure
     */
    usersRegisterDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/register/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
