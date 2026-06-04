# AssurityNZ Test Suite

Automated API testing for the TM Sandbox Carbon Credits Category endpoint using Playwright with TypeScript.

## Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/nitinchawda/AssurityNZTest.git
cd AssurityNZTest

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Debug tests
npm run test:debug
```

## Project Structure

```
AssurityNZTest/
├── tests/
│   └── carbon-credits.spec.ts    # Test suite
├── playwright.config.ts           # Playwright config
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
├── README.md                      # This file
└── TEST_EXECUTION_GUIDE.md        # Detailed guide
```

## Test Coverage

### Acceptance Criteria Tests
- ✓ Name equals "Carbon credits"
- ✓ CanRelist equals true
- ✓ Gallery promotion contains "Good position in category"

### Edge Cases
- Response structure validation
- Required fields presence
- Data type validation

### Negative Cases
- Invalid category ID handling
- Gallery promotion existence
- Case-sensitive name matching
- Null/empty value validation

### Data Consistency
- Cross-request validation

## API Endpoint

```
GET https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false
```

Expected response:
```json
{
  "Name": "Carbon credits",
  "CanRelist": true,
  "Promotions": [
    {
      "Name": "Gallery",
      "Description": "Good position in category..."
    }
  ]
}
```

## Available Scripts

```bash
npm test              # Run all tests
npm run test:headed   # Run with visible browser
npm run test:ui       # Interactive UI mode
npm run test:debug    # Debug mode
npm run test:report   # Generate HTML report
```

## Test Results

Run tests and view results:

```bash
# Generate and view HTML report
npm run test:report
```

The report will open in your browser showing pass/fail status for each test.

## Troubleshooting

**Tests not found:**
```bash
ls tests/  # Verify carbon-credits.spec.ts exists
```

**Connection timeout:**
```bash
# Check API is accessible
curl https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false
```

**Browser installation failed:**
```bash
npx playwright install --with-deps
```

## Documentation

- [Detailed Test Execution Guide](./TEST_EXECUTION_GUIDE.md)
- [Playwright Docs](https://playwright.dev/)

## Requirements

- Node.js v16+
- npm or yarn
