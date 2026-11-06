# QR Studio

QR Studio is a static, client-side QR code generator and designer. It uses no application server, account, database, analytics, remote font, or third-party API. QR content and uploaded logos are processed in the browser and are not saved.

## Features

- Seven QR content types: website, plain text, Wi-Fi, vCard contact, email, phone, and SMS.
- English, French, and Arabic interface; Arabic uses right-to-left layout.
- Live preview, design colors, dot and corner styles, optional local logo, and transparent export.
- PNG at 256, 512, 1024, or 2048 pixels and vector SVG downloads.
- Light and dark themes, responsive layout, keyboard focus support, and validation messages.
- Static QR codes: encoded content cannot be changed after the code is created. QR codes are not encrypted; anyone who scans one can read it.

## Run locally (Windows)

No Node.js or build step is needed to run the deployed site. For local testing, use Python's built-in static file server:

1. Install Python from [python.org](https://www.python.org/downloads/windows/) if it is not already installed.
2. Open PowerShell in this project folder.
3. Run `py -m http.server 8000`.
4. Visit `http://localhost:8000` in a modern browser.
5. Press `Ctrl+C` in PowerShell to stop the server.

Opening `index.html` directly as a `file:` URL may block JavaScript modules; use the local static server instead.

## Publish free with GitHub Pages (beginner-friendly)

1. Sign in or create a free account at [github.com](https://github.com/).
2. Select **New repository**, give it a name such as `qr-studio`, choose **Public**, and create the repository.
3. On the new repository page, choose **Add file → Upload files**. Upload the contents of this project folder (including `index.html`, `privacy.html`, `css`, `js`, `assets`, and `libraries`), then commit the files to the `main` branch.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then click **Save**.
5. Wait for the Pages deployment to finish. GitHub displays the public URL on the Pages settings screen. Open that URL and test the generator and privacy page.

GitHub Pages is a free static hosting option for public repositories under its published usage terms. No server-side setup or secrets are required. If the repository is private, verify your account's Pages eligibility before choosing it.

## Privacy and offline behavior

The site has no tracking, analytics, external fonts, remote icons, or calls to remote APIs. Its own HTML, CSS, JavaScript, and QR library are loaded from the static host. Once those files have loaded, QR generation and image processing work in the browser without a network connection. First-visit offline use is not promised because site files must be downloaded first. See [privacy.html](./privacy.html) for the full explanation.

Do not encode passwords, private keys, or sensitive personal data in a QR code you share publicly. A QR code is a readable format, not encryption.

## Testing notes

The project has no build system or third-party test framework dependency. If Node.js is available for development, run the built-in tests with `node --test tests\*.test.mjs`; Node.js is not needed to deploy or run the site. Also test all seven input formats, multilingual/special-character content, the preview, image upload/removal, transparent and colored output, all four PNG sizes, SVG output, language direction, keyboard access, and mobile layouts in your target browsers. Validate downloaded QR codes with a phone camera or independent decoder before print production. Do not treat visual preview alone as a scan test.

## Dependency

The QR encoder is bundled locally as `libraries/qrcode-generator.js` and `libraries/qrcode-generator-utf8.js`, from `qrcode-generator` version 2.0.4. Its license and attribution are in [LICENSES.md](./LICENSES.md). No runtime package manager is required.
