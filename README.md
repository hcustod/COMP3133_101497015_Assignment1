# COMP3133_101497015_Assignment1

## Tools/Tech Used

- Node.js
- Express
- GraphQL w Apollo Server
- MongoDB w Mongoose
- Cloudinary
- Multer
- express-validator
- Docker

## How To Run

1. Install dependencies:

```bash
npm install
```

2. Create `.env` using `.env.example` and fill in your values.
3. Start MongoDB (Docker):

```bash
npm run db:up
```

or directly with Docker Compose:

```bash
docker compose up -d mongodb
```

4. Start the server:

```bash
npm run start
```

5. Open GraphQL endpoint:
   `http://localhost:4000/graphql`

## Sample User Detail (Login Testing)

- Username: `final_user_1`
- Email: `final_user_1@example.com`
- Password: `asdf1234`
