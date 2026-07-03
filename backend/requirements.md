# Project Management System (PMS)
## Software Requirements Specification (SRS)

Version: 1.0
Project Name: ProjectPilot (Working Name)
Technology Stack:
- Backend: Rust (Axum)
- Frontend: HTML, CSS, JavaScript
- Database: PostgreSQL
- Operating System: Ubuntu Linux (WSL for Development)
- Cloud Platform: Google Cloud Platform (GCP)

---

# 1. Project Overview

The Project Management System (PMS) is a SaaS-based web application that enables organizations to manage projects, tasks, employees, milestones, risks, reports, and team collaboration.

The system will support multiple companies using a multi-tenant architecture and provide AI-powered project insights.

---

# 2. Project Objectives

- Manage projects efficiently
- Track tasks and milestones
- Improve team productivity
- Generate reports automatically
- Provide AI-based project insights
- Support multiple organizations
- Deploy as a SaaS product

---

# 3. Target Users

## Super Admin

Responsibilities:
- Manage platform
- Manage subscriptions
- Monitor companies

## Company Admin

Responsibilities:
- Manage company
- Manage users
- Manage projects

## Project Manager

Responsibilities:
- Create projects
- Assign tasks
- Monitor progress

## Team Lead

Responsibilities:
- Manage team
- Update project progress

## Employee

Responsibilities:
- Work on assigned tasks
- Update task status

## Client

Responsibilities:
- View project progress
- Access reports

---

# 4. Functional Requirements

## 4.1 Authentication Module

Features:

- User Registration
- Login
- Logout
- Forgot Password
- Reset Password
- Change Password
- Email Verification
- JWT Authentication
- Session Management

---

## 4.2 Company Management

Features:

- Create Company
- Update Company
- Delete Company
- Manage Subscription Plan
- Company Dashboard

Fields:

- Company Name
- Email
- Address
- Contact Number
- Subscription Plan

---

## 4.3 User Management

Features:

- Add User
- Update User
- Delete User
- Assign Roles
- Search Users
- View User Activity

Fields:

- Name
- Email
- Phone Number
- Role
- Department

---

## 4.4 Role Management

Roles:

- Super Admin
- Company Admin
- Project Manager
- Team Lead
- Employee
- Client

Permissions:

- Create
- Read
- Update
- Delete

---

## 4.5 Project Management

Features:

- Create Project
- Update Project
- Delete Project
- Archive Project
- Search Project
- Project Dashboard

Project Fields:

- Project Name
- Description
- Start Date
- End Date
- Budget
- Status
- Priority

Project Status:

- Planning
- Active
- On Hold
- Completed
- Cancelled

Priority:

- Low
- Medium
- High
- Critical

---

## 4.6 Task Management

Features:

- Create Task
- Assign Task
- Reassign Task
- Update Task
- Delete Task
- Search Task
- Task Comments
- Task Attachments

Task Status:

- Pending
- In Progress
- Review
- Completed

Fields:

- Task Name
- Description
- Assigned User
- Due Date
- Status

---

## 4.7 Milestone Management

Features:

- Create Milestone
- Update Milestone
- Delete Milestone
- Track Progress

Fields:

- Milestone Name
- Due Date
- Status

---

## 4.8 Risk Management

Features:

- Create Risk
- Update Risk
- Risk Assessment
- Risk Tracking

Risk Levels:

- Low
- Medium
- High
- Critical

Fields:

- Risk Name
- Description
- Severity
- Impact

---

## 4.9 Notification Module

Features:

- Email Notifications
- Task Assignment Alerts
- Project Alerts
- Deadline Alerts
- Milestone Alerts

---

## 4.10 Reporting Module

Features:

- Project Reports
- Employee Reports
- Task Reports
- Risk Reports
- Performance Reports

Export:

- PDF
- Excel
- CSV

---

## 4.11 Audit Logs

Features:

- User Activity Tracking
- Login History
- Project Changes
- Task Changes

---

## 4.12 Search Module

Features:

- Search Projects
- Search Tasks
- Search Users
- Search Reports

---

## 4.13 File Management

Features:

- Upload Files
- Download Files
- Delete Files

Supported Files:

- PDF
- DOCX
- XLSX
- PNG
- JPG

---

# 5. Non-Functional Requirements

## Performance

- Page load time < 2 seconds
- API response time < 500ms

## Scalability

- 1000+ Companies
- 100000+ Users

## Security

- Password Hashing (bcrypt)
- JWT Authentication
- HTTPS
- Role Based Access Control
- SQL Injection Protection
- XSS Protection
- CSRF Protection

## Reliability

- Daily Backups
- Disaster Recovery Plan

