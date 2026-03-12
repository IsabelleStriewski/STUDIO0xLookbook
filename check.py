import os, glob

# Alle Fotos im Ordner
alle_fotos = set(os.path.basename(f) for f in glob.glob("Fotos/*"))

# Alle HTML Dateien durchsuchen
referenziert = set()
for html in glob.glob("*.html"):
    with open(html, encoding="utf-8") as f:
        inhalt = f.read()
        for foto in alle_fotos:
            if foto in inhalt:
                referenziert.add(foto)

# Differenz
nicht_benutzt = alle_fotos - referenziert

print(f"\n📁 Fotos gesamt: {len(alle_fotos)}")
print(f"✅ Eingebaut: {len(referenziert)}")
print(f"❌ Nicht benutzt: {len(nicht_benutzt)}\n")
for f in sorted(nicht_benutzt):
    print(f"  — {f}")
