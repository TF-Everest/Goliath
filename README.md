# Goliath

Goliath is a Unit Management System for ARMA III MILSIM communities.
It is designed and built for [Task Force Everest](https://tf-everest.com) but should be an applicable solution to most other MILSIM / Realism communities.

## Development Environment

The Goliath system relies on MySQL and RabbitMQ to operate.

By default the repository contains a Docker Compose file that will allow the necessary resources to be created.
Once docker is installed ([Windows](https://docs.docker.com/docker-for-windows/install/) / [Mac OS](https://docs.docker.com/docker-for-mac/install/) )  you can run the following to start the necessary datastores:

```
docker-compose up -d
```

To run Goliath Node 9.3 is required on the system. It can be downloaded from [here](https://nodejs.org/dist/v9.3.0/).
Ensure that you have a correctly configured env file - a template can be found in .env.example

## Runtime considerations

Goliath is not designed to operate as a distributed or high scale application.
It makes several opinionated design decisions based on this such as the decision to run Cron tasks internally to the process.

