# Report regression checks

Run `node --test tests/birth-date.test.cjs` for date parsing and age calculation.

Run `python tests/pdf_preview_server.py` to test against isolated data in `qa/data`.
The test server captures PDFs in `qa/pdf`; it does not alter production records.

Browser checks:

- Load example data, enter day 15, January, year 1976, save and reopen the report.
  Confirm 15/01/1976 and the age on the evaluation date in the PDF.
- Enter year 0076 or 76: saving/export must stop with a visible validation error.
- Change signature credentials in Configuration, save, reload, and verify persistence.
- Export the example at desktop and 390px mobile widths. Both should have four A4
  pages, natural logo proportions, readable results, and all signature credentials.
- Set all 14 ITS results to detected high, fill all 28 VPH CT fields, and add a
  70-line interpretation. Confirm 64 total result rows across continuations,
  every interpretation line, repeated table headings, and sequential page numbers.
  Every page must contain report content, without footer or signature overlaps.

Check captured PDFs with `python tests/check_pdf.py qa/pdf/report-N.pdf`.
For longer reports, supply `--pages N` with the expected page count. Render with
`pdftoppm -png` and inspect the actual exported pages, not just the HTML preview.
