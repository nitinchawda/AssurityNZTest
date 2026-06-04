# Test Execution Guide

Complete guide for setting up and running the Carbon Credits API test suite.

## Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- Git (to clone the repository)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/nitinchawda/AssurityNZTest.git
cd AssurityNZTest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

This downloads the browsers needed for testing. Only required once.

## Running Tests

### Basic Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:ui` | Interactive test UI |
| `npm run test:debug` | Step-by-step debugging |
| `npm run test:report` | Generate HTML report |

### Run Specific Tests

```bash
# Run specific file
npx playwright test tests/carbon-credits.spec.ts

# Run tests matching pattern
npx playwright test -g "Acceptance Criteria"

# List all tests
npx playwright test --list
```

### Advanced Options

```bash
# Run with trace
npx playwright test --trace=on

# Run sequentially (not parallel)
npx playwright test --workers=1

# Run with screenshots on failure
npx playwright test --screenshot=only-on-failure

# Verbose reporter
npx playwright test --reporter=verbose
```

## Understanding Test Output

### Console Output
```
✓ tests/carbon-credits.spec.ts:Acceptance Criteria (500ms)
✓ tests/carbon-credits.spec.ts:Edge Cases (400ms)
✓ tests/carbon-credits.spec.ts:Negative Cases (300ms)
✓ tests/carbon-credits.spec.ts:Data Consistency (250ms)

4 passed (2.5s)
```

### HTML Report

After running tests, view results:

```bash
npm run test:report
```

The report shows:
- ✓ Passed tests
- ✗ Failed tests with details
- Execution time
- Screenshots/videos for failures

## Test Categories

### Acceptance Criteria (3 tests)
Validates the core requirements:
- AC1: Name = "Carbon credits"
- AC2: CanRelist = true
- AC3: Gallery promotion description contains required text

### Edge Cases (3 tests)
Validates response structure and data types:
- Required fields presence
- Valid response structure
- Correct data types

### Negative Cases (5 tests)
Tests error handling and validation:
- Invalid category ID returns error
- Gallery promotion exists
- Case-sensitive name matching
- CanRelist is not false
- Null/empty value rejection

### Data Consistency (1 test)
Verifies stable API responses across requests
