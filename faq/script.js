// ============================================
// アコーディオン機能
// ============================================
const triggers = document.querySelectorAll('.accordion-trigger');

triggers.forEach(function(trigger) {
  trigger.addEventListener('click', function() {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    var panelId = this.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);

    this.setAttribute('aria-expanded', String(!expanded));
    panel.setAttribute('aria-hidden', String(expanded));
  });
});

// ============================================
// キーワード検索機能
// ============================================
var searchInput = document.getElementById('search-input');
var searchClear = document.getElementById('search-clear');
var noResults = document.getElementById('no-results');
var sections = document.querySelectorAll('.faq-section');

function filterFAQ(keyword) {
  var query = keyword.trim().toLowerCase();
  var totalVisible = 0;

  sections.forEach(function(section) {
    var items = section.querySelectorAll('.accordion-item');
    var sectionVisible = 0;

    items.forEach(function(item) {
      var questionEl = item.querySelector('.accordion-trigger span:first-child');
      var panelEl = item.querySelector('.accordion-panel');

      var questionText = questionEl ? questionEl.textContent.toLowerCase() : '';
      var answerText = panelEl ? panelEl.textContent.toLowerCase() : '';

      if (query === '' || questionText.includes(query) || answerText.includes(query)) {
        item.classList.remove('hidden');
        sectionVisible++;
      } else {
        item.classList.add('hidden');
      }
    });

    if (sectionVisible > 0) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }

    totalVisible += sectionVisible;
  });

  if (totalVisible === 0 && query !== '') {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }

  // クリアボタンの表示/非表示
  searchClear.style.display = keyword.length > 0 ? 'block' : 'none';
}

searchInput.addEventListener('input', function() {
  filterFAQ(this.value);
});

searchClear.addEventListener('click', function() {
  searchInput.value = '';
  filterFAQ('');
  searchInput.focus();
});
