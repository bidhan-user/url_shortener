# url_shortener

A simple URL shortener built with Express, Mongoose, and MongoDB.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Set `MONGO_URI` in `.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/url_shortener
BASE_URL=http://localhost:3000
```

3. Start the app:

```bash
npm start
```

## API

- `POST /shorten` with JSON body:

```json
{ "longUrl": "https://example.com" }
```

- `GET /:shortId` redirects to the original URL.
