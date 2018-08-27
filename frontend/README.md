## Instructions to Run

First, you will need to start both backend APIs that support this app: `answers-api` and `questions-api`. So, go to their directories and follow the instructions there.

After running starting both, you will have to come back here and issue the following commands:

```bash
# from the frontend directory
npm install

# define env vars pointing to APIs
export REACT_APP_QUESTIONS_API=http://localhost:3001
export REACT_APP_ANSWERS_API=http://localhost:3002

# start the server
npm start
```
