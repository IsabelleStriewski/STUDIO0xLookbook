# STUDIO 0x — Digital Lookbook

**STUDIO 0x** ist ein digitales Lookbook, das die Welt des Editorial-Designs in den Browser bringt. Im Fokus steht nicht nur die visuelle Gestaltung, sondern die bewusste Verbindung aus **typografischer Spannung**, **asymmetrischen Layouts** und **modernen CSS-Techniken** — ganz ohne Frameworks.

➡️ **[Live Demo ansehen](https://isabellestriewski.github.io/STUDIO0xLookbook/)**  
➡️ **[Ausführliche README ansehen](https://isabellestriewski.github.io/STUDIO0xLookbook/README.html)**

---

## Seiten & Struktur

| Route | Inhalt |
|---|---|
| `index.html` | Hero-Titel, asymmetrisches Editorial-Grid |
| `idea.html` | Konzept & visuelle Sprache |
| `process.html` | Design-Entscheidungen erklärt |
| `about.html` | Projekt-Manifest |
| `archive.html` | Drag & Drop Foto-Archiv mit Scroll-Batching |

---

## Features & Techniken

### 1. Editorial Grid
Asymmetrisches 4-Spalten CSS Grid auf der Startseite. Bilder brechen bewusst die Baseline — kontrolliertes Chaos, wie ein gedrucktes Magazin-Layout.

### 2. Raw Archive
Eine wachsende Foto-Sammlung die beim Scrollen in Batches lädt. Vollständige Drag & Drop Logik von Grund auf geschrieben — inklusive Zwei-Klick-Zoom, Z-Index-Management und Drop-Rotation.

### 3. Frosted Glass UI
Text-Container nutzen `backdrop-filter: blur()` um über den Bildern zu schweben. Transparenz-Ebenen erzeugen eine taktile, physische Tiefe auf einem flachen Bildschirm.

### 4. Custom Cursor
Zweiteiliger Cursor — Punkt und Ring — mit Hover-States die sich bei Links, Cards und Überschriften ausdehnen und petrol füllen. Umgesetzt via Web Animations API.

### 5. Typografische Spannung
*Playfair Display* (emotional, editorial) gepaart mit *Fira Code* (logisch, technisch). Zwei Stimmen im ständigen Dialog auf jeder Seite.

---

## Stack & Setup

### Voraussetzungen
* Kein Build-Step, keine Abhängigkeiten
* Empfohlen: VS Code mit **Live Server** Extension

### Schnellstart
1. Repository klonen.
2. `index.html` mit Live Server öffnen.
3. Für Deployment: GitHub Pages auf `main` Branch aktivieren.

> **Hinweis zu Dateipfaden:** Einige Bildpfade in `archive.html` nutzen Backslashes (`Fotos\`). Diese funktionieren unter Windows, brechen aber auf macOS/Linux und GitHub Pages. Vor dem Deployment durch Forward Slashes (`Fotos/`) ersetzen.

---

## Design-Prinzipien

1. **Asymmetry over convention** — das Grid brechen um das Auge zu führen.
2. **Active Whitespace** — leere Flächen sind bewusst, nicht faul.
3. **Layering for depth** — Glas über Bild, Text über Raum.
4. **Typografische Spannung** — Serif-Emotion vs. Monospace-Logik.

---

## Über das Projekt
STUDIO 0x dient als Demonstration für den bewussten Umgang mit visuellem Raum im Web. Es zeigt mein Verständnis für:
* **Editorial Design** (Typografie, Whitespace, Asymmetrie)
* **Moderne CSS-Techniken** (Grid, backdrop-filter, Keyframe-Animationen)
* **Vanilla JavaScript** (DOM-Manipulation, Drag & Drop, Web Animations API)
* **UX-Details** (Custom Cursor, Scroll-Animationen, Glasmorphismus)