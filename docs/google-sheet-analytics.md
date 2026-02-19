# Google Sheet analytics setup

The game sends one row of analytics to a Google Sheet each time a player **reaches an ending** (Ram, Rolex, or alone).

---

## How it works (workflow)

1. **Player reaches an ending** (EpilogueRam, EpilogueRolex, or EpilogueAlone).
2. That passage runs: it updates session stats, then **displays the SendData passage**.
3. **SendData** puts the current run’s data (ram pts, rolex pts, who they chose, etc.) into a hidden `<div>`, then runs a small script.
4. The script calls **`window.sendToSheet(payload)`** (defined in Story JavaScript).
5. **`sendToSheet`** does a **POST** request to your **Google Apps Script web app URL** with that payload as JSON.
6. The **Apps Script** `doPost(e)` receives the JSON, parses it, and **appends one row** to the active sheet.

So: **no URL in the game = no request.** **403 from script.google.com = the web app is rejecting the request (usually permissions).**

---

## 1. Create the sheet and headers

1. Create a new Google Sheet (or use an existing one).
2. In **row 1**, add these column headers (one per cell):
    - player_id, ram_pts, rolex_pts, total_pts, times_chose_ram, times_chose_rolex, times_alone, replays, last_passage, completions, session_starts, chose_this_run

## 2. Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Delete any sample code and paste the contents of `Code.gs` (in this folder).
3. Save (Ctrl+S) and give the project a name (e.g. "Who Stole My Heart analytics").

## 3. Deploy as web app (this is what fixes 403)

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → **Web app**.
3. Set:
   - **Description:** e.g. "Analytics endpoint"
   - **Execute as:** Me (your account)
   - **Who has access:** **Anyone** ← must be this. If it’s "Only myself", the game’s request is not you, so Google returns **403 Forbidden** and nothing is updated.
4. Click **Deploy**, authorize the app when asked, then copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

If you already deployed with "Only myself", do **Deploy → Manage deployments → Edit (pencil) → change "Who has access" to Anyone → Deploy**. Use the same URL in the game; no need to change it.

## 4. Connect the game

1. Open `source/main.twee`.
2. Find the passage **Story JavaScript** (near the top).
3. Replace the empty URL with your web app URL:

   ```js
   window.GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```

4. Rebuild the game (e.g. run your Tweego task) and play to an ending; a row should appear in the sheet.

## Columns explained

| Column | Meaning |
|--------|--------|
| player_id | Random 7-digit ID for this session (same for all rows from one player/session) |
| ram_pts | Ram love points at end of that run |
| rolex_pts | Rolex love points at end of that run |
| total_pts | ram_pts + rolex_pts |
| times_chose_ram | Total times this session they’ve gotten Ram’s ending |
| times_chose_rolex | Total times this session they’ve gotten Rolex’s ending |
| times_alone | Total times this session they’ve gotten the alone ending |
| replays | Number of times they’ve clicked “Play again” so far |
| last_passage | Passage name when they finished (e.g. EpilogueRam) |
| completions | Total completions this session |
| session_starts | Number of times they’ve started a run (from title) |
| chose_this_run | Who they chose this run: `ram`, `rolex`, or `alone` |

**Note:** All “session” counters reset if the player closes the tab or refreshes; they are per browser session only.

---

## Troubleshooting

| What you see | What to do |
|--------------|------------|
| **403 Forbidden** when the game hits an ending | The web app is not allowed to run for anonymous requests. In Apps Script: **Deploy → Manage deployments → Edit** the web app → set **Who has access** to **Anyone** → Save. Then try again. |
| Nothing happens / no row in the sheet | 1) Rebuild the game (Tweego) after pasting the URL. 2) In the sheet, **Extensions → Apps Script → Executions**: play to an ending and see if an execution appears; if it errors, open it. 3) Confirm row 1 has the exact header names (e.g. `ram_pts`, `rolex_pts`, ...). |
| CORS or "Failed to load resource" for the script URL | A 403 will show as "Failed to load resource". Fix by setting **Who has access** to **Anyone** on the web app deployment (see above). |
