import fs from 'fs';
import path from 'path';

/**
 * Simple markdown-to-HTML converter for legal documents.
 * Handles headings, paragraphs, bold, italic, links, lists, tables, and horizontal rules.
 * No external dependencies required.
 */
export function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n');
  let html = '';
  let inList = false;
  let inOrderedList = false;
  let inTable = false;
  let tableHeaders: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\r$/, '');

    // Skip empty lines (close any open list)
    if (line.trim() === '') {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      if (inOrderedList) {
        html += '</ol>\n';
        inOrderedList = false;
      }
      if (inTable) {
        html += '</tbody></table>\n';
        inTable = false;
        tableHeaders = [];
      }
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim()) && !inTable) {
      html += '<hr />\n';
      continue;
    }

    // Table detection
    if (line.includes('|') && line.trim().startsWith('|')) {
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
      
      // Check if next line is separator
      if (i + 1 < lines.length && /^\|[\s\-:|]+\|$/.test(lines[i + 1].trim())) {
        // This is a table header
        tableHeaders = cells;
        html += '<div class="overflow-x-auto my-6"><table class="w-full text-sm"><thead><tr>';
        cells.forEach(cell => {
          html += `<th class="text-left py-3 px-4 border-b border-white/10 text-neutral-300 font-medium">${inlineMarkdown(cell)}</th>`;
        });
        html += '</tr></thead><tbody>\n';
        inTable = true;
        i++; // Skip the separator line
        continue;
      } else if (inTable) {
        // Table body row
        html += '<tr>';
        cells.forEach(cell => {
          html += `<td class="py-3 px-4 border-b border-white/5 text-neutral-400">${inlineMarkdown(cell)}</td>`;
        });
        html += '</tr>\n';
        continue;
      }
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      if (inList) { html += '</ul>\n'; inList = false; }
      if (inOrderedList) { html += '</ol>\n'; inOrderedList = false; }
      const level = headingMatch[1].length;
      const text = inlineMarkdown(headingMatch[2]);
      const id = headingMatch[2].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      html += `<h${level} id="${id}">${text}</h${level}>\n`;
      continue;
    }

    // Unordered list item
    const ulMatch = line.match(/^(\s*)[-*]\s+(.+)/);
    if (ulMatch) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `<li>${inlineMarkdown(ulMatch[2])}</li>\n`;
      continue;
    }

    // Ordered list item
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)/);
    if (olMatch) {
      if (!inOrderedList) {
        html += '<ol>\n';
        inOrderedList = true;
      }
      html += `<li>${inlineMarkdown(olMatch[2])}</li>\n`;
      continue;
    }

    // Paragraph
    if (inList) { html += '</ul>\n'; inList = false; }
    if (inOrderedList) { html += '</ol>\n'; inOrderedList = false; }
    html += `<p>${inlineMarkdown(line)}</p>\n`;
  }

  // Close any open tags
  if (inList) html += '</ul>\n';
  if (inOrderedList) html += '</ol>\n';
  if (inTable) html += '</tbody></table></div>\n';

  return html;
}

/** Process inline markdown: bold, italic, links, code */
function inlineMarkdown(text: string): string {
  // Links: [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#FF3E00] hover:underline">$1</a>');
  // Bold + italic: ***text***
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code: `text`
  text = text.replace(/`([^`]+)`/g, '<code class="bg-white/5 px-1.5 py-0.5 rounded text-[#FF3E00]/80 text-xs">$1</code>');
  return text;
}

/**
 * Read a legal document from content/legal/ and return its HTML content.
 */
export function getLegalDocument(slug: string): { html: string; title: string } {
  const filePath = path.join(process.cwd(), 'content', 'legal', `${slug}.md`);
  const markdown = fs.readFileSync(filePath, 'utf-8');
  
  // Extract title from first H1
  const titleMatch = markdown.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');
  
  // Remove the first H1 from content (we'll render it separately)
  const contentWithoutTitle = markdown.replace(/^#\s+.+\n?/, '');
  
  return {
    html: markdownToHtml(contentWithoutTitle),
    title,
  };
}
