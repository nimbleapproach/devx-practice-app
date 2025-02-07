# DevX Practice App

## Purpose

The purpose of this repo is to provide a (mostly) functional representative web application, but with a lack of good developer experience or set up that would enable DevOps practices. Whilst there is some documentation inside the various components it is far from comprehensive and getting a local setup running at all will require work.

## Application

This basic application features a number of components which together make up the application:

- `api` - a backend API service written in Python using the Flask framework
- `database` - scripts to set up a database schema for postgres and seed basic data
- `frontend` - a web frontend for the application written in Javascript using the NextJS framework
- `tests` - a Playwright test suite for end-to-end testing the application

Both the `api` and `frontend` components also contain test suites that can be used to test them in isolation.

Almost all code was produced using Copilot and should not be considered remotely production quality.
