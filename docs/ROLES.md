# MenuVerse — User Roles (Phase 1.1)

Four audiences exist in the product. Only two exist in code today; the other
two are documented so Phase 2 can add the role table without rework.

## Audiences

1. **Public visitors** — unauthenticated users on marketing pages
   (`/`, `/auth`) and the customer-facing dish viewer (`/view/:slug`).
2. **Signed-in customers** — end diners who scan a table card. Currently
   they are treated as public visitors; no login flow is exposed to them.
3. **Restaurant clients** — the account holder for a restaurant. Signs in
   at `/auth`, lands on `/dashboard`, and only sees the client portal:
   Dashboard, Menu Preview, Analytics, Table Cards, Update Requests,
   Settings, Support.
4. **MenuVerse administrators** — internal team that builds every menu.
   In Phase 2 they will access the production tools currently hidden:
   `/menu`, `/categories`, `/qr-codes` (temporarily redirected to
   `/dashboard` for all users).

## Current implementation (Phase 1.1)

- Auth: Supabase email + password only. Anonymous sign-up disabled server
  side would be ideal; still enabled today.
- Role storage: none. Every authenticated user is treated as a restaurant
  client and is bound to exactly one row in `public.restaurants` via the
  `handle_new_user` trigger.
- Internal-only routes are guarded at the route file with
  `beforeLoad: () => { throw redirect({ to: "/dashboard" }); }`. The code
  is preserved and will be re-enabled by an admin-only guard in Phase 2.

## Phase 2 migration plan

1. Add `app_role` enum (`admin`, `client`) and `public.user_roles` table
   scoped to `auth.uid()` per the platform's role guidance.
2. Create a `SECURITY DEFINER has_role(user_id, role)` function.
3. Extend `handle_new_user` to also insert `('client')` for every new user.
4. Manually seed `('admin')` rows for the MenuVerse team.
5. Replace the temporary `redirect` guards on `/menu`, `/categories`,
   `/qr-codes` with `has_role(auth.uid(), 'admin')` checks. Non-admins
   continue to land on `/dashboard`.
6. Add an `_admin` pathless layout so the admin portal grows without
   sprinkling role checks in every route.

No destructive schema migration is required in Phase 1.1. The
`handle_new_user` trigger keeps writing a `restaurants` row per signup;
Phase 2 will layer roles on top without breaking existing data.