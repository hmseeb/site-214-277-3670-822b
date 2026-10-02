# J&R Garage Door Services, LLC — Website

A professional, responsive single-page website for **J&R Garage Door Services, LLC**
of Saginaw, Texas. Built with vanilla HTML, CSS and JavaScript — no build step and
no external dependencies.

> **Your Garage Door Repair Solution — Fast, Fair and Always There!**
> Call **214-277-3670**

## Overview

| Section | Description |
| --- | --- |
| Hero | Business name, tagline and primary calls to action (Call Now / Get a Quote) |
| Trust strip | Key service highlights (21-point tune-up, hours, local, fair pricing) |
| Services | Installation, Repair and Maintenance (21-point inspection & tune-up) |
| Why Us | Local story, feature list and business hours |
| Testimonials | Customer reviews |
| CTA band | After-hours / weekend call prompt |
| Contact | Phone, email, service area, hours and a LeadrVision-connected form |
| Footer | Navigation and contact recap |

## Project structure

```
.
├── index.html            # Single-page entry point
├── assets/
│   ├── styles.css        # Site styling (responsive, mobile-first breakpoints)
│   ├── script.js         # Mobile nav + form handling
│   ├── favicon.svg       # Favicon placeholder
│   ├── logo.jpg          # J&R company logo (from the original site)
│   ├── hero-garage-door.jpg
│   ├── repair-garage-door.jpg
│   ├── service-installation.jpg
│   └── service-maintenance.jpg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Forms — LeadrVision integration

The contact form posts to LeadrVision and is wired to work with **and without**
JavaScript:

- `action="https://vision.leadrai.com/api/forms/258cfdb145572542677393274e00d360"`, `method="POST"`.
- Hidden `_form` field names the form (`Contact`).
- Hidden `_page` field is set to `window.location.href` on load and travels with
  fetch submissions.
- Hidden `_gotcha` honeypot field catches bots.
- Every field has a human-readable `name` (`name`, `email`, `phone`,
  `Service needed`, `Message`). No file uploads, no `mailto:` actions, no
  third-party form services.
- A `fetch()` submission POSTs to the same URL and shows an inline
  "Thanks, your message was sent." confirmation on `{"ok": true}`.
- A plain (no-JS) submission returns to the page with `?submitted=1`, which
  reveals the same confirmation automatically.

## Local preview

```bash
python3 -m http.server 8080
# then open http://localhost:8080/
```

## Business details

- **Name:** J&R Garage Door Services, LLC
- **Phone:** 214-277-3670
- **Email:** info@jandrgaragesvcs.com
- **Service area:** Saginaw, TX — serving the greater Dallas–Fort Worth Metroplex
- **Hours:** Mon–Sat 6:00 am – 12:00 am · Sun by appointment
