#!/usr/bin/env python3
"""Extract brand/photo assets from the source PDF into public/images/.

Source: Company Profile SPE 2026.pdf (not shipped in this repo). The PDF exports
every embedded raster as a shared XObject reachable from every page, so we
target specific xrefs (found once via manual inspection of a contact sheet)
rather than trying to localize images per page.

Usage:
    pip install --user --break-system-packages pymupdf
    python3 scripts/extract-images.py /path/to/Company\\ Profile\\ SPE\\ 2026.pdf

Re-run whenever the source PDF changes and the xrefs below need to be
re-identified (dump every embedded image + a contact sheet, inspect visually,
update the XREF_MAP below).
"""

import sys
from pathlib import Path

import fitz
import numpy as np
from PIL import Image

PROJECT_ROOT = Path(__file__).resolve().parent.parent
IMAGES_ROOT = PROJECT_ROOT / "public" / "images"

# xref -> (relative output path, description)
XREF_MAP = {
    6: ("hero/hero-storage-tanker.jpg", "Cover hero: LPG spheres + Pertamina tanker (branded orange tint)"),
    17: ("about/jakarta-tower-portrait.jpg", "Jakarta HQ tower at night, portrait"),
    16: ("about/jakarta-tower-wide.jpg", "Jakarta HQ tower at night, wide"),
    36: ("locations/office-tower-square.jpg", "Jakarta HQ tower at night, square crop"),
    27: ("about/refinery-sunset.jpg", "Refinery towers at sunset (Vision/Mission)"),
    52: ("locations/storage-yard-overview.jpg", "Bojonegoro storage yard with tanker trucks"),
    55: ("locations/storage-yard-alt.jpg", "Bojonegoro storage yard, alternate angle"),
    43: ("fleet/fleet-tanker-road.jpg", "SGI-branded LPG tanker truck on the road"),
    54: ("fleet/fleet-yard-collage.jpg", "Projects history photo collage"),
    49: ("fleet/fleet-parked-pair.jpg", "Two tanker trucks parked in yard"),
    42: ("fleet/fleet-hino-worker.jpg", "Hino truck cab + worker at yard checkpoint"),
    44: ("fleet/fleet-hino-night.jpg", "Hino truck with tanker at dusk, portrait"),
    64: ("fleet/fleet-worker-dusk.jpg", "Worker with tanker at dusk, portrait"),
    58: ("storage-activity/control-room-collage.jpg", "Control room / SCADA / PLC panel photo collage"),
    62: ("storage-activity/iso-tank-loading.jpg", "ISO tank loading, workers, blue sky"),
    63: ("storage-activity/iso-tank-inspection.jpg", "ISO tank container inspection, workers on top"),
    46: ("storage-activity/tank-top-inspection.jpg", "Workers inspecting top of storage tank"),
    47: ("storage-activity/worker-hose-filling.jpg", "Worker filling with blue hose, portrait"),
    37: ("storage-activity/storage-yard-trucks.jpg", "Storage yard with trucks, clear sky"),
    45: ("storage-activity/storage-yard-empty.jpg", "Storage yard, green grass, shed"),
    48: ("storage-activity/storage-yard-wide.jpg", "Storage yard wide, trucks + building"),
    75: ("condensate/process-diagram.png", "Gas condensate process flow diagram (generic/non-branded)"),
    79: ("partners/petronas-facility.jpg", "Petronas petrochemical facility (supplier)"),
    80: ("partners/pcm-logo.png", "PCM buyer partner logo"),
    81: ("partners/wtc-logo.png", "Wira Tama Cemerlang (WTC) buyer partner logo"),
    82: ("partners/puma-logo.png", "PT Puma Pantura Persada buyer partner logo"),
    112: ("infographic/value-chain.png", "Branded 6-step gas-to-consumer value chain infographic"),
    115: ("decorative/worker-valve-icon.png", "Worker with valve wheel sticker illustration"),
    120: ("decorative/facility-isometric.png", "Isometric petrochemical facility illustration"),
}

# xref used as the source for the color-keyed transparent logo mark
LOGO_XREF = 121


def extract_named_assets(doc: "fitz.Document") -> None:
    for xref, (rel_path, desc) in XREF_MAP.items():
        base = doc.extract_image(xref)
        out_path = IMAGES_ROOT / rel_path
        out_path.parent.mkdir(parents=True, exist_ok=True)
        # Preserve original bytes for photos (jpeg); only the diagram/logo/infographic
        # assets are requested as .png in the map above even though the source is a
        # flat jpeg with no transparency — save via Pillow to get a real PNG container.
        if rel_path.endswith(".png"):
            img = Image.open(_bytes_io(base["image"]))
            img.save(out_path)
        else:
            out_path.write_bytes(base["image"])
        print(f"  {rel_path:55s} <- xref {xref:4d}  ({desc})")


def _bytes_io(data: bytes):
    import io

    return io.BytesIO(data)


def make_transparent_logo(doc: "fitz.Document") -> None:
    base = doc.extract_image(LOGO_XREF)
    img = Image.open(_bytes_io(base["image"])).convert("RGB")
    arr = np.array(img).astype(int)
    corner = arr[2, 2]
    diff = np.abs(arr - corner).sum(axis=2)
    # Feather alpha: fully transparent below 25, fully opaque above 70.
    alpha = np.clip((diff - 25) / (70 - 25) * 255, 0, 255).astype(np.uint8)
    rgba = np.dstack([np.array(img).astype(np.uint8), alpha])
    out = Image.fromarray(rgba, mode="RGBA")

    logo_dir = IMAGES_ROOT / "logo"
    logo_dir.mkdir(parents=True, exist_ok=True)
    out.save(logo_dir / "logo-mark.png")
    print(f"  logo/logo-mark.png{'':37s} <- xref {LOGO_XREF:4d}  (color-keyed transparent, full lockup)")

    # Icon-only crop (flame + circle, no wordmark) for favicon/apple-touch-icon use.
    alpha_channel = np.array(out)[:, :, 3]
    rows_with_content = np.where(alpha_channel[:260, :].max(axis=1) > 10)[0]
    cols_with_content = np.where(alpha_channel[:260, :].max(axis=0) > 10)[0]
    if len(rows_with_content) and len(cols_with_content):
        top, bottom = rows_with_content.min(), rows_with_content.max()
        left, right = cols_with_content.min(), cols_with_content.max()
        pad = 6
        icon = out.crop(
            (
                max(0, left - pad),
                max(0, top - pad),
                min(out.width, right + pad),
                min(out.height, bottom + pad),
            )
        )
        icon.save(logo_dir / "logo-icon.png")
        print(f"  logo/logo-icon.png{'':37s} <- xref {LOGO_XREF:4d}  (icon-only crop, no wordmark)")


def main() -> None:
    pdf_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
        "/home/fara/Downloads/Company Profile SPE 2026.pdf"
    )
    if not pdf_path.exists():
        raise SystemExit(f"Source PDF not found: {pdf_path}")

    doc = fitz.open(pdf_path)
    print(f"Extracting assets from {pdf_path.name} ...")
    extract_named_assets(doc)
    make_transparent_logo(doc)
    print("Done.")


if __name__ == "__main__":
    main()
