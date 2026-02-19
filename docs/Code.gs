/**
 * Web app endpoint: receives POST with JSON body and appends one row to the sheet.
 * Deploy as: Deploy → New deployment → Web app → Execute as Me, Anyone.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var raw = e.postData && e.postData.contents ? e.postData.contents : '';
    var data = JSON.parse(raw);

    var row = [
      data.player_id || '',
      data.ram_pts || '',
      data.rolex_pts || '',
      data.total_pts || '',
      data.times_chose_ram || '',
      data.times_chose_rolex || '',
      data.times_alone || '',
      data.replays || '',
      data.last_passage || '',
      data.completions || '',
      data.session_starts || '',
      data.chose_this_run || ''
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
