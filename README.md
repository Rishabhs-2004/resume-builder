# Resume Builder

A smart and customizable web application for creating professional resumes with live preview, theme customization, QR code support, and PDF export.

## Live Demo

[View the live demo](https://rishabhs-2004.github.io/resume-builder/)

## Overview

Resume Builder helps users create polished resumes without manually formatting documents in Word or static templates. The application updates the resume preview in real time, supports visual customization, and allows users to export the final resume as a PDF.

This project is suitable for:

- students
- freshers
- job seekers
- working professionals

## Features

- Real-time resume preview while typing
- Multiple resume layouts including Classic Sidebar and Modern Top-Header
- Theme color customization
- Typography switching
- Dark mode toggle
- Dynamic sections for projects, work experience, education, skills, languages, and achievements
- Profile image upload
- Skill proficiency sliders with visual progress bars
- Job-title-based summary suggestion
- ATS-style keyword suggestions
- QR code generation for LinkedIn, GitHub, or portfolio links
- Auto-save using browser localStorage
- Print support
- PDF export using `html2pdf.js`
- Responsive interface for desktop and mobile

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts
- `html2pdf.js`
- QRServer API

## How It Works

1. Enter personal and professional information.
2. Add sections such as projects, education, experience, skills, languages, and achievements.
3. Customize the resume using layout, font, theme color, and dark mode options.
4. Add a QR-enabled profile or portfolio link.
5. Review changes instantly in the live preview.
6. Print or download the final resume as a PDF.

## Project Highlights

- Built a clean two-panel interface with form input on one side and resume preview on the other
- Implemented dynamic DOM updates for a smooth live editing experience
- Added client-side persistence so users do not lose progress on refresh
- Designed the resume output to stay printable and export-friendly

## Project Structure

```text
resume_builder-main/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
|-- images/
```

## Run Locally

Since this is a frontend-only project, no build setup is required.

1. Clone or download the repository.
2. Open `index.html` in your browser.

## What I Learned

This project helped me improve my understanding of:

- DOM manipulation with JavaScript
- dynamic form handling
- real-time preview rendering
- responsive UI design
- client-side storage with localStorage
- PDF generation in web applications
- building user-friendly productivity tools

## Author

Developed by [Rishabh](https://github.com/Rishabhs-2004)
