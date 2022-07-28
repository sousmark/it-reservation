# UI Boilerplate
## Installation
* Pull/fetch the master branch
* Don't add this repo as remote

`npm install`

## Run
`npm start`

# Colors
Confirm actions -> `btn-primary`
* OK
* Continue
* Yes

Reject actions -> `btn-secondary`
* Cancel
* No

Success actions -> `btn-success`
Warning actions -> `btn-warning`
Alert actions -> `btn-danger`
Information actions -> `btn-info`

# Authentication
Should be managed in `environment.ts`
* Custom
* LDAP
* IDP
* OTP

# Environment

```
export const environment = {
  production: false,
  appVersion: 'V1',
  isMockEnabled: true,
  apiUrl: 'api',
  applicationName: 'APPLICATION NAME',
  applicationCode: 'APPN',
  authenticationMethod: 'LDAP', // LDAP || CUSTOM || OTP || IDP,
  snackbarDuration: (3*1000) 
};
```