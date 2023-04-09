CREATE TABLE
    wallet (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        wallet_owner VARCHAR(255) NOT NULL UNIQUE,
        amount DECIMAL(10, 2) DEFAULT 0,
        balance DECIMAL(10, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );