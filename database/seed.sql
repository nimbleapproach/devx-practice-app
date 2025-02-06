-- Insert 10 user records
INSERT INTO users (username, email, password) VALUES
('user1', 'user1@example.com', 'scrypt:32768:8:1$vV7ZsNHGPxazft5x$7fddde419488c7062f9ed4fc368ad45d72bd2b797822279d2379ca1960fb8a36ef8704f3c289da77f1b02e2eb950a632c13bf32fa6c198233beb6c37d2b10b88'),
('user2', 'user2@example.com', 'scrypt:32768:8:1$ukTZFoi1CxsY0XBB$f01bae6b00b7e7a862462e34da0eb00eede7f9669e57b3937b8593b31f8302b384021c90750b1be50130bba7ed828fd3e58b77104cd341b2bb34de168eafb5af'),
('user3', 'user3@example.com', 'scrypt:32768:8:1$LtykHB59UE7z3a2d$e7a2ff2cbda50f34f7b42e6cb6d378e341b1a9ea478486e5f80f473d30a16698f5746d7bd0447247b5de3ba6adf7d62527a6171155ee92f3ff081f2cfa3480dc'),
('user4', 'user4@example.com', 'scrypt:32768:8:1$xCOlmeE7KL1MhxEC$072d6ba004ccbe318f212bd9bca48ed9167f87ae5b3cb8f12aa37ee7aa7615bb4d4554c40f95cbc02bb92f81f80f68926ec2748b727dc0cdd44e34331c52aa71'),
('user5', 'user5@example.com', 'scrypt:32768:8:1$HKUbhbQNVnvW45B2$01684f5a3338952ae00bccc111ab12cec8e5dbfd7d03fe6bf7190bf5896b5cf8a97c3fddb012978ffa26efc06eb8b10cbcac66b1d1ebfca5de231de39d5603d3'),
('user6', 'user6@example.com', 'scrypt:32768:8:1$yqlOUjzwgxxYGhG4$3cac874c1cc9c1e471b68db98af6c85d3c00852f0dbde99c465a00fb2e1d3a880326b982a79e4ec1c4450bd0866cd8d3267ca1a449cfefa93600b6dbf90beba3'),
('user7', 'user7@example.com', 'scrypt:32768:8:1$v6ML5QfsEKXLRIGj$5b5a813e8117cbc5f9c798ece1c22f40edc716b7aa429c82a5057dd1ac9ccd5de70600166cdbc5fa7954931eed6b8f090ea4a6efd2a1ef4ef98e38f3820e32fb'),
('user8', 'user8@example.com', 'scrypt:32768:8:1$HbbweP13wMLEorQP$f018448f48ed4286b5528eb782b444637af03bc7c7839ca249f6b63143a91d5cf14e58846bd77a4c704348dabf45be13aa9d68c77666d6f3ebb90828f39f289c'),
('user9', 'user9@example.com', 'scrypt:32768:8:1$Q1YBWVoQYKrS2dtj$2d059dd481df84b1e69db1db11634e4a8a8835110da5d6ba7aac7b8449b7f71f22c02d8da505d1b5f771930502ae21b52a4ae684197855f68fe88f1c909d2ed0'),
('user10', 'user10@example.com', 'scrypt:32768:8:1$bhUlzECJwTv502gA$8a8b24fbfd4181c5930762f459c811b446b403ecb47e1efc4efa56d987210c1bae5e1ffd64f68176b2aa0684542fe9f599cdfc6e9ef7ff1778a8ecaf2eba4b59'),
('testuser', 'testuser@example.com', 'scrypt:32768:8:1$9sxOlox0BtoiKQeV$d9271c470dbcee2d30e08a2fc5e568576d3a6b9c9fa595a20d249af7e13147af3f7a17457d8c6f469fb1027af971f8bf2d64de784c7187b2fe0cc4487d160901');

-- Insert 20 transactions for each user
DO $$
DECLARE
    user_id INTEGER;
    i INTEGER;
BEGIN
    FOR user_id IN 1..10 LOOP
        FOR i IN 1..20 LOOP
            INSERT INTO transactions (user_id, amount, description) VALUES
            (user_id, (RANDOM() * 1000)::NUMERIC(10, 2), 'Transaction ' || i || ' for user ' || user_id);
        END LOOP;
    END LOOP;
END $$;