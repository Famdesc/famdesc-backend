### API REST Guidelines

Please follow this guidelines as close as possible.


#### Authorization

All request to api must be authenticated using `Basic` or `Bearer` token in header.

<!-- TODO: In Development -->


#### `GET` Requests

Use `GET` to all requests for obtein data. These request should affect the state of the database in anyway. Eg:


```shell
# Example 
# get an user by id
curl -X GET '/users/:id' 

# get 10 users form 1st page where status is active or pending
curl -X GET '/users?limit=10&page=1status=active&status=pending'
```


#### `POST` Requests

Use `POST` to all request that somehow affect the state of the database or to execute actions like sending email to users.

```shell
# send email with secret code the user
curl -X POST '/auth/send-verify-email'

# create a new user
curl -X POST '/users'

# update user by id
curl -X POST '/users/:id'
```

#### Resources

Use always plural for all endpoints that makes reference to an entity o database table.

```shell
curl -X GET '/users'
curl -X GET '/users/:id'
curl -X GET '/users/:id/methods'
curl -X GET '/orders'
curl -X GET '/orders/:id'
...

# there some exceptions
curl -X GET '/auth/...'
curl -X GET '/healthz'
...
```


#### Paths

Use only `GET` and `POST` for all endpoints. Eg.

```shell
curl -X GET  '/users' # user list
curl -X GET  '/users/:id' # retrieve user
curl -X POST '/users' # create user
curl -X POST '/users/:id' # update user
curl -X POST '/users/:id/delete' # delete user
curl -X POST '/users/:id/upgrade' # upgrade user
...
```

#### Response

All responses should serialized using `json` format. Use always `snake_case` for all properties in `json` objects. ❌ DO NOT send `[]` in the root of the response body. For list use instead an object with `data` property since some endpoints might be needed some extra information. Eg.

```json
{
    "data": [...],
    "has_more": true // false when no more data can be retrieve with pagination.

    "next_page": "085...3ea", // if using cursor pagination.
    "next_page": 2, // if using traditional pagination.
    "next_page": "", // omit or leave it empty when no more data can be retrieved.
}
```

#### Errors

Use only `2xx`, `4xx` and `5xx` http status code for all the responses.

Use `2xx` for all satisfactory responses. Eg.

```shell
200 # for OK responses with data in body
201 # when new data is create
204 # when response's body is empty
...
```

Use `4xx` for any error or conflict generate from the user side.

```shell
400 # BAD REQUEST, user build malformed request or send some invalid data.
401 # UNAUTHORIZED, user send requets without any autentication form in header.
403 # ACCESS DENIED, user is authorized but is trying to access a resources with restricted access.
404 # user istryingto access to a resource that does not exists or he does not have enough permissions.
❌ 405 # METHOD NOT ALLOWED, use instead 404
409 # CONFLICT, request conflicts with the current state of the server. Eg. email is already used by another user.
...
```

Use `5xx` for any error or conflict generate from server side. Eg.

```shell
500 # INTERNAL SERVER ERROR, server crashed on unexpected way.
502 # BAD GATEWAY, server has a missconfiguration or third-party service is down.
504 # GATEWAY TIMEOUT, server or third-party service is taking to long to respond.
...
```

#### ERROR Codes

Declare and share somehow a list possible error codes for specificts errors. Eg.

| Error Code         | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `already_used`     | User is using either `email` or `phone` to create a new user that already exists. |
| `required_upgrade` | User is trying to access a feature that requied greater paid plan.                |
| `wrong_token`      | User is trying to verify `email` or `phone` with wrong secret code.               |
| `bad_credentials`  | User is trying to login with bad credentials                                      |
| `...`              | ...                                                                               |