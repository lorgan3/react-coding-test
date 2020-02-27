# React coding test

An admin panel that allows you to view and modify customers orders.

## Development

* Install dependencies: `yarn install`
* Start the development server: `yarn start`

* Run the tests: `yarn test`

* Create a production build: `yarn build`

## Plugging in a real API

All network related actions are placed in `Api.ts`. The content of every exported function can be replaced with a network call (with `fetch` for example) to an api that performs the same action.
The unexported functions are only there to emulate a real api and can be safely removed.

## Technologies

* **Create React app**: Used to bootstrap the project using the `typescript` template because it's easy setup and nice defaults.
* **redux-toolkit (+ redux, react-redux, redux-mock-store)**: Used because it reduces boilerplate code when working with redux.
* **react-router-dom**: Used to provide simple routing from the summary to the detail pages.