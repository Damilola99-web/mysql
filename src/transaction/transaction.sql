    CREATE TABLE
        transaction (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            wallet_id INT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            type VARCHAR(255) NOT NULL,
            balance DECIMAL(10, 2) NOT NULL,
            cashback DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (wallet_id) REFERENCES wallet(id)
        );