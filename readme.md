#### Start application
> npm start


#### Edge case
- [x] User cannot transfer to himself
- [x] User cannot transfer to non-existing user
- [x] User cannot transfer more than his balance (insufficient balance)
- [x] User cannot transfer negative amount
- [x] Cash back on all withdrawals
- [X] Redis cache for user profile AND STATISTICS
- [x] You cannot transfer more than 1000 USD without being a premium user
- [x] Overdraft limit for premium users
- [x] Transaction history with pagination 
- [x] Added joi validation

<!-- localhost:8000/api/users/history?page=2&limit=2 -->
<!-- localhost:8000/api/users/history -->
#### Start a redis container
Run redis container
> docker run -d --name logan redis

run redis container with port mapping
> docker run -d --name logan -p 6379:6379 redis

Access redis container  
> docker exec -it logan bash
> docker exec -it logan redis-cli

OR

### Download redis 
> wget http://download.redis.io/releases/redis-5.0.5.tar.gz


Get all keys
> KEYS *


Make sure you start server
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3pd5hhpuz013p2xjs8v0.png)

# Delete a key in redis
> 127.0.0.1:6379> DEL  "user:imi@gmail.com"