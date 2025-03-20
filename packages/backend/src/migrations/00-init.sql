-- Drop database if exists (useful for clean restarts)
DROP DATABASE IF EXISTS vistra;

-- Create database with proper character set and collation
CREATE DATABASE vistra
  CHARACTER SET = 'utf8mb4'
  COLLATE = 'utf8mb4_unicode_ci';

-- Use the database
USE vistra;

-- Grant privileges (if needed)
GRANT ALL PRIVILEGES ON vistra.* TO 'root'@'%';
FLUSH PRIVILEGES;
