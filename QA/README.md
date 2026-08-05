# QA Documentation

This folder contains all Quality Assurance (QA) deliverables for the **Cafe / Restaurant Online Ordering System** project.

The QA process focused on validating application functionality, increasing test coverage, and demonstrating the use of AI-assisted test generation alongside manual testing.

---

# QA Deliverables

| Document | Description |
|----------|-------------|
| TEST_CASES.xlsx | Manual functional, validation, negative, and edge-case test cases. |
| TEST_EXECUTION_REPORT.xlsx | Execution results of all manual test cases, including pass/fail status and remarks. |
| TEST_COVERAGE_REPORT.md | Summary of application modules tested and overall functional coverage. |
| AI_TEST_GENERATION.md | Documentation describing how ChatGPT was used to assist in generating additional test scenarios and improving test coverage. |
| BUILD_LOG.md | Development and QA activities completed throughout the project lifecycle. |

---

# Testing Scope

The following modules were tested:

- Home Page
- Menu
- Shopping Cart
- Checkout
- Order Tracking
- Admin Dashboard
- Input Validation
- Database Operations
- API Endpoints
- User Interface (UI)
- Browser Compatibility
- Performance & Error Handling

---

# Testing Approach

The QA process included:

- Manual Functional Testing
- Input Validation Testing
- Boundary Value Testing
- Negative Testing
- UI Testing
- API Testing
- Database Verification
- Browser Compatibility Testing
- Exploratory Testing

---

# AI-Assisted Testing

ChatGPT (OpenAI) was used as a supporting QA tool to:

- Generate manual test cases
- Suggest positive and negative test scenarios
- Create validation and boundary-value test cases
- Identify edge cases
- Improve overall test coverage
- Assist in preparing QA documentation

All AI-generated test cases were manually reviewed and executed before being included in the final documentation.

---

# Automated Testing

The project also includes automated tests using:

- **Vitest** – Unit and API testing
- **Playwright** – End-to-end (E2E) testing

Automated tests complement the manual QA process by validating critical application workflows.

---

# QA Summary

| Metric | Result |
|---------|--------|
| Total Manual Test Cases | 30 |
| Passed | 30 |
| Failed | 0 |
| Blocked | 0 |
| Overall Functional Coverage | 100% (planned manual test scope) |

> **Note:** The coverage percentage above refers to the planned manual testing scope. It is not an automated code coverage metric.

---

# Repository Structure

```text
QA/
├── README.md
├── BUILD_LOG.md
├── AI_TEST_GENERATION.md
├── TEST_COVERAGE_REPORT.md
├── TEST_CASES.xlsx
└── TEST_EXECUTION_REPORT.xlsx
```

---

# Conclusion

The QA activities verified the application's core customer and administrative workflows through a combination of manual testing, automated testing, and AI-assisted test generation. The documented test execution and coverage demonstrate that the implemented features were tested systematically and are considered ready for deployment.