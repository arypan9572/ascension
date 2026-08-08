# Ascension

An RPG for your real life — quests, routines, a 7-stat life graph, a
verified honesty system, addiction recovery, and a local social layer.
Installable as an iOS/Android Home Screen app (PWA).

## Files

```
index.html      the whole app (single file, self-contained)
manifest.json   PWA manifest — name, icons, standalone display
sw.js           service worker — offline caching + local notifications
icons/          app icon set (16px favicon up to 1024px)
```

## Deploy to GitHub Pages (2 minutes)

1. Create a new GitHub repo and upload all the files above, keeping the
   folder structure (`icons/` must stay a subfolder next to `index.html`).
2. Repo → **Settings → Pages** → Source: `Deploy from a branch`, branch
   `main`, folder `/ (root)`. Save.
3. GitHub gives you a URL like `https://yourname.github.io/your-repo/`.
   That's your live app. No build step, no server.

## Add it to your iPhone Home Screen

Open the URL in **Safari** (must be Safari) → tap **Share** → **Add to
Home Screen** → **Add**. The app also detects this itself and shows an
in-app banner with these steps if you haven't installed it yet. Once
opened from the Home Screen it runs full-screen and unlocks notifications.

## What's new in this build

- **Accounts** — real sign-up/sign-in flow with a custom username, an
  avatar (pick an emoji or upload a photo), and an onboarding wizard that
  collects age/height/weight and starting goals (screen time limit,
  workouts/week, quests/day). Three demo accounts are pre-seeded
  (`Mara_Ascends`, `kenji.wisdom`, `quietstorm_`, password `demo`) so
  friending has someone to test against immediately.
- **Routines replace Reset** — Life Reset is now just one of several
  routine templates. Build routines (Morning, Night, custom) with tasks
  marked **required** or **optional** — required tasks protect your
  streak, optional ones don't. Each routine has a wake/trigger time; when
  the clock hits it, an alarm screen fires (with Snooze / Start Routine)
  plus a real notification if you've granted permission.
- **Streak Maintained / Streak Broken animations** — the app tracks the
  real date. On the first open of a new day, it checks whether yesterday's
  required quests and routine tasks were finished and plays a genuine
  streak-maintained or streak-broken animation before resetting the daily
  checklist.
- **Doomscroll shame check** — on open, if yesterday's mock screen time
  exceeds your goal, you get a small "you slipped up" moment (with a
  notification) instead of it just silently passing.
- **Recovery "I Failed" button** — sits next to the urge button; logs an
  explicit relapse with confirmation and resets that tracker's streak.
- **Friends** — search by username, send/accept requests, remove friends.
  Real for this device (works against the seeded accounts or any account
  created on the same browser); see the limitation note below for
  cross-device.
- **Prestige Themes** — original color-palette themes (not licensed
  artwork) inspired by Naruto, Vagabond, Vinland Saga, HxH, JoJo, The
  Climber, JJK, and Berserk, unlocked at increasing levels and equippable
  from Customization. Equipping one re-skins the app's accent color.
- **Export / Import save** — the practical stand-in for cloud sync on a
  static site: download a JSON save file, import it on another device.

## Notifications

Settings → Push Notifications requests real permission and can fire real
notifications via the service worker — quest reminders, routine alarms,
doomscroll call-outs — while the app is open or recently backgrounded
(the limit iOS itself imposes on PWAs). True scheduled push that arrives
with the app fully closed needs a backend (VAPID keys, a subscription
endpoint, something to trigger sends on a schedule) — not included in
this static site. `sw.js` already has the `notificationclick` handler
ready for it.

## What's real vs. simulated — read this before you assume something works

This is a fully interactive front-end; every button, quest, toggle, and
routine is real code, not a mockup. What it can't do, because no website
can:

- **Apple Health / HealthKit** — no remote API exists; only a native iOS
  app can read it.
- **Screen Time** — reading or managing it requires Apple's
  FamilyControls/DeviceActivity frameworks, which need a special
  entitlement Apple only grants to native apps.
- **Game Center** — GameKit is a native framework tied to an Xcode
  project and App Store listing.
- **Real iOS Home Screen widgets** — those need WidgetKit, a native app
  extension. This app can add its own *icon* to your Home Screen (that
  part is real); it can't add a WidgetKit widget.
- **LA Fitness** — has no public developer API at all, so no app
  (including native ones) can pull check-ins from them directly.

Everywhere the app "connects" to one of these, it's using realistic mock
data so you can see how the feature would behave. There's a full,
plain-language breakdown of this in-app: **Settings → Platform
Capabilities**.

Getting the real versions of any of the above requires wrapping this (or
rebuilding the relevant parts) as a native iOS app in Swift/SwiftUI, or a
hybrid shell like Capacitor/React Native, since those APIs simply aren't
exposed to web apps, PWAs, or App-Store-wrapped web views.

## Accounts, data, and privacy — the honest version

Accounts and all progress are stored in `localStorage` on the device —
there is no server, no password hashing, no real authentication. This is
a real, working system for a single device, and completely wrong to rely
on as if it were secure production auth. For actual multi-device accounts
with proper password security, the practical path is adding **Firebase
Authentication** or **Supabase Auth** (both have generous free tiers and
work from a static site with just their client SDK + your own project
keys — no backend server to run yourself). That's a genuine next step,
not implemented here since it needs your own project credentials.
