-- Default Company

INSERT INTO companies
(company_name,email,subscription_plan)
VALUES
(
'APT Computing Labs',
'admin@aptcomputinglabs.com',
'Premium'
);

-- Default Roles

INSERT INTO roles(role_name)
VALUES
('Admin'),
('Manager'),
('Employee');