# Rackolas Distinctive Limited — Website

React (Vite) frontend + Node.js (Express) backend.

## Pages

- **Home**: hero, services, why us, projects, process, offices
- **About**: story, mission/vision, values, process
- **Services**: one section per service with a quote button
- **Projects**: filterable gallery with a lightbox
- **Contact**: phone/WhatsApp/email, quote form, office maps

## Before going live (TODO)

Edit `client/src/config.js` and set the client's real:

- `phone` and `phoneHref`
- `whatsapp` (digits only, e.g. `2348012345678`)
- `email`
- `hours`

Add more project photos to `client/public/images/`
and list them in `client/src/data.js`.

## Run locally

```bash
npm run install:all
cp server/.env.example server/.env

# two terminals
npm run dev:server   # API on :3500
npm run dev:client   # site on :5173 (proxies /api)
```

## Production (one server)

```bash
npm run install:all
npm run build        # builds client/dist
npm start            # Express serves site + API on PORT
```

### Free hosting on Render

`render.yaml` sets everything up. Push to GitHub, then on
Render: New > Blueprint > pick the repo > fill the env vars.

Free plan notes:
- Sleeps after 15 min idle; first visit after that takes
  about a minute to wake up.
- The disk is wiped on restart, so `quotes.json` is not
  permanent. New quotes are emailed via Brevo instead.
- SMTP is blocked on the free plan, so use Brevo (below).

## API

| Method | Path          | Notes                                  |
| ------ | ------------- | -------------------------------------- |
| GET    | `/api/health` | Health check                           |
| POST   | `/api/quotes` | Quote form (validated, rate-limited)   |
| GET    | `/api/quotes` | Admin list, header `x-admin-token`     |

## Email notifications

Free (works on Render free): create a Brevo account,
verify a sender email, create an API key, then set
`BREVO_API_KEY`, `MAIL_FROM` and `NOTIFY_EMAIL`.

On a paid host or VPS you can use `SMTP_*` instead.
