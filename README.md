# eduManage — Student Management System

## 1. Project Overview

**eduManage** is a student management system frontend developed using React and Bootstrap. It is designed to provide a simple and user-friendly interface for accessing student information and navigating academic management features.

The project demonstrates React components, routing, API requests, form validation, and handling loading and error states.

### Main Features

- **Home page:** Introduces the eduManage application.
- **Students page:** Displays a list of students retrieved from a JSON Server API.
- **Student Details page:** Displays information about an individual student.
- **Add Student page:** Provides a form for entering student details and validating required fields.
- **About page:** Explains the purpose and goals of eduManage.
- **Login and registration pages:** Provide the interface for student and teacher registration and login.

> Note: The Add Student form is currently a prototype. It validates the entered information but does not save student records to the API.

## 2. Technologies Used

- **React:** Builds the user interface using reusable components.
- **Vite:** Provides the development server and frontend build tools.
- **React Router DOM:** Handles navigation between pages.
- **Bootstrap:** Provides responsive layouts and styling.
- **Bootstrap Icons:** Adds icons to the interface.
- **JSON Server:** Provides a simple REST API for student records.
- **React Hot Toast:** Displays success and error notifications where needed.

## 3. Project Setup and Installation

### Step 1: Open the project

Open a terminal and navigate to the project directory:

```bash
cd ~/my-react-app/student-web
```

### Step 2: Install dependencies

Run:

```bash
npm install
```

If any required packages are missing, install them using:

```bash
npm install react-router-dom react-hot-toast
npm install bootstrap-icons
```

### Step 3: Prepare the student database

Create or update `data/database.json` with sample student records.

Example:

```json
{
  "students": [
    {
      "id": "1",
      "name": "Amina Hassan",
      "email": "amina@example.com",
      "age": 19,
      "gender": "Female",
      "course": "Software Development"
    },
    {
      "id": "2",
      "name": "Brian Otieno",
      "email": "brian@example.com",
      "age": 21,
      "gender": "Male",
      "course": "Data Science"
    }
  ]
}
```

### Step 4: Start JSON Server

Open a terminal in the project directory and run:

```bash
npx json-server data/database.json --port 3000
```

The API should be available at:

- Student list: `http://localhost:3000/students`
- Individual student: `http://localhost:3000/students/1`

Keep this terminal running while using the application.

### Step 5: Start the React application

Open a second terminal in the project directory and run:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 4. Application Routes

The application uses React Router DOM to navigate between pages.

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/students` | Displays all students |
| `/students/:id` | Displays details of a selected student |
| `/add-student` | Opens the Add Student form |
| `/about-us` | Displays information about eduManage |
| `/login` | Login page |
| `/signup` | Registration page |
| `/student` | Student registration page |
| `/teachers` | Teacher registration page |

The `:id` portion of `/students/:id` is a dynamic route parameter. It changes according to the student selected.

## 5. Design Decisions — Assignment Section 9

### Question 1: What should `useFetch` accept as input, what should it return, and what happens when the input changes?

**Answer:**

The custom `useFetch` hook should accept a URL as its input. The URL tells the hook which API resource to request.

For example:

```jsx
const { data, loading, error } = useFetch(
  "http://localhost:3000/students"
);
```

The hook should return three values:

- **`data`:** The information received from the API.
- **`loading`:** A Boolean indicating whether the request is still in progress.
- **`error`:** An error message or error object if the request fails.

When the URL changes, the hook should automatically make a new request for the new resource. It should set `loading` to `true`, clear the previous error, and update `data` when the new request succeeds.

The hook should also handle network errors, unsuccessful HTTP responses, and component cleanup to prevent outdated requests from overwriting newer results.

This allows the same hook to be reused on different pages without duplicating the fetching logic.

**Example usage on the Students page:**

```jsx
const { data, loading, error } = useFetch(
  "http://localhost:3000/students"
);
```

**Example usage on the Student Details page:**

```jsx
const { data, loading, error } = useFetch(
  `http://localhost:3000/students/${id}`
);
```

The examples above show the intended interface of the custom hook. The `useFetch` hook must be implemented separately before these examples can run.

### Question 2: How does the Students page tell the Student Details page which student to display?

**Answer:**

The Students page uses a dynamic URL containing the selected student's unique ID.

For example, when a user selects a student whose ID is `1`, the application navigates to:

```text
/students/1
```

The Students page can create the link like this:

```jsx
<Link to={`/students/${student.id}`}>
  View Details
</Link>
```

The route is defined in the application's routing configuration:

```jsx
<Route
  path="students/:id"
  element={<StudentDetails />}
/>
```

The Student Details component then retrieves the ID from the URL using React Router's `useParams()` hook:

```