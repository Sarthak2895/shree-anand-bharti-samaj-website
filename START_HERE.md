# Shree Anand Bharti Samaj Website — Final Setup

This package includes:

- Navy-blue + heritage-gold website theme
- Official themed logo
- English + Marathi pages
- 12 department background illustrations already connected to the department cards
- Public Gallery upload form (no visitor login)
- **Gallery approval workflow:** upload -> pending -> administrator review -> published/rejected
- Administrator-only login and Gallery moderation dashboard
- Digital Library article / research-paper publishing
- Supabase private Storage for Gallery images and Library PDFs
- Google Search Console verification metadata preserved

## 1. Open the correct folder

Open the folder that directly contains `package.json` in VS Code.

Run:

```bat
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Configure Supabase

Open Supabase -> SQL Editor -> New query.

Copy the complete contents of:

```text
supabase/schema.sql
```

Paste it into Supabase and click **Run**.

Confirm:

- Table Editor -> `gallery_items`
- Table Editor -> `publications`
- Storage -> `gallery-media`
- Storage -> `library-documents`

The Storage buckets remain private.

## 3. Create `.env.local`

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY=YOUR_SECRET_KEY
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_FACEBOOK_URL=
```

Never expose `SUPABASE_SECRET_KEY` in frontend code or screenshots.

Restart the development server after changing `.env.local`.

## 4. Create the administrator account

In Supabase:

```text
Authentication -> Users -> Add user -> Create new user
```

Use the **same email address** that you entered as `ADMIN_EMAIL` in `.env.local`.

Set a strong password and confirm the user.

Administrator login page:

```text
http://localhost:3000/admin/login
```

Gallery approval dashboard:

```text
http://localhost:3000/admin/gallery
```

Only the account whose email exactly matches `ADMIN_EMAIL` can use the moderation API.

## 5. Test the Gallery approval workflow

1. Open `http://localhost:3000/gallery` without signing in.
2. Submit an image.
3. The success message should say the image is waiting for approval.
4. In Supabase -> Table Editor -> `gallery_items`, confirm its `status` is `pending`.
5. The image must **not** appear in the public Gallery yet.
6. Sign in at `/admin/login`.
7. Open `/admin/gallery`.
8. Preview the pending image.
9. Click **Approve & publish**.
10. Refresh `/gallery`; the image should now appear publicly.
11. If you click **Reject**, it stays private and does not appear publicly.

## 6. Department images

The 12 included images are already stored here:

```text
public/images/departments/
```

and referenced from:

```text
data/departments.ts
```

No extra department-image setup is required.

## 7. Vercel deployment

In Vercel -> Project -> Settings -> Environment Variables, add:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `ADMIN_EMAIL`
- `NEXT_PUBLIC_INSTAGRAM_URL` (optional)
- `NEXT_PUBLIC_FACEBOOK_URL` (optional)

For production use:

```env
NEXT_PUBLIC_SITE_URL=https://shree-anand-bharti-samaj-website.vercel.app
```

Then deploy from this exact project folder:

```bat
npm run build
npx.cmd vercel link
npx.cmd vercel --prod --force
```

When `vercel link` asks for a project, choose your existing `shree-anand-bharti-samaj-website` project.

## 8. Important security behavior

- Public visitors do not log in.
- Public visitors may submit Gallery images.
- New Gallery images are saved with `status = pending`.
- Pending/rejected files remain private.
- Only `status = published` items are served to the public Gallery.
- The administrator authenticates with Supabase Auth.
- The server checks the authenticated email against `ADMIN_EMAIL` before allowing moderation.
- `SUPABASE_SECRET_KEY` is used only in server-side Route Handlers.

For a large public launch, add CAPTCHA/rate limiting to the upload endpoint to reduce spam.
