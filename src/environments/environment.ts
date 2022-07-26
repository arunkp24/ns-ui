// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrls: {
    STATIONS: 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations',
    DEPARTURES: 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures'
  },
  nsSubscription: {
    key: 'Ocp-Apim-Subscription-Key',
    value: '9501613007cd41398976a63b0a5bd925'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
