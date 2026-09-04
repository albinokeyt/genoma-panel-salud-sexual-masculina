"""Validate captured PDFs. Requires pypdf and Pillow in the test environment."""

import sys
from pathlib import Path

from pypdf import PdfReader


for filename in sys.argv[1:]:
    path = Path(filename)
    pdf = PdfReader(path)
    assert len(pdf.pages) == 4, f"{path}: expected four pages"
    for index, page in enumerate(pdf.pages, 1):
        assert abs(float(page.mediabox.width) - 595.28) < 0.1
        assert abs(float(page.mediabox.height) - 841.89) < 0.1
        drawn_images = [args[0] for args, op in page.get_contents().operations if op == b"Do"]
        assert len(drawn_images) == 1, f"{path}, page {index}: missing report image"
        image = page.images[drawn_images[0]].image.convert("L")
        # Exclude the header/footer so a page containing only those cannot pass.
        body = image.crop((0, image.height * 0.12, image.width, image.height * 0.84))
        histogram = body.histogram()
        dark_pixels = sum(histogram[:180])
        assert dark_pixels > body.width * body.height * 0.002, f"{path}, page {index}: blank body"
    print(f"{path.name}: four A4 pages with report content")
