#!/usr/bin/env python3
"""Generate web-safe DE/EN CV PDFs into public/cv/."""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cv"
INK = HexColor("#1e293b")
MUTED = HexColor("#475569")
ACCENT = HexColor("#0f766e")


def styles():
    base = getSampleStyleSheet()
    s = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=INK,
            spaceAfter=2 * mm,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=14,
            textColor=ACCENT,
            spaceAfter=2 * mm,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=MUTED,
            spaceAfter=4 * mm,
        ),
        "h": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=ACCENT,
            spaceBefore=3.5 * mm,
            spaceAfter=2 * mm,
            borderPadding=1,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=INK,
            alignment=TA_JUSTIFY,
            spaceAfter=2 * mm,
        ),
        "job": ParagraphStyle(
            "Job",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=INK,
            spaceBefore=2 * mm,
            spaceAfter=0.5 * mm,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=9,
            leading=11,
            textColor=MUTED,
            spaceAfter=1.5 * mm,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.5,
            textColor=INK,
            alignment=TA_LEFT,
        ),
        "skill": ParagraphStyle(
            "Skill",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.5,
            textColor=INK,
            spaceAfter=0.8 * mm,
        ),
        "line": ParagraphStyle(
            "Line",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=INK,
            spaceAfter=1.5 * mm,
        ),
    }
    return s


def bullets(items, s):
    return ListFlowable(
        [ListItem(Paragraph(t, s["bullet"]), leftIndent=8, bulletColor=INK) for t in items],
        bulletType="bullet",
        start="•",
        leftIndent=10,
        bulletFontName="Helvetica",
        bulletFontSize=9,
        spaceBefore=0,
        spaceAfter=1.5 * mm,
    )


def section(title, s):
    return Paragraph(title, s["h"])


