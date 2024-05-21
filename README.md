# AB Quest

Simple Rogue lite game with procedurally generated maps using perlin noise, local save system, and cloud saving. The frontend application is built using Vite, React, Typescript, Tailwind CSS, and Redux-toolkit for state management. The API for managing saved games is built using Typescript, Express, Prisma, and Zod for input validation.

Try the live [demo](http://ec2-34-216-78-119.us-west-2.compute.amazonaws.com/)

# Install

The game is containerized and will run on port 80. Run the following to start up a local instance

```
git clone https://github.com/geoffolson/ABQuest.git
cd ABQuest
docker compose up -d
```
