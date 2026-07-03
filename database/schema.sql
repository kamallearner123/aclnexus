-- ==========================================
-- ProjectPilot PMS Database Schema
-- ==========================================

-- Companies Table
CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    subscription_plan VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles Table
CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(100)
);

-- Users Table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id),
    role_id INT REFERENCES roles(id),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id),
    project_name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks Table
CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    assigned_to INT REFERENCES users(id),
    task_name VARCHAR(255),
    status VARCHAR(50),
    due_date DATE
);

-- Milestones Table
CREATE TABLE milestones(
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    milestone_name VARCHAR(255),
    due_date DATE
);