# College ERP

## Overview
This is a College ERP (Enterprise Resource Planning) system that allows faculty and students to manage various aspects such as subjects, student details, and assignments. The system is built with a React frontend and a Django backend.

- **Frontend URL:** [https://college-erp-omgv.onrender.com/](https://college-erp-omgv.onrender.com/)
- **Backend URL:** [https://joyful-determination-production.up.railway.app/](https://joyful-determination-production.up.railway.app/)
- 
## Login Credentials for Testing

### Faculty
- **Username**: `teacher2`
- **Password**: `123`

### Student
- **Username**: `student9`
- **Password**: `123`
## Features

- **Faculty Dashboard**: Allows faculty members to view and manage students, assign subjects, and create new subjects or students.
- **Student Dashboard**: Allows students to view their profile, enrolled subjects, and personal details.
- **Authentication**: Login functionality for both faculty and students.



## How to Use

1. **Frontend Access**: 
   - Open the frontend URL in your browser: [https://college-erp-omgv.onrender.com/](https://college-erp-omgv.onrender.com/).
   - Login as a faculty or student using the provided credentials.
   - Use the available dashboard options to navigate through the system.

2. **Backend Access**:
   - The backend API can be accessed at [https://joyful-determination-production.up.railway.app/](https://joyful-determination-production.up.railway.app/).
   - Ensure to use the correct endpoints for fetching or manipulating data (e.g., for fetching student details or assigning subjects).



## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Django, Django Rest Framework
- **Database**: PostgreSQL
- **Hosting**: Render (Frontend), Railway (Backend)

## Notes

- Ensure that you are logged in before accessing the respective features (Faculty or Student).
- The backend API is protected by authentication tokens, which should be included in the request headers.