## Availability

- 99.9% Uptime

## Maintainability

- Modular Architecture
- Reusable Components
- Clean Code Standards

---

# 6. System Requirements

## Operating System

- Ubuntu Linux 24.04 LTS

## Backend

Language:
- Rust

Framework:
- Axum

Libraries:
- Tokio
- SQLx
- Serde
- JWT
- bcrypt

---

## Frontend

Languages:
- HTML5
- CSS3
- JavaScript

Libraries:
- Bootstrap
- Chart.js

---

## Database

- PostgreSQL

---

## Cache

- Redis

---

## Storage

- Cloud Storage

---

## Version Control

- Git
- GitHub

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions

---

# 7. Database Design

Tables:

1. companies
2. roles
3. users
4. projects
5. tasks
6. milestones
7. risks
8. notifications
9. audit_logs
10. attachments

---

# 8. AI Features (AI Agent)

## AI Project Assistant

Examples:

- Show delayed projects
- Show overdue tasks
- Generate weekly report
- Show team performance

---

## AI Project Summary

Generate:

- Project Summary
- Sprint Summary
- Team Summary

---

## AI Risk Prediction

Predict:

- Project Delays
- Budget Overruns
- Resource Shortages

---

## AI Workload Analysis

Analyze:

- Employee Workload
- Team Capacity
- Resource Allocation

---

## AI Meeting Summary

Input:

- Meeting Notes
- Meeting Transcript

Output:

- Summary
- Action Items
- Risks

---

## AI Project Health Score

Parameters:

- Progress
- Budget
- Risks
- Team Productivity

Output:

- Healthy
- Warning
- Critical

---

# 9. SaaS Features

## Multi-Tenant Architecture

Each company has isolated data.

Example:

Company A
- Projects
- Users
- Tasks

Company B
- Projects
- Users
- Tasks

---

## Subscription Plans

### Free

- 5 Users
- 2 Projects

### Starter

- 25 Users
- Unlimited Projects

### Business

- Unlimited Users
- AI Features

---

# 10. Cloud Platform Recommendation

Recommended Cloud Platform:

Google Cloud Platform (GCP)

Services:

- Cloud Run
- Cloud SQL PostgreSQL
- Cloud Storage
- Vertex AI
- Cloud Monitoring
- Cloud CDN

Architecture:

Frontend
    |
Cloud CDN
    |
Cloud Run
(Rust Backend)
    |
Cloud SQL PostgreSQL
    |
Redis
    |
Vertex AI

Reasons:

- Excellent Rust support
- Managed PostgreSQL
- Easy AI integration
- Automatic scaling
- Startup-friendly pricing

---

# 11. 5-Week Development Plan

## Week 1 - Foundation

Day 1
- Install Rust
- Install PostgreSQL
- Setup Project Structure

Day 2
- Create Database
- Create Tables
- Database Design

Day 3
- User Registration API

Day 4
- Login API
- Password Hashing

Day 5
- JWT Authentication
- Role Management

Deliverables:
- User Registration
- Login
- JWT Security

---

## Week 2 - Project Module

Day 6
- Create Project API

Day 7
- Update Project API

Day 8
- Delete Project API

Day 9
- Project Listing API

Day 10
- Project Dashboard

Deliverables:
- Complete Project Module

---

## Week 3 - Task Module

Day 11
- Create Task API

Day 12
- Assign Task API

Day 13
- Update Task Status

Day 14
- Task Comments

Day 15
- Milestones

Deliverables:
- Complete Task Management

---

## Week 4 - Frontend Development

Day 16
- Login Page

Day 17
- Dashboard

Day 18
- Project Pages

Day 19
- Task Pages

Day 20
- Reports Page

Deliverables:
- Responsive UI

---

## Week 5 - Launch Preparation

Day 21
- Notifications

Day 22
- AI Assistant Integration

Day 23
- Testing

Day 24
- Bug Fixing

Day 25
- Documentation

Day 26
- Domain Purchase

Day 27
- Cloud Deployment

Day 28
- SSL Setup

Day 29
- Monitoring

Day 30
- Production Launch

Deliverables:
- Market-Ready MVP

---

# 12. Future Enhancements (Version 2)

- Mobile Application
- Advanced AI Forecasting
- Resource Optimization
- Sprint Planning AI
- Meeting Recording Analysis
- Kanban Boards
- Gantt Charts
- Billing Automation

---

# Final Goal

Launch a professional AI-powered SaaS Project Management System built using:

- Rust
- Axum
- PostgreSQL
- HTML
- CSS
- JavaScript
- Google Cloud Platform

Target Launch Timeline:
30 Days