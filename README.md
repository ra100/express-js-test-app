# Node.js tracker

This is test app that processes web request and writes data to database and
json file.

## Assignment

Create a Node.js application that

-   Responds only on a HTTP route `/track`.

-   Reads the data from request. (There are multiple options: pick the one you
    seem fit.)

-   Appends the data to a JSON file

-   If there is a `count` parameter in the data, the application increments the
    `count` value in a database by the value of given `count` parameter. (The
    database can be redis, mongodb, mysql, ... pick yourself).

-   Has one or more unit test

## Installation and running

You will need nodejs and mongodb server.

Clone the repository, open folder and install modules:

```sh
git clone git@github.com:ra100/express-js-test-app.git
cd express-js-test-app
npm install
```

Run tests:

```sh
npm run test
```

If everything is fine, run the app:

```sh
npm run app
```

## Usage

Configuration is in `app/config.js`, you can change default port (`1337`),
database connection uri, table name and path to json file.

By default app runs on port `1337`, open browser
[http://127.0.0.1:1337/track](http://127.0.0.1:1337/track), every other path
will return Not Found status 404.

You can use GET or POST request to send data to `/track`.

### GET /track

You can pass parameters to this request,
e.g. `/track?log=caladan&count=1&data=atreides`.
This will be appended t oarray in json file and will increase count
value in database by values passed in parameter.

### POST /track

You can pass data to this request, e.g.:

```json
{
    "log": "Caladan",
    "count": 1,
    "house": "Atreides"
}
```

This will be appended to array in json file and will increase count
value in database by values passed in parameter.
