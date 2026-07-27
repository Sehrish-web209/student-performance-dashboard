# 🎓 React Array Methods Lab: Student Performance Dashboard

Welcome to the **Student Performance Dashboard Lab**! This assignment is designed to give you practical, hands-on experience with core JavaScript Array methods inside a modern React application.

You will work with a simulated industry workflow: **forking a repository**, **implementing state logic to satisfy strict unit tests**, achieving **100% test coverage**, and **submitting your work via a Pull Request (PR)**.

---

## 🎯 Learning Objectives

By completing this lab, you will master:

- **Array Search & Selection:** `find()`, `findLast()`, `findIndex()`, `findLastIndex()`
- **Array Transformation & Filtering:** `filter()`, `slice()`, `splice()`
- **Array Aggregation:** `reduce()`, `forEach()`
- **Array Iteration Checks:** `some()`, `every()`
- **Queue & Stack Mutation:** `push()`, `unshift()`, `pop()`, `shift()`
- **Testing & Coverage:** Reading **Vitest** output and achieving 100% statement, branch, function, and line coverage.

---

## ⚠️ Important Rules

> [!IMPORTANT]
>
> 1. **Only modify `src/StudentDashboard.jsx`**: Do **not** edit test files or component props unless explicitly instructed.
> 2. **Do not alter test files**: The test suite inside `src/__tests__/StudentDashboard.test.jsx` is your source of truth and contains **100% expected coverage**. Your job is to complete the component code to pass every test.
> 3. **Preserve immutability**: Always create updated copies of state arrays before mutating them (e.g., `const updatedList = [...students];`) when working with React state setters.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Step 1: Fork & Clone the Repository

- Click the **Fork** button in the top-right corner of this repository page to create a copy under your GitHub account.

  ![Press Fork button to initiate fork process](./public/how-to-fork-repository-01.png)

- Fill in the details for your copy of the repository.

  ![Fill in the details and submit the repository form](./public/how-to-fork-repository-02.png)

- Clone your forked repository to your local machine by running following terminal commands:

   ```bash
   git clone https://github.com/shaizCodes/student-performance-dashboard.git
   cd student-performance-dashboard
   ```

### Step 2: Install Dependencies

- Install the required packages using `npm`:

    ```bash
    npm install
    ```

### Step 3: Run the Development Server

- To launch the app in your browser with Vite HMR:

    ```bash
    npm run dev
    ```

## 🧪 Running Tests & Verifying Coverage

This project uses **Vitest** with V8 code coverage instrumentation.

### Run Tests in Watch Mode

- Use this during development to see live feedback as you complete each task:

    ```bash
    npm run test:watch
    ```

### Run Tests with 100% Coverage Verification

- Before submitting, verify that all test cases pass with 100% coverage across all metrics:

    ```bash
    npm run test:coverage
    ```

- Your final coverage report in the terminal should look like this:

    ```text
    ----------------------|---------|----------|---------|---------|-------------------
    File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    ----------------------|---------|----------|---------|---------|-------------------
    All files             |     100 |      100 |     100 |     100 |                   
     StudentDashboard.jsx |     100 |      100 |     100 |     100 |                   
    ----------------------|---------|----------|---------|---------|-------------------
    ```

## 📝 Assignment Tasks Overview

All tasks are marked with `// TODO:` comments inside `src/StudentDashboard.jsx`.

| Task                             | Array Method Focus                        | Description                                                                                        |
| -------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------- |
| Task 1: Directory Logging        | `forEach()`                               | Iterate through the student list and log student directory details in the formatted string layout. |
| Task 2: Grade Filtering          | `filter()`                                | Dynamically filter the displayed student list based on the user-selected grade option.             |
| Task 3: Search & Lookup          | `find()`, `findLast()`                    | Implement a student lookup by roll number and find the last student who achieved a Grade "A".      |
| Task 4: Deletion by Roll Number  | `findIndex()`, `splice()`                 | Locate a student's array index by roll number and safely remove them from the list.                |
| Task 5: At-Risk Lookup           | `findLastIndex()`                         | Identify the index of the last student flagged as "at-risk" in Chemistry (score < 40).             |
| Task 6: Status Banners           | `some()`, `every()`                       | Compute boolean status flags to display low-score warning alerts or high-performing class banners. |
| Task 7: Class Analytics          | `reduce()`                                | Calculate total scores and average class performance metrics across all subjects.                  |
| Task 8: Honor Roll               | `slice()`                                 | Extract a top 3 student preview from the sorted list without mutating the original array.          |
| Task 9: Stack & Queue Operations | `push()`, `pop()`, `unshift()`, `shift()` | Implement stack (LIFO) and queue (FIFO) controls to add and remove students dynamically.           |
| Task 10: Card Removal by Index   | `splice()`                                | Handle direct card removal from the dashboard UI using a target array index.                       |

## 📤 How to Submit Your Assignment

Once all tests pass and your coverage report shows 100%, follow these steps to submit your work:

### Step 1: Commit and Push Your Changes

  ```bash
  git add src/StudentDashboard.jsx
  git commit -m "feat(dashboard): complete array methods lab with 100% test coverage"
  git push origin main
  ```

### Step 2: Create a Pull Request (PR)

1. Go to your forked repository on GitHub.
2. Click `Pull requests`, then `New pull request` buttons.
3. Set the base repository to the original repository and the head repository to your fork.
4. Fill out the Pull Request Template completely, including your full name, and a screenshot of your 100% coverage report.

## 🛠️ Tech Stack & Tooling

- **Framework:** React
- **Build Tool:** Vite
- **Testing Framework:** Vitest + React Testing Library
- **Coverage Engine:** V8
- **Linter:** Oxlint

## Implementation Status

- All required array method tasks implemented.
- All tests passed.
- 100% statement, branch, function, and line coverage achieved.