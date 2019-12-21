# google-for-a-day

## Purpose

A Google-like index and search application which allows a user to enter a url to index and then search for specific tokens from indexed sites

## Setup

### Prerequisites

| Library | Version | Install             | Check Version |
| ------- | ------- | ------------------- | ------------- |
| yarn    | 1.21.1  | `brew install yarn` | `yarn -v`     |

### Running

#### Automated

#### Manually

| Order | Command                      | Purpose                                               |
| ----- | ---------------------------- | ----------------------------------------------------- |
| 1     | `yarn install`               | Install any dependencies needed for build/development |
| 2     | `yarn start`                 | Starts the development server                         |
| 3     | Navigate to `localhost:3000` | View the running code base in development mode        |

### Tests

To run unit tests: `yarn test`

## Codebase

### Prettier

This code base is formatted using prettier, and run as a pre-commit hook using husky
