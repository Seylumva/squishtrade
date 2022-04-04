# Squishtrade

Squishtrade is my idea of the perfect marketplace for Squishmallow enthusiast. The hobby is filled with scalpers trying to take advantage of the scarcity of these items, making them harder to collect.

The primary hub for non-retail purchased Squishmallow is Mercari, where they can be seen listed for much higher price than what they retail.

Squishtrade is meant to be a moderated marketplace to connect real collectors who are trying to re-home, or adopt these squishes.

### Installation

First make sure you are at the root directory.

`npm run client` Starts up the React.js front-end.

`npm run server` Starts up the Express.js server connected to a MongoDB Atlas Database that you must provide in an `.env` file as `DB_URI`.

**Please provide the environment variables listed below before starting the server.**

`.env` Must contain at least the following environment variables:

- `DB_URI` provided by MongoDB Atlas
- `CLOUDINARY_URL` provided by Cloudinary
- `JWT_SECRET` to generate JSON Web Tokens

---

### Stack

This project uses React.js with React-Router v6 on the frontend, styled with TailwindCSS & DaisyUI, and Node.js with Express and MongoDB in the backend.

#### Warning

This is not meant to be a production ready application, it is meant to be a proof-of-concept with many optimizations and changes to be made before going live to the end-user.
