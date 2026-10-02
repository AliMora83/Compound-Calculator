"""Programmatic HTML Word Counter for CompoundCalc.

Complies strictly with PROJECT.md Interface Contract 2:
- Strips <head>, <script>, <style>, <noscript>, <svg>, and HTML comments.
- Accurately parses HTML tokens via streaming HTMLParser, preventing tag attributes
  containing '>' from leaking into the text stream.
- Unescapes HTML entities (&nbsp;, &amp;, etc.).
- Normalizes irregular whitespace.
- Computes standard word count on readable editorial prose.
"""

import html
import os
import re
from html.parser import HTMLParser
from typing import List, Optional, Tuple


class EditorialTextExtractor(HTMLParser):
    """Streaming HTML parser that extracts visible editorial text while ignoring non-content blocks."""

    IGNORED_TAGS = {"head", "script", "style", "noscript", "svg"}

    def __init__(self):
        super().__init__()
        self.reset()
        self.text_chunks: List[str] = []
        self._ignore_depth = 0

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]):
        if tag.lower() in self.IGNORED_TAGS:
            self._ignore_depth += 1

    def handle_endtag(self, tag: str):
        if tag.lower() in self.IGNORED_TAGS:
            self._ignore_depth = max(0, self._ignore_depth - 1)

    def handle_data(self, data: str):
        if self._ignore_depth == 0:
            cleaned = data.strip()
            if cleaned:
                self.text_chunks.append(cleaned)

    def handle_comment(self, data: str):
        # Ignore comments completely
        pass

    def get_text(self) -> str:
        # Join chunks with space and normalize whitespace
        joined = " ".join(self.text_chunks)
        # Unescape any remaining entity references
        unescaped = html.unescape(joined)
        return re.sub(r"\s+", " ", unescaped).strip()


def extract_clean_text(html_content: str) -> str:
    """Extract clean readable text from HTML content.

    Uses streaming HTMLParser to ensure attribute brackets (e.g. data-val="> 10")
    never leak into the extracted text.

    Args:
        html_content: Raw HTML string.

    Returns:
        Clean, whitespace-normalized string of readable editorial text.
    """
    if not html_content:
        return ""
    parser = EditorialTextExtractor()
    parser.feed(html_content)
    return parser.get_text()


def count_words(html_content: str) -> int:
    """Compute programmatic word count of HTML content.

    Args:
        html_content: Raw HTML string.

    Returns:
        Integer number of words.
    """
    text = extract_clean_text(html_content)
    if not text:
        return 0
    return len(text.split())


def get_file_word_count(file_path: str) -> int:
    """Read an HTML file from disk and compute its programmatic word count.

    Args:
        file_path: Absolute or relative path to the HTML file.

    Returns:
        Integer number of words.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    return count_words(content)
