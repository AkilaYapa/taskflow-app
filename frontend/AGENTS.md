# TaskFlow DevOps Learning Project

This is a learning project for practicing DevOps step by step.

## Project goal

Build a simple full-stack task management application using:

- React TypeScript frontend
- ASP.NET Core Web API backend
- Docker
- Docker Compose
- Jenkins CI/CD
- GitHub Webhooks
- Later Kubernetes

## Current phase

We are currently working only on the frontend.

Do not create backend, Docker, Jenkins, Docker Compose, Kubernetes, database, authentication, or deployment files yet unless I specifically ask.

## Frontend rules

Frontend is located in:

frontend/

Use this structure:

frontend/src/
- api/
- components/
- pages/
- types/

Keep the frontend beginner-friendly but clean.

Do not add external UI libraries yet.
Do not add Redux.
Do not add React Router yet.
Do not add Tailwind CSS yet.
Use plain CSS for now.

## Current frontend goal

Create a clean React TypeScript frontend for TaskFlow with:

- Task list
- Create task form
- Dashboard summary cards
- Status filter
- Priority filter
- Local mock API using localStorage
- Shared TypeScript types

## Important learning style

Explain changes clearly.
Make small changes.
Do not rewrite the whole project unless needed.
After every change, run:

npm run build

Fix TypeScript/build errors before finishing.

## Git workflow

After a successful change, I will review the files manually before committing.
Do not commit automatically unless I ask.