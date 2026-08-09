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

- **No more fabricated stats.** New accounts genuinely start at Level 1, 0
  XP, 0 coins, 0-day streak — not the old demo account's numbers. The
  Statistics screen and Profile's weekly chart used to show invented
  sleep/mood/books-read/workout-volume data; that's gone. They now read
  from a real day-by-day history log the app builds as you actually use
  it (XP earned, quest completion %, required-routine completion %,
  recovery streak, money saved). A brand-new account correctly shows "not
  enough history yet" instead of a fake chart.
- **Real behavioral assessment, not self-rating.** The old "drag a slider
  to whatever number" heptagon setup is gone — onboarding now asks 7
  concrete behavioral questions (one per stat, e.g. "how many days a week
  do you move your body on purpose?") and scores your answers. You don't
  hand-pick your own numbers anymore.
- **Real time preferences.** 12-hour/24-hour format and timezone are
  collected at sign-up (timezone auto-detected via `Intl` — genuinely no
  location permission needed for this) and actually drive the clock,
  routine alarm times, and day-rollover logic app-wide. Both are also
  editable later in Settings.
- **Real notification + location permission flow.** Right after creating
  an account, the app requests real Notification permission (respecting
  iOS's Home-Screen-install requirement) and fires a genuine welcome
  notification once granted. Settings also has a real, honest Location
  Permission control (off by default, not required for anything critical
  — explicitly noted, since timezone already works without it).
- **Boot entrance animation.** On login, the Home screen's sections
  fade/scale/blur in staggered, like sheets of paper settling into place,
  with input blocked until it finishes.
- **Fixed nav bar overflow** — the Profile tab was clipping off the right
  edge on some widths; the nav bar now sizes all 6 tabs correctly.

- **Custom animation engines** — three effects adapted from a set of React
  reference components into plain JS (no build step needed):
  - **Fold-text reveal** — letters hinge-fold into place, 3D-flip style, on
    the "ASCENSION" wordmark at startup and on the Level-Up / Streak
    Maintained / Streak Broken overlays.
  - **Pixel-dissolve reveal** — a small canvas-based effect that
    materializes in pixel blocks, plays when a quest completes and when
    the Achievements screen opens (staggered across unlocked badges).
  - **Scroll-wheel picker** — a physics-based (exponential easing,
    drag/wheel/keyboard support) scrolling picker, replacing plain
    `<input>` controls for wake/wind-down time selection (onboarding +
    Routines) and the 7 stat self-rating sliders in onboarding.
- **Unit toggles** — height switches between cm and ft/in, weight between kg
  and lbs, right in the sign-up flow.
- **Real onboarding personalization** — a dedicated step asks what you want
  to work on (doomscrolling, nicotine, alcohol, etc.), your wake/wind-down
  times, and has you self-rate all 7 stats with sliders. Finishing sign-up
  actually builds your starting heptagon from those ratings, generates your
  Morning/Night routines around your chosen times, seeds your first quests
  from your goals, and creates a Recovery tracker for each thing you picked.
  Nothing about it is cosmetic — it's real starting data.
- **Real Apple Health data import** — Settings → Apple Health has an
  "Import your real Health data" card. Export your data from the iPhone
  Health app (profile icon → Export All Health Data), upload the .zip or
  .xml here, and the app parses your actual step counts and workouts
  client-side (via JSZip + a regex scan — no data ever leaves the device)
  and replaces the mock numbers with real ones. This is the one integration
  in this build that isn't simulated.
- **Accounts** — real sign-up/sign-in flow with a custom username and an
  avatar (pick an emoji or upload a photo). Three demo accounts are
  pre-seeded (`Mara_Ascends`, `kenji.wisdom`, `quietstorm_`, password
  `demo`) so friending has someone to test against immediately.
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
  app can read it live. The one real exception: iOS has a genuine
  "Export All Health Data" feature, and this app can parse that export
  file client-side — see Settings → Apple Health. That's real, not
  simulated.
- **Screen Time** — double-checked this specifically. Unlike Health, iOS
  has never shipped any export option for Screen Time data, manual or
  otherwise. The only API (DeviceActivity/FamilyControls, iOS 15+) is
  native-only, needs a special Apple entitlement, and by most native
  developers' own accounts doesn't hand over raw numbers even to apps that
  have it. There's genuinely no path from a website to this data.
- **Game Center** — GameKit is a native framework tied to an Xcode
  project and App Store listing.
- **Real iOS Home Screen widgets** — checked again specifically for this
  update: no change. WidgetKit is still native-only. Third-party apps like
  Widgy can screenshot a webpage into their own widget on a timer, but
  that needs the person to separately install that app and configure it —
  nothing this app can set up itself. What's real: this app's own icon on
  the Home Screen via "Add to Home Screen."
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

## About a real backend (server, cross-device accounts, DMs)

This came up directly: a real server with proper accounts and messaging
is genuinely buildable (Node/Express or similar + a database + WebSockets
for live messaging is a normal, well-understood stack) — it's just a
separate deliverable from this static site, since it needs somewhere to
run and a database to persist to. Per your own call to keep things local
for now, this build stays fully client-side. Say the word and I'll write
the actual server code (real auth with password hashing, a real
friends/DM system, deployable to something like Render/Railway/Fly.io)
as a follow-up rather than bolting it in half-finished here.

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
