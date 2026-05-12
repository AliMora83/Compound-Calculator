import re
import os

with open('/Users/alikora/dev/AntiG/CompCalc/CompCalc-BlogArticles.md', 'r') as f:
    content = f.read()

articles = re.split(r'# Article \d+', content)[1:]

template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>__TITLE__</title>
  <meta name="description" content="__DESC__">
  <link rel="canonical" href="https://compoundcalc.co.za/blog/__SLUG__.html">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
__SCHEMA__
</head>
<body>
  <header>
    <div class="nav-container">
      <a href="/" class="logo"><img src="/assets/logo.png" alt="CompoundCalc" height="32"> <span>CompoundCalc</span></a>
      <nav class="nav-links">
        <a href="/savings-calculator.html">Savings Calculator</a>
        <a href="/investment-goal-calculator.html">Goal Calculator</a>
        <a href="/compare-investments.html">Compare</a>
        <a href="/blog/" class="active">Blog</a>
      </nav>
    </div>
  </header>

  <main class="content-page calc-wrap">
    <div class="container blog-container">
__ARTICLE_CONTENT__
      
      <div class="mini-calc-widget">
        <h4>Try it yourself</h4>
        <p>Enter a monthly amount to see your 20-year projection:</p>
        <div class="mini-calc-row">
          <span class="input-prefix">R</span>
          <input type="number" id="mini-monthly" value="1000">
          <a href="/" id="mini-calc-link" class="btn-primary">See Growth →</a>
        </div>
      </div>

      <footer class="post-footer">
        <div class="share-box">
          <span>Share:</span>
          <button onclick="window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(window.location.href))">𝕏</button>
          <button onclick="window.open('whatsapp://send?text='+encodeURIComponent(window.location.href))">WhatsApp</button>
          <button onclick="copyShareLink()">🔗 Copy Link</button>
        </div>
      </footer>
    </div>
  </main>

  <footer>
    <div class="footer-container">
      <div class="footer-brand">
        <h2>CompoundCalc.co.za</h2>
        <p>Free compound interest calculator for South African investors.</p>
      </div>
      <div class="footer-links">
        <h4>Calculators</h4>
        <ul>
          <li><a href="/savings-calculator.html">Grow Savings</a></li>
          <li><a href="/investment-goal-calculator.html">Goal Calculator</a></li>
          <li><a href="/compare-investments.html">Compare Scenarios</a></li>
          <li><a href="/blog/">Financial Blog</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/privacy-policy.html">Privacy Policy</a></li>
          <li><a href="/terms-of-service.html">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-disclaimer">Disclaimer: This tool is for informational purposes only and does not constitute financial advice.</p>
      <p class="footer-copy">&copy; 2026 CompoundCalc. Built in South Africa. 🇿🇦</p>
    </div>
  </footer>

  <script src="/assets/js/share.js"></script>
  <script>
    document.getElementById('mini-monthly').addEventListener('input', (e) => {
      const val = e.target.value;
      document.getElementById('mini-calc-link').href = `/?m=${val}&tab=grow`;
    });
  </script>
</body>
</html>"""

for art in articles:
    file_match = re.search(r'\*\*File:\*\* `(.+?)`', art)
    title_match = re.search(r'\*\*Title tag:\*\* `(.+?)`', art)
    desc_match = re.search(r'\*\*Meta description:\*\* `(.+?)`', art)
    
    if not file_match:
        continue
    
    file_path = '/Users/alikora/dev/AntiG/CompCalc' + file_match.group(1)
    title = title_match.group(1)
    desc = desc_match.group(1)
    slug = file_match.group(1).split('/')[-1].replace('.html', '')
    
    article_html = re.search(r'```html\n(.*?)\n```', art, re.DOTALL).group(1)
    
    # Replace EasyEquities link placeholder if present
    article_html = article_html.replace('EASYEQUITIES_AFFILIATE_LINK', 'https://www.easyequities.co.za/')
    
    schema_json = ""
    if "```json" in art:
        schema_json = re.search(r'```json\n(.*?)\n```', art, re.DOTALL).group(1)
        schema_json = f'  <script type="application/ld+json">\n{schema_json}\n  </script>'
    
    final_html = template.replace('__TITLE__', title).replace('__DESC__', desc).replace('__SLUG__', slug).replace('__SCHEMA__', schema_json).replace('__ARTICLE_CONTENT__', article_html)
    
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as out_f:
        out_f.write(final_html)
    print(f'Generated {file_path}')

# Update index.html title
blog_index = '/Users/alikora/dev/AntiG/CompCalc/blog/index.html'
with open(blog_index, 'r') as f:
    idx_content = f.read()
idx_content = idx_content.replace('(2025 Guide)', '(2026 Guide)')
with open(blog_index, 'w') as f:
    f.write(idx_content)
print(f'Updated {blog_index}')