def build_en(s):
    story = []
    story.append(Paragraph("Morteza Poudat", s["name"]))
    story.append(Paragraph("Senior Data Engineer / Python Developer", s["role"]))
    story.append(
        Paragraph(
            "Düsseldorf, Germany  |  poudat.mtz@gmail.com  |  LinkedIn  |  GitHub  |  Portfolio",
            s["contact"],
        )
    )

    story.append(section("PROFILE", s))
    story.append(
        Paragraph(
            "Senior Data Engineer and Python Developer with 9+ years of experience building data pipelines, "
            "ETL processes and backend applications for engineering and materials data. Specialised in turning "
            "unstructured technical sources (PDF handbooks, scanned tables, Excel, XML, JSON, SQL) into "
            "validated, well-modelled databases, including PDF parsing, table detection and OCR. Background in "
            "computational mechanics and civil engineering (MSc), combined with hands-on customer consulting "
            "and implementation project management. Also builds full-stack web applications (React/TypeScript, "
            "PostgreSQL). Daily user of AI coding agents and LLM-assisted development workflows; writes clean, "
            "reproducible, documented production code.",
            s["body"],
        )
    )

    story.append(section("CORE SKILLS", s))
    for line in [
        "<b>Languages &amp; Data:</b> Python (Pandas), SQL, Matlab, C++",
        "<b>Databases &amp; Modelling:</b> MongoDB, PostgreSQL, data modelling, schema and naming-rule design, data migration",
        "<b>ETL &amp; Extraction:</b> ETL pipeline design, PDF parsing (PyMuPDF), table-grid detection (OpenCV), OCR (Tesseract), web scraping, data validation",
        "<b>Backend &amp; DevOps:</b> Django, FastAPI, REST/API integration, Docker, Linux, supervisord, Git/GitLab (merge requests, code review), CI/CD",
        "<b>Frontend &amp; Testing:</b> React, TypeScript, Next.js, Vite, Vitest, Python tests, flake8, oxlint",
        "<b>Analytics &amp; AI:</b> Apache Superset; AI-agent / LLM coding workflows (Cursor)",
        "<b>Engineering:</b> FEM / computational mechanics (Abaqus incl. UMAT, ANSYS APDL), materials data (steel, copper, aluminium alloys)",
    ]:
        story.append(Paragraph(f"• {line}", s["skill"]))

    story.append(section("PROFESSIONAL EXPERIENCE", s))

    story.append(
        KeepTogether(
            [
                Paragraph("Freelance Web Developer  |  2026 – Present", s["job"]),
                Paragraph(
                    "Building websites for clients, including Ario Barber (custom booking website and admin "
                    "system for a Düsseldorf barbershop, live at https://ariobarber.de) and the Nilu Ghorbani "
                    "website (https://nilughorbani.com).",
                    s["body"],
                ),
            ]
        )
    )

    story.append(Paragraph("Senior Data Engineer &amp; Senior Application Consultant  |  Jun 2017 – Present", s["job"]))
    story.append(Paragraph("Engineering materials-data software company, Germany", s["meta"]))
    story.append(
        bullets(
            [
                "Developed full-stack web applications and plugins for the company’s materials data platform: Python backend, PostgreSQL (Docker, migrations, SQL-side reporting), React/TypeScript/Vite frontend, automated tests (Vitest, Python), GitLab CI/CD, role-based permissions, English/German i18n; AI-assisted development with Cursor.",
                "Materials data modelling: Designed a unified materials catalogue data model in MongoDB for steel, copper and aluminium, including classification and source trees, property naming rules and chemical composition rules. Rebuilt the aluminium database, including its property definitions.",
                "PDF extraction &amp; ETL: Built extraction and ETL pipelines for technical handbooks and design guidelines using PyMuPDF, OpenCV table-grid detection and two-engine per-cell OCR (Tesseract). Parsed a fatigue-design guideline into linked records (tests, specimens and load spectra linked to materials); benchmarked the pipeline against MinerU.",
                "ETL standardisation: Defined a standard 7-step ETL design (read, extract/OCR, map to generic properties, validate, package, load, review) and packaged reproducible pipelines in Git/GitLab with READMEs.",
                "Further data imports: Time-temperature-transformation, metallography, life-cycle and copper datasets.",
                "Customer data migrations: Migrated customer data into the company’s materials data platform with Python importers and master-material matching tables, delivered via GitLab merge requests.",
                "Senior Application Consultant: Worked closely with customers in workshops and ongoing discussions to analyse requirements and design solutions; developed custom plugins for the company’s materials data platform tailored to customer requirements; provided customer support from bug report to delivered feature.",
                "Project management: Implementation project management, including weekly customer meetings and cost proposals for a multi-phase data platform.",
                "Knowledge sharing: Conference talk on copper alloys data (2026) and a submitted abstract on materials data.",
            ],
            s,
        )
    )

    story.append(Paragraph("Civil Engineering Intern  |  2009 – 2010", s["job"]))
    story.append(Paragraph("Iran", s["meta"]))

    story.append(section("EDUCATION", s))
    story.append(Paragraph("M.Sc. Computational Mechanics  |  2016 – 2021", s["job"]))
    story.append(Paragraph("University of Duisburg-Essen, Germany  ·  Grade 1.9", s["meta"]))
    story.append(bullets(["Thesis: Knowledge base for the selection and application of aluminium alloys."], s))
    story.append(Paragraph("Materials Science &amp; Applied Mechanics (semesters)  |  2015 – 2016", s["job"]))
    story.append(Paragraph("University of Duisburg-Essen, Germany", s["meta"]))
    story.append(Paragraph("M.Sc. Civil Engineering", s["job"]))
    story.append(Paragraph("Shahid Chamran University of Ahvaz, Iran", s["meta"]))
    story.append(
        bullets(
            ["Finite element simulation in Abaqus, including user material subroutines (UMAT)."],
            s,
        )
    )
    story.append(Paragraph("B.Sc. Civil Engineering", s["job"]))
    story.append(Paragraph("Shahid Chamran University of Ahvaz, Iran", s["meta"]))

    story.append(section("CERTIFICATES", s))
    story.append(
        bullets(
            [
                "Real Python – Pandas (2021–2022)",
                "Sololearn – Python for Data Science; Intermediate Python (2021)",
                "MongoDB – MongoDB Basics (2018)",
                "MITx 6.00.1x – Introduction to Computer Science and Programming Using Python (2017)",
            ],
            s,
        )
    )

    story.append(section("LANGUAGES", s))
    story.append(
        Paragraph(
            "Persian – native   |   German – full professional proficiency   |   English – fluent",
            s["line"],
        )
    )
    return story


