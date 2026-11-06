# RTJ

Next.js website for RTJ, with shared navigation, project filters and a contact form.

Run `npm install`, then `npm run dev`. Production preview: `npm run build` followed by `npm run start`.

Run `npm run lint` and `npm test` for checks. The tests use Node's TypeScript support (Node 22.6 or later; verified with Node 24).

## Host on Coolify

The included Dockerfile builds the standalone Next.js server with Node 24. It includes the website's images, fonts and static assets, runs as a non-root user, and checks the home page for container health.

1. Put this project in a Git repository and push it to GitHub or another Git provider. Include `Dockerfile`, `.dockerignore` and `package-lock.json`.
2. In Coolify, create an application from that repository on your connected server and select the branch to deploy.
3. Choose **Dockerfile** as the build pack, base directory `/`, Dockerfile location `/Dockerfile`, and exposed port `3000`. Leave host port mappings and build/start command overrides empty. The Dockerfile provides these commands.
4. Use Coolify's generated domain initially, or point your domain's DNS record at the server and configure its HTTPS URL in Coolify.
5. Click **Deploy**. Confirm the application becomes healthy, then open the domain and check Home, Work, Services, About and Contact.

No environment variables or email provider are required to host the website. Contact delivery and persistent submission storage are deferred; records saved inside the container will not survive container replacement without a storage mount.

To test the container locally when Docker is running:

```sh
docker build -t rtj .
docker run --rm -p 3100:3000 rtj
```

Open `http://localhost:3100`. The normal `npm run dev` workflow is unchanged.

Coolify references: [application settings](https://coolify.io/docs/applications/configuration/general) and [networking](https://coolify.io/docs/core/networking-in-coolify).

## Contact form

`POST /api/contact` validates and trims submissions, rejects unlisted services and filled honeypots, and returns success only after the inquiry is saved. Public retrieval is disabled. The browser retains entries after errors, prevents simultaneous submissions, and supports keyboard navigation and accessible field errors.

New inquiries are private JSON records in `data/inquiries/`. Existing records in `data/inquiries.json` remain intact. The data directory is excluded from version control. To use a different persistent directory, set the server-only `CONTACT_DATA_DIR` environment variable. Automated browser verification uses a temporary directory so it cannot change real inquiries.

Storage is local to the server; email notifications are not configured. A serverless deployment needs a hosted form service or persistent storage. Formspree is the proposed hosted option, pending the owner's form endpoint and recipient setup.

The contact email, real phone number and social links belong in `src/data/site.ts`. Phone and social links are hidden until real details are supplied. Project destinations are in `src/data/content.ts`.
