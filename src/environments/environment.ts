// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: { [index: string]: any } = {
    production: false,
    apiUrl: 'http://localhost:8888/portal/api',
    dateFormat: 'dd/MM/yyyy',
    currencyISO: 'USD',
    version: '1.0.0',

    pageSize: 10,

    langMap: {
        en: 'en_US',
        fr: 'fr_FR',
        ru: 'ru_RU'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
