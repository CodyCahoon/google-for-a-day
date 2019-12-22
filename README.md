# google-for-a-day

## Purpose

A Google-like index and search application which allows a user to enter a url to index and then search for specific tokens from indexed sites

### Information

1. This index is done by exact (lowercase) match

## Setup

### Prerequisites

| Library | Version | Install             | Check Version |
| ------- | ------- | ------------------- | ------------- |
| yarn    | 1.21.1  | `brew install yarn` | `yarn -v`     |
| node    | 13.5.0  | `brew install node` | `node -v`     |

### Commands

```bash
# start client
cd client; yarn install; yarn start;

# start server
cd server; yarn install; yarn start;
```

## Testing

Both the client and server are tested using jest

### Commands

```bash
# test client
cd client; yarn test

# test server
cd server; yarn test
```
