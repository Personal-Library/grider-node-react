# Emaily

## Description

This app allows users to send and collect feedback via email survey forms. The project was created for educational purposes during Stephen Grider's Node with React: Fullstack Web Development course on Udemy.

## Technologies

- React/Redux
- MaterializeCSS
- Express/Node
- MongoDB/Mongoose
- Sendgrid

## Installation

The project is separated into a frontend `client` directory and a backend root directory. In order to access and run either of them:

Clone the repository

`git clone git@github.com:Personal-Library/grider-node-react.git`

Appropriately replace keys in .env.production.example, .env.development.example, and dev.example.js

Run the following Ngrok command and use the forwarding address as your webhook url for SendGrid

`npx ngrok http 5000`

Change into the directory

`cd <directory name>`

Install dependencies

`npm install`

Start local development server

`npm run dev` for the backend or `npm start` for the frontend

## Usage

The user is able to authenticate using Google OAuth 2.0, pay for credits via the Stripe API, and use those credits to create survey forms that are sent out to recipients via SendGrid. The user is then able to view the results and status of their surveys.

## Contributing

This project is not accepting contributions. You are welcome to modify and distribute any versions as you please.

## License

MIT License
