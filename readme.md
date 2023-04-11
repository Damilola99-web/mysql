#### Start application

> npm start

#### Edge case

- [x] User cannot transfer to himself
- [x] User cannot transfer to non-existing user
- [x] User cannot transfer more than his balance (insufficient balance)
- [x] User cannot transfer negative amount
- [x] Cash back on all withdrawals
- [x] Redis cache for user profile AND STATISTICS
- [x] You cannot transfer more than 1000 USD without being a premium user

---

- [x] Added joi validation - fail fast principle
- [x] Clean table before creating new tables in order to avoid foreign key constraint error
- [x] Overdraft limit for premium users
- [x] Transaction history with pagination
- [x] handle `unhandled` exceptions e.g if your port is already in use
- [x] Implementing account freeze or suspen sion for suspicious account activity by administrators [rbac ]

---

### TODO

- [x] Implementing two-factor authentication for secure transactions
- [x] Setting transaction limits based on user account type (e.g. savings, checking, business)
- [x] Handling currency exchange rates and conversions for international transactions
- [x] Implementing a transaction timeout to prevent unauthorized access or fraud
- [x] Managing concurrent transactions to avoid race conditions and ensure data integrity
- [x] Handling failed transactions and providing appropriate error messages to users
- [x] Implementing transaction fees for certain types of transactions (e.g. international transfers, expedited transfers)
- [x] Handling edge cases related to transaction reversal or refund requests from users
- [x] Managing account closure and data retention policies in compliance with relevant regulations
- [x] Handling large transactions or transfers that may require additional verification or approval from the bank
- [x] Implementing transaction categorization or tagging for budgeting or expense tracking purposes
- [x] Handling scenarios where the user's bank account is compromised or hacked, and implementing appropriate security measures such as user authentication, password resets, and account recovery processes.

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

> KEYS \*

Make sure you start server
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3pd5hhpuz013p2xjs8v0.png)

# Delete a key in redis

> 127.0.0.1:6379> DEL "user:imi@gmail.com"
