# HOWTO MONGODB

```
docker exec -it kontenerID bash

cd /usr/bin
./mongosh -u root -p example

use fishing-forum
db.createUser({user: 'fishing-admin', pwd: 'super-secret', roles: [{role: 'readWrite',db:'fishing-forum'}]})
```

# API

## Auth

### POST /user/register

**Request**

```json
{
    "username": "test",
    "password": "test"
}
```

**Response**

```json
{
    "token": "jwttoken"
}
```

### POST /user/login

**Request**

```json
{
    "username": "test",
    "password": "test"
}
```

**Response**

```json
{
    "token": "jwttoken"
}
```