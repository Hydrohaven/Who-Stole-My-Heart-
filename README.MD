# Who Stole My Heart!?
## Synopsis
TBD

## How to Play
1. Clone repo
2. Install Tweego [here](https://github.com/ChapelR/tweego-installer/releases)
3. Run VSCode and install the **Twee3 Lanaguage Tools extension**
4. Do `Ctrl+Shift+P` to open command palette and type in `Tasks: Run Tasks`, press enter
5. Open `index.html` in the browser, as it should be compiled now
6. Any subsequent changes you make after `Tasks: Run Tasks` should live update the game 
7. Run `Twee3 Language Tools: Show Story Map` to see story map

## Analytics (Google Sheet)
The game can send one row of play data to a Google Sheet each time a player reaches an ending. See **[docs/google-sheet-analytics.md](docs/google-sheet-analytics.md)** for setup: create the sheet, add the Apps Script (`docs/Code.gs`), deploy as web app, then paste the URL into the **Story JavaScript** passage in `source/main.twee` (`GOOGLE_SHEET_WEB_APP_URL`).

## Resources
- [Tweego Installation](https://joshuagrams.github.io/tiny-qbn/doc/tweego.html)

## Reason
A simple Twine project made for GDIM 131: Data Analytics for Interactive Media

## Contributors
Joshua Sullivan\
Justin Le\
Lina Nguyen