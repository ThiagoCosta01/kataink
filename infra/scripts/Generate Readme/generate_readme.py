# name: generate_readme.py
# description: Generates README.md from .md files in docs/readme_files
# version: 1.1.0
# Language: en-US

from pathlib import Path


README_FILE = Path("../../README.md")
DOCS_DIR = Path("../../docs/readme_files")
GENERAL_FILE = DOCS_DIR / "00-overview.md"


def format_title(filename: str) -> str:
    """
    Converts:
        01-architecture -> 01 Architecture
        database -> Database
    """
    return filename.replace("-", " ").title()


def get_markdown_files() -> list[Path]:
    """
    Returns the .md files from docs/readme_files,
    except for 00-overview.md, in alphabetical order.
    """
    return sorted(
        file
        for file in DOCS_DIR.glob("*.md")
        if file.name != GENERAL_FILE.name
    )


def generate_readme() -> None:
    files = get_markdown_files()

    with README_FILE.open("w", encoding="utf-8") as readme:

        # ---------------------------------------------------------
        # 00-overview.md
        # ---------------------------------------------------------
        if GENERAL_FILE.exists():
            readme.write(GENERAL_FILE.read_text(encoding="utf-8"))
            readme.write("\n")

        # ---------------------------------------------------------
        # Summary
        # ---------------------------------------------------------
        readme.write("---\n")
        readme.write("## 📑 Summary\n")
        readme.write("\n")

        for file in files:
            basename = file.stem
            title = format_title(basename)

            readme.write(f"- [{title}](#{basename})\n")

        readme.write("\n")

        # ---------------------------------------------------------
        # Documentation
        # ---------------------------------------------------------
        for file in files:
            basename = file.stem
            title = format_title(basename)
            content = file.read_text(encoding="utf-8")

            readme.write("\n")
            readme.write("---\n")
            readme.write(f'<a id="{basename}"></a>\n')
            readme.write("<details>\n")
            readme.write(f"  <summary>📌 {title}</summary>\n")
            readme.write("\n")

            readme.write(content)

            if not content.endswith("\n"):
                readme.write("\n")

            readme.write("\n")
            readme.write("</details>\n")


if __name__ == "__main__":
    generate_readme()