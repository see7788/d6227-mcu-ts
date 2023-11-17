export type i18n_object_t<T extends object> = {
    [K in keyof T]: T[K] extends Array<any>
    ? i18n_Tuple_t<T[K]>
    : T[K] extends object
    ? i18n_object_t<T[K]>
    : string;
};

type i18n_Tuple_t<T extends Array<any>> = {
    [K in keyof T]: T[number] extends Array<any>
    ? Array<string>
    : T[number] extends object
    ? i18n_object_t<T[number]>
    : string;
};