def build_de(s):
    story = []
    story.append(Paragraph("Morteza Poudat", s["name"]))
    story.append(Paragraph("Senior Data Engineer / Python Developer", s["role"]))
    story.append(
        Paragraph(
            "Düsseldorf, Deutschland  |  poudat.mtz@gmail.com  |  LinkedIn  |  GitHub  |  Portfolio",
            s["contact"],
        )
    )

    story.append(section("PROFIL", s))
    story.append(
        Paragraph(
            "Senior Data Engineer und Python-Entwickler mit über 9 Jahren Erfahrung in der Entwicklung von "
            "Datenpipelines, ETL-Prozessen und Backend-Anwendungen für Ingenieur- und Werkstoffdaten. "
            "Spezialisiert darauf, unstrukturierte technische Quellen (PDF-Handbücher, gescannte Tabellen, "
            "Excel, XML, JSON, SQL) in validierte, sauber modellierte Datenbanken zu überführen – inklusive "
            "PDF-Parsing, Tabellenerkennung und OCR. Hintergrund in Computational Mechanics und "
            "Bauingenieurwesen (M.Sc.), kombiniert mit praktischer Kundenberatung und Projektleitung von "
            "Implementierungsprojekten. Entwickelt außerdem Full-Stack-Webanwendungen (React/TypeScript, "
            "PostgreSQL). Arbeitet täglich mit KI-Coding-Agenten und LLM-gestützten Entwicklungsworkflows; "
            "schreibt sauberen, reproduzierbaren und dokumentierten Produktionscode.",
            s["body"],
        )
    )

    story.append(section("KERNKOMPETENZEN", s))
    for line in [
        "<b>Sprachen &amp; Daten:</b> Python (Pandas), SQL, Matlab, C++",
        "<b>Datenbanken &amp; Modellierung:</b> MongoDB, PostgreSQL, Datenmodellierung, Entwurf von Schemata und Benennungsregeln, Datenmigration",
        "<b>ETL &amp; Extraktion:</b> Entwurf von ETL-Pipelines, PDF-Parsing (PyMuPDF), Tabellenraster-Erkennung (OpenCV), OCR (Tesseract), Web-Scraping, Datenvalidierung",
        "<b>Backend &amp; DevOps:</b> Django, FastAPI, REST-/API-Integration, Docker, Linux, supervisord, Git/GitLab (Merge Requests, Code-Review), CI/CD",
        "<b>Frontend &amp; Tests:</b> React, TypeScript, Next.js, Vite, Vitest, Python-Tests, flake8, oxlint",
        "<b>Analytics &amp; KI:</b> Apache Superset; KI-Agenten- / LLM-Coding-Workflows (Cursor)",
        "<b>Ingenieurwesen:</b> FEM / Computational Mechanics (Abaqus inkl. UMAT, ANSYS APDL), Werkstoffdaten (Stahl-, Kupfer- und Aluminiumlegierungen)",
    ]:
        story.append(Paragraph(f"• {line}", s["skill"]))

    story.append(section("BERUFSERFAHRUNG", s))

    story.append(
        KeepTogether(
            [
                Paragraph("Freiberuflicher Webentwickler  |  2026 – heute", s["job"]),
                Paragraph(
                    "Erstellung von Websites für Kunden, darunter Ario Barber (individuelle Buchungswebsite "
                    "und Admin-System für einen Düsseldorfer Barbershop, live unter https://ariobarber.de) "
                    "und die Website von Nilu Ghorbani (https://nilughorbani.com).",
                    s["body"],
                ),
            ]
        )
    )

    story.append(
        Paragraph(
            "Senior Data Engineer &amp; Senior Application Consultant  |  Juni 2017 – heute",
            s["job"],
        )
    )
    story.append(Paragraph("Softwareunternehmen für Werkstoffdaten im Ingenieurbereich, Deutschland", s["meta"]))
    story.append(
        bullets(
            [
                "Entwicklung von Full-Stack-Webanwendungen und Plugins für die Werkstoffdaten-Plattform des Unternehmens: Python-Backend, PostgreSQL (Docker, Migrationen, SQL-seitiges Reporting), React/TypeScript/Vite-Frontend, automatisierte Tests (Vitest, Python), GitLab CI/CD, rollenbasierte Berechtigungen, Englisch/Deutsch-i18n; KI-gestützte Entwicklung mit Cursor.",
                "Werkstoffdaten-Modellierung: Entwurf eines einheitlichen Datenmodells für einen Werkstoffkatalog in MongoDB für Stahl, Kupfer und Aluminium, einschließlich Klassifikations- und Quellenbäumen, Benennungsregeln für Eigenschaften und Regeln für die chemische Zusammensetzung. Neuaufbau der Aluminium-Datenbank inklusive ihrer Eigenschaftsdefinitionen.",
                "PDF-Extraktion &amp; ETL: Aufbau von Extraktions- und ETL-Pipelines für technische Handbücher und Bemessungsrichtlinien mit PyMuPDF, Tabellenraster-Erkennung per OpenCV und zellweiser OCR mit zwei Engines (Tesseract). Überführung einer Richtlinie zur Ermüdungsbemessung in verknüpfte Datensätze (Versuche, Proben und Lastkollektive mit Werkstoffen verknüpft); Benchmark der Pipeline gegen MinerU.",
                "ETL-Standardisierung: Definition eines standardisierten ETL-Ablaufs in 7 Schritten (Einlesen, Extraktion/OCR, Zuordnung zu generischen Eigenschaften, Validierung, Paketierung, Laden, Review) und Bereitstellung reproduzierbarer Pipelines in Git/GitLab mit READMEs.",
                "Weitere Datenimporte: Datensätze zu Zeit-Temperatur-Umwandlung, Metallografie, Lebenszyklus und Kupfer.",
                "Migration von Kundendaten: Migration von Kundendaten in die Werkstoffdaten-Plattform des Unternehmens mit Python-Importern und Zuordnungstabellen zu Stammwerkstoffen, ausgeliefert über GitLab Merge Requests.",
                "Senior Application Consultant: Enge Zusammenarbeit mit Kunden in Workshops und laufender Abstimmung zur Anforderungsanalyse und Lösungskonzeption; Entwicklung kundenspezifischer Plugins für die Werkstoffdaten-Plattform des Unternehmens; Kundensupport von der Fehlermeldung bis zum ausgelieferten Feature.",
                "Projektmanagement: Projektleitung von Implementierungsprojekten, einschließlich wöchentlicher Kundentermine und Kostenangeboten für eine mehrphasige Datenplattform.",
                "Wissenstransfer: Konferenzvortrag zu Daten von Kupferlegierungen (2026) und ein eingereichtes Abstract zu Werkstoffdaten.",
            ],
            s,
        )
    )

    story.append(Paragraph("Praktikant Bauingenieurwesen  |  2009 – 2010", s["job"]))
    story.append(Paragraph("Iran", s["meta"]))

    story.append(section("AUSBILDUNG", s))
    story.append(Paragraph("M.Sc. Computational Mechanics  |  2016 – 2021", s["job"]))
    story.append(Paragraph("Universität Duisburg-Essen  ·  Note 1,9", s["meta"]))
    story.append(
        bullets(
            ["Masterarbeit: Wissensbasis für die Auswahl und Anwendung von Aluminiumlegierungen."],
            s,
        )
    )
    story.append(Paragraph("Materialwissenschaft &amp; Technische Mechanik (Studiensemester)  |  2015 – 2016", s["job"]))
    story.append(Paragraph("Universität Duisburg-Essen", s["meta"]))
    story.append(Paragraph("M.Sc. Bauingenieurwesen", s["job"]))
    story.append(Paragraph("Shahid Chamran Universität Ahvaz, Iran", s["meta"]))
    story.append(
        bullets(
            [
                "Finite-Elemente-Simulation in Abaqus, einschließlich benutzerdefinierter Materialroutinen (UMAT)."
            ],
            s,
        )
    )
    story.append(Paragraph("B.Sc. Bauingenieurwesen", s["job"]))
    story.append(Paragraph("Shahid Chamran Universität Ahvaz, Iran", s["meta"]))

    story.append(section("ZERTIFIKATE", s))
    story.append(
        bullets(
            [
                "Real Python – Pandas (2021–2022)",
                "Sololearn – Python for Data Science; Intermediate Python (2021)",
                "MongoDB – MongoDB Basics (2018)",
                "MITx 6.00.1x – Introduction to Computer Science and Programming Using Python (2017)",
            ],
            s,
        )
    )

    story.append(section("SPRACHEN", s))
    story.append(
        Paragraph(
            "Persisch – Muttersprache   |   Deutsch – verhandlungssicher   |   Englisch – fließend",
            s["line"],
        )
    )
    return story


def write_pdf(path: Path, title: str, story):
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title=title,
        author="Morteza Poudat",
    )
    doc.build(story)


def main():
    s = styles()
    en = OUT / "Morteza_Poudat_CV_EN.pdf"
    de = OUT / "Morteza_Poudat_Lebenslauf_DE.pdf"
    write_pdf(en, "Morteza Poudat – CV", build_en(s))
    write_pdf(de, "Morteza Poudat – Lebenslauf", build_de(s))
    print(f"Wrote {en.relative_to(ROOT)}")
    print(f"Wrote {de.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
