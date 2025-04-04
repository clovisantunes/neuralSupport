# Development Plan - AI-Powered Technical Support and Diagnosis SaaS

## 📅 Project Structure

### 🔍 Overview
This SaaS allows customers to report technical issues, receive automatic AI-based diagnostics, and, if necessary, create support tickets for specialized assistance.

### 🔧 Technologies Used
- **Back-End:** NestJS + Prisma + PostgreSQL
- **Front-End:** Next.js + Tailwind + React Hook Form
- **Authentication:** JWT
- **Database:** PostgreSQL
- **AI for Diagnosis:** OpenAI API or Hugging Face
- **WhatsApp Integration:** Twilio or WhatsApp Business API

## 🗂 System Structure

### 1. User Registration and Management
The system will have three types of users:

| User Type    | Permissions                         |
|-------------|----------------------------------|
| Administrator | Create technicians and companies |
| Technician   | Respond to tickets, track status |
| Client      | Create tickets, select company   |

### 2. Registration Rules

- **Administrator:**
  - Can create companies and technicians.
  - When creating a technician, they are automatically linked to the administrator's company.

- **Technician:**
  - Can only be created by an administrator and is always linked to the administrator’s company.

- **Client:**
  - Registers independently.
  - Selects a company from the list in the Front-End.

### 3. Database Structure

#### `users` Table (Users)

| ID | Name   | Password (Hash) | Type (Admin/Technician/Client) | Company_ID (FK) |
|----|--------|----------------|--------------------------------|----------------|
| 1  | Clovis  | (hash)         | Administrator                 | 1              |
| 2  | Dandara | (hash)         | Technician                    | 1              |
| 3  | Client  | (hash)         | Client                        | 2              |

#### `companies` Table (Companies)

| ID | Name        | Administrator_ID (FK) |
|----|------------|----------------------|
| 1  | ClovisTI   | 1                    |
| 2  | Other Co.  | 4                    |

#### `tickets` Table (Support Tickets)

| ID | Client_ID (FK) | Company_ID (FK) | Technician_ID (FK) | Issue Description      | Status     |
|----|--------------|----------------|------------------|--------------------|------------|
| 1  | 3            | 2              | 2                | "Laptop won’t turn on" | In Review |

## 🔧 Key Features

### 1. AI-Powered Support Flow

1. **Client initiates a support request:**
   - Describes the issue (e.g., "My laptop won’t turn on").

2. **AI analyzes and suggests solutions:**
   - Based on a database of common issues.
   - Example: "Check if the charger is properly connected."

3. **If the issue persists, the client can create a technical support ticket:**
   - The system automatically generates the following details:
     - Client
     - Company
     - Type of Support
     - Issue
     - Issue Description (Based on AI conversation)

### 2. Authentication
- Uses JWT for login and authentication.
- Route protection based on user type.

### 3. Ticket Management
- Clients create support tickets describing the issue.
- AI analyzes the issue and suggests automatic solutions before the ticket is submitted.
- If AI cannot resolve the issue, a technician is assigned to respond.

### 4. Dashboard
- Technicians can view pending tickets and respond.
- Clients can track the status of their support requests.

## 💡 Next Steps
✅ Develop the back-end with NestJS + Prisma
✅ Implement authentication with JWT
✅ Create APIs for users and companies
✅ Develop API for support tickets
🔜 Integrate OpenAI for automatic suggestions
🔜 Develop the Front-End


