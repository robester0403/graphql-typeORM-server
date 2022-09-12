# What this is

This repo is a basic setup of the modern graphQL typeORM Postgresql. It can be repurposed for other databases. The objective is to create a boilercode for databases and a generic non-optimized folder structure for future apps.

It would be good to note that at the point of this readme being written, the typeORM version has had updates so previously built queries may not work as expected.

## Installation

To install run "npm i"
To run "npm run dev"

To activate graphQL playground browser type "http://localhost:8000/graphql" or whatever port you are running on.

## Dev Notes

Note that a recently deprecated import of createConnection and should/will be changed to appSource as described by the new documentation.

## License

[MIT](https://choosealicense.com/licenses/mit/)
