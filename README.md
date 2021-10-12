# GitHub Verify Student

> Simple application is built with React hooks, context and Github API and OAuth 2.0 flow to authenticate and access to user's information

The API can be found [here](https://github.com/ginnyvt/verify-students-backend) with documented endpoints

## Usage

### Build and Manage OAuth Apps

More information about creating and manage 0Auth Apps can be found [here](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

### Environment variables

Create a .env file in the root folder and copy the following values

```bash
REACT_APP_CLIENT_ID=Your Client ID
REACT_APP_REDIRECT_URI=http://localhost:3000/callback
REACT_APP_SERVER_URL=http://localhost:8000
```

### Install Dependencies

```bash
npm install
npm start  # React :3000
```
