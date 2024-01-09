HOWTO MONGODB

CREATE DB SOMEHOW

docker exec -it kontenerID bash
cd /usr/bin
./mongosh -u root -p example
use fishing-forum
db.createUser({user: 'fishing-admin', pwd: 'super-secret', roles: [{role: 'readWrite',db:'fishing-forum'}]})