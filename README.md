# KrakenFlex Back End Test

The application is aimed at retrieving outages and site-info from an KrakenFlex API endpoint, and post the filtered outages to the API.

More specifically:

- `retrieveOutages` retrieves all outages from the `GET /outages` endpoint
- `retrieveSiteInfoById` retrieves information from the `GET /site-info/{siteId}` endpoint for the site with the ID `norwich-pear-tree`
- `filterOutages` filters out any outages that began before `2022-01-01T00:00:00.000Z` or don't have an ID that is in the list of
  devices in the site information. For the remaining outages, it attaches the display name of the device in the site information to each appropriate outage
- `postOutages` sends this list of outages to `POST /site-outages/{siteId}` for the site with the ID `norwich-pear-tree`

## Testing

The application is unit tested using Jest and mocking all API calls and responses.

See Instructions.md for additional context and background

## How to run

- `npm install` in root folder

### Test

- `npm run test`

### Run application

- `npm run start`

Node version in use: v14.18.3
