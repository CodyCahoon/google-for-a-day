# google-for-a-day - UI

## Setup

### Prerequisites

| Library | Version | Install             | Check Version |
| ------- | ------- | ------------------- | ------------- |
| yarn    | 1.21.1  | `brew install yarn` | `yarn -v`     |

### Running

| Order | Command                      | Purpose                                               |
| ----- | ---------------------------- | ----------------------------------------------------- |
| 1     | `yarn install`               | Install any dependencies needed for build/development |
| 2     | `yarn start`                 | Starts the development server                         |
| 3     | Navigate to `localhost:3000` | View the running codebase in development mode         |

### Tests

To run unit tests: `yarn test`

## Codebase

### Prettier

This code base is formatted using prettier, and run as a pre-commit hook using husky
