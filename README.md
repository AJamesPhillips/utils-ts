
    npm install ajp/utils-ts --save

Then inside your project

    import {random_string} from "@ajp/utils-ts/random";

## Dev

You must use `npm install`, as `yarn` will (correctly) pull in v16 of @types/react for
@types/react-router and this will break everything.

### Tests

    $ npm run test
    $ npm run test:compile-only  # skips the npm install step and runs in watch mode

## To publish

After `$ npm test` passes.  `$ cd js && npm login`
Increase version in `js/package.json`
`npm publish`
