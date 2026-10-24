# SOLOhome AI beta model

A responsive, installable preview of the proposed Tampa Bay household-operations experience. The sample household, maintenance schedule, bills, records, prices, vendors, devices and home-manager profile are fictional. Interactive demo changes stay in the tester's browser.

## Try the hosted demo

Open [the SOLOhome AI beta model](https://kcasino1331-collab.github.io/solohome-ai-beta/) on desktop or mobile. The Today page includes a short walkthrough. Use **Beta feedback** to save a response locally and download a JSON report; sharing it is up to the tester. The report is not automatically sent to the product team.

To run locally, open `index.html` or serve this folder over localhost (for example, `python -m http.server 8000`). There is no build step or package installation. On HTTPS or localhost, the browser can install the app and cache its shell for offline browsing after the first visit.

## Private tester beta setup

The optional invited-tester request feature uses Supabase Auth and a private Postgres table. It is **not active on the hosted demo until an owner configures a Supabase project**. With the empty values in `backend-config.js`, the app deliberately stays in demo-only mode.

An owner who already has a Supabase project can enable the private pilot:

1. In Supabase, create a project and configure its Auth email provider and allowed redirect/site URLs for the hosted Pages domain and any local test origin.
2. In the Supabase SQL editor, run `supabase-schema.sql`. It creates `public.beta_requests`, enables row-level security, allows each authenticated tester to read and submit only their own requests, and disallows tester updates/deletes.
3. Invite each tester's exact email address in Supabase Auth. The app requests a one-time code with account creation disabled, so arbitrary visitors cannot sign up.
4. Copy the project URL and the project's **publishable (anon) key** into `backend-config.js`. Never put a service-role key or other secret in this file or the public repository.
5. Publish the updated static files and test an invited account end-to-end before sharing the private beta sign-in.

After sign-in, testers can submit a short private household request and see only their own saved requests. Requests are not routed to staff automatically: the pilot team must review them in the Supabase dashboard. No vendor is contacted, work scheduled, payment taken, or service response promised. Sign-out clears the local browser session and attempts to invalidate the server session.

**Do not collect sensitive household information.** The request form asks testers not to enter an address, door code, password, account number or other sensitive personal data. The authenticated email and submitted request fields are stored by the configured Supabase project. Configure its access, retention and deletion practices appropriately before inviting anyone.

## What remains a simulation

All other app areas remain illustrative local demos. There is no live AI, smart-device connection, utility/biller integration, vendor search, payment, booking, service delivery or automatic feedback collection. Membership prices are proposed discussion assumptions, not validated offers or traction. The private request queue is a narrow pilot feature, not a production home-management service.
