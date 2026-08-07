# Ascension

An RPG for your real life — quests, an evolving 7-stat life graph, a verified
honesty system, and addiction recovery. Installable as an iOS/Android home
screen app (PWA).

## Files

```
index.html        the whole app (single file, self-contained)
manifest.json      PWA manifest — name, icons, theme color, standalone display
sw.js               service worker — offline caching + local notifications
icons/              app icon set (16px favicon up to 1024px)
```

## Deploy to GitHub Pages (2 minutes)

1. Create a new GitHub repo and upload all the files above, keeping the
   folder structure (`icons/` must stay a subfolder next to `index.html`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
4. GitHub gives you a URL like `https://yourname.github.io/your-repo/`.
   Open it — that's your live app.

That's it. No build step, no server, no dependencies — it's a static site.

## Adding it to your iPhone Home Screen

1. Open the GitHub Pages URL in **Safari** (must be Safari, not Chrome —
   iOS only allows installing from Safari).
2. Tap the **Share** icon in the toolbar.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

The app also detects this itself: if it notices you're on iOS Safari and
haven't installed it yet, it shows an in-app banner with these same steps.
Once it's on your Home Screen and you open it from there, it runs
full-screen (no browser bar) and unlocks notifications.

## Notifications — what actually works here

- **Local notifications work today.** In Settings → Push Notifications,
  tapping the toggle asks for permission, then the app can show real
  notifications (via the service worker) while it's open or recently
  backgrounded — e.g. the "Send Test Notification" button.
- **iOS requirement:** notifications only work once the app has been added
  to the Home Screen and opened from there (iOS 16.4+). If you try to
  enable them from a regular Safari tab, the app will tell you to install
  it first.
- **What's *not* included:** true scheduled/server-sent push — a reminder
  that arrives tomorrow morning even if you never opened the app — needs a
  backend that sends Web Push messages (VAPID keys, a subscription
  endpoint, something to trigger the send on a schedule). This is a static
  site with no server, so that part isn't wired up. The service worker
  (`sw.js`) already has the `notificationclick` handler ready for it — you'd
  add a `push` event listener and a small backend (a Vercel/Cloudflare
  function, or a service like OneSignal) to complete it.

## Data & progress

Your quests, XP, streak, cosmetics, and settings are saved to
`localStorage` on the device, so progress survives closing and reopening
the app. It's per-device/per-browser — there's no account system or cloud
sync in this build.

## What's a prototype vs. real here

This is a fully interactive front-end — every button, quest, and toggle
does something real (the code is functional, not a mockup). What it's
*not* is a backend: there's no server, no real Apple Health/Screen Time
API access, and no database. Where the app "checks" your workout or app
activity, it's checking realistic mock data to demonstrate how the
verification system would behave — wiring it to real HealthKit/Screen
Time APIs requires a native iOS shell (Swift/SwiftUI or Capacitor/React
Native), since those APIs aren't available to plain web apps.
