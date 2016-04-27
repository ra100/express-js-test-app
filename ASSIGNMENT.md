# Node.js tracker

Create a Node.js application that

- Responds only on a HTTP route `/track`.
- Reads the data from request. (There are multiple options: pick the one you seem fit.)
- Appends the data to a JSON file.
- If there is a `count` parameter in the data, the application increments the `count` value in a database by the value of given `count` parameter. (The database can be redis, mongodb, mysql, ... pick yourself).
- Has one or more unit test
