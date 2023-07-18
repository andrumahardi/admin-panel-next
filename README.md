# Getting Started

ERP Finance FE

## Pre Run Requirements

Local development

* Node Version: v16.19.1

## Run Local Development

```bash
# initiate .husky directory for linting and formatting before git commit
yarn prepare

# Runing local development
yarn start:dev
```


## Deploy 

```bash
docker build -t erp-web .

docker run -p 13300:3300 erp-web
```