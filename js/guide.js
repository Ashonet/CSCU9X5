// Uses window.MUSHROOMS_DB provided by js/mushrooms.js

(function () {
  const DB = (window.MUSHROOMS_DB || []).slice();

  // DOM
  const grid = document.getElementById('mushroomGrid');
  const searchInput = document.getElementById('searchInput');
  const edibilityFilter = document.getElementById('edibilityFilter');
  const clearBtn = document.getElementById('clearFilters');
  const countEl = document.getElementById('resultsCount');

  // Helpers
  function badge(edible) {
    const cls = edible ? 'bg-success' : 'bg-danger';
    return `<span class="badge ${cls}">${edible ? 'Edible' : 'Poisonous'}</span>`;
  }

  function cardTemplate(m) {
    const extra = m.aka && m.aka.length ? ` · <em>${m.aka.join(', ')}</em>` : '';
    return `
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
        <div class="card feature-card h-100">
          <img src="${m.img}" class="card-img-top" alt="${m.name}">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0">${m.name}</h5>
              ${badge(m.edible)}
            </div>
            <p class="mb-1"><small><strong><em>${m.latin}</em>${extra}</strong></small></p>
            <p class="mb-2"><strong>Where:</strong> ${m.found}</p>
            <p class="mb-2"><strong>Description:</strong> ${m.description}</p>
            <p class="mb-0"><strong>Side effects:</strong> ${m.sideEffects}</p>
          </div>
        </div>
      </div>
    `;
  }

  function applyFilters() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const mode = edibilityFilter.value; // all | edible | poisonous

    let list = DB.slice();

    if (mode !== 'all') {
      const wantEdible = (mode === 'edible');
      list = list.filter(x => x.edible === wantEdible);
    }

    if (q) {
      list = list.filter(x => {
        const hay = [
          x.name, x.latin,
          ...(x.aka || []),
          x.found, x.description, x.sideEffects,
          x.edible ? 'edible' : 'poisonous'
        ].join(' ').toLowerCase();
        return hay.includes(q);
      });
    }

    grid.innerHTML = list.map(cardTemplate).join('');
    countEl.textContent = `${list.length} result${list.length === 1 ? '' : 's'}`;
  }

  // Events
  searchInput.addEventListener('input', applyFilters);
  edibilityFilter.addEventListener('change', applyFilters);
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    edibilityFilter.value = 'all';
    applyFilters();
  });

  // Initial render
  applyFilters();
})();
