Run redis container
> docker run -d --name logan redis

run redis container with port mapping
> docker run -d --name logan -p 6379:6379 redis

Access redis container
> docker exec -it logan bash
> docker exec -it logan redis-cli

Get all keys
> KEYS *


Mkae sure you start server
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3pd5hhpuz013p2xjs8v0.png)

# Delete a key in redis
> 127.0.0.1:6379> DEL  "user:imi@gmail.com"