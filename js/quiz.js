// Quiz logic (BuzzFeed-style). Requires window.MUSHROOMS_DB and #modeToggle from theme.js.

const DB = (window.MUSHROOMS_DB || []).slice();

// --- utilities ---
const shuffle = arr => arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
const pickN = (arr,n) => shuffle(arr.slice()).slice(0,n);
const esc = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

// --- render helper ---
function qCard({img, title, subtitle, choices, name}) {
  return `
    <div class="col-lg-6 question-col">
      <div class="bf-card w-100">
        <div class="bf-hero" style="background-image:url('${img}')">
          <div class="label">${esc(title)}<br><small>${esc(subtitle||'')}</small></div>
        </div>
        <div class="bf-body">
          ${choices.map(c => `
            <label class="bf-choice ${c.cls || 'opt'}">
              <input type="radio" name="${name}" value="${esc(c.value)}">
              <span class="text">${esc(c.label)}</span>
            </label>
          `).join('')}
        </div>
        <div class="bf-footer">
          <div class="small text-muted" id="${name}-explain"></div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================
// Section 1: Edible or Poisonous?
// ==========================================================
(function sectionEdible() {
  const root = document.getElementById('sec-ed');
  if (!root) return;

  const set = pickN(DB, 10);
  set.forEach((m, i) => {
    const name = `ed-${i}`;
    const choices = [
      { label: "Edible 🍽️", value: "edible", cls: "edible" },
      { label: "Poisonous ☠️", value: "poisonous", cls: "poison" }
    ];
    root.insertAdjacentHTML('beforeend', qCard({ img: m.img, title: m.name, subtitle: m.latin, name, choices }));
  });

  document.getElementById('grade-ed')?.addEventListener('click', () => {
    let total = 0, correct = 0;
    set.forEach((m, i) => {
      total++;
      const name = `ed-${i}`;
      const chosen = (document.querySelector(`input[name="${name}"]:checked`) || {}).value;
      const ok = m.edible ? "edible" : "poisonous";
      const exp = document.getElementById(`${name}-explain`);
      if (chosen === ok) { correct++; exp.innerHTML = `<span class="text-success fw-bold">Correct!</span> ${m.feature}`; }
      else { exp.innerHTML = `<span class="text-danger fw-bold">Wrong.</span> It is <strong>${ok}</strong>. ${m.feature}`; }
      document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
        inp.closest('.bf-choice')?.classList.toggle('selected', inp.checked);
      });
    });
    document.getElementById('score-ed').textContent = `Score: ${correct}/${total} (${Math.round(correct/total*100)}%)`;
  });

  document.getElementById('reset-ed')?.addEventListener('click', () => location.reload());
})();

// ==========================================================
// Section 2: Best way to cook (edibles)
// ==========================================================
(function sectionCook() {
  const root = document.getElementById('sec-cook');
  if (!root) return;

  const pool = DB.filter(x => x.edible);
  const set = pickN(pool, 5);
  const distract = [
    "Roast whole at high heat",
    "Pickle raw slices",
    "Best dried then rehydrated",
    "Deep fry in batter",
    "Slow-braise for 2 hours",
    "Microwave on high for 6 minutes"
  ];

  set.forEach((m, i) => {
    const name = `cook-${i}`;
    const opts = new Set([m.cook]);
    while (opts.size < 4) opts.add(distract[Math.floor(Math.random()*distract.length)]);
    const choices = shuffle([...opts]).map(t => ({ label: t, value: t, cls: 'opt' }));
    root.insertAdjacentHTML('beforeend', qCard({ img: m.img, title: `Best way to cook ${m.name}?`, subtitle: m.latin, name, choices }));
  });

  document.getElementById('grade-cook')?.addEventListener('click', () => {
    let total = 0, correct = 0;
    set.forEach((m, i) => {
      total++;
      const name = `cook-${i}`;
      const chosen = (document.querySelector(`input[name="${name}"]:checked`) || {}).value;
      const ok = m.cook;
      const exp = document.getElementById(`${name}-explain`);
      if (chosen === ok) { correct++; exp.innerHTML = `<span class="text-success fw-bold">Nice!</span>`; }
      else { exp.innerHTML = `<span class="text-danger fw-bold">Not quite.</span> Best: ${ok}`; }
      document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
        inp.closest('.bf-choice')?.classList.toggle('selected', inp.checked);
      });
    });
    document.getElementById('score-cook').textContent = `Score: ${correct}/${total} (${Math.round(correct/total*100)}%)`;
  });

  document.getElementById('reset-cook')?.addEventListener('click', () => location.reload());
})();

// ==========================================================
// Section 3: Habitat
// ==========================================================
(function sectionHabitat() {
  const root = document.getElementById('sec-hab');
  if (!root) return;

  const set = pickN(DB, 5);
  set.forEach((m, i) => {
    const name = `hab-${i}`;
    const distractors = pickN(DB.filter(x => x !== m).map(x => x.found), 3);
    const choices = shuffle([m.found, ...distractors]).map(t => ({ label: t, value: t, cls: 'opt' }));
    root.insertAdjacentHTML('beforeend', qCard({ img: m.img, title: `Where is ${m.name} typically found?`, subtitle: m.latin, name, choices }));
  });

  document.getElementById('grade-hab')?.addEventListener('click', () => {
    let total = 0, correct = 0;
    set.forEach((m, i) => {
      total++;
      const name = `hab-${i}`;
      const chosen = (document.querySelector(`input[name="${name}"]:checked`) || {}).value;
      const ok = m.found;
      const exp = document.getElementById(`${name}-explain`);
      if (chosen === ok) { correct++; exp.innerHTML = `<span class="text-success fw-bold">Correct!</span>`; }
      else { exp.innerHTML = `<span class="text-danger fw-bold">Wrong.</span> Typical: ${ok}`; }
      document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
        inp.closest('.bf-choice')?.classList.toggle('selected', inp.checked);
      });
    });
    document.getElementById('score-hab').textContent = `Score: ${correct}/${total} (${Math.round(correct/total*100)}%)`;
  });

  document.getElementById('reset-hab')?.addEventListener('click', () => location.reload());
})();

// ==========================================================
// Section 4: Key Feature
// ==========================================================
(function sectionFeature() {
  const root = document.getElementById('sec-feat');
  if (!root) return;

  const set = pickN(DB, 5);
  set.forEach((m, i) => {
    const name = `feat-${i}`;
    const distractors = pickN(DB.filter(x => x !== m).map(x => x.feature), 3);
    const choices = shuffle([m.feature, ...distractors]).map(t => ({ label: t, value: t, cls: 'opt' }));
    root.insertAdjacentHTML('beforeend', qCard({ img: m.img, title: `Which key feature fits ${m.name}?`, subtitle: m.latin, name, choices }));
  });

  document.getElementById('grade-feat')?.addEventListener('click', () => {
    let total = 0, correct = 0;
    set.forEach((m, i) => {
      total++;
      const name = `feat-${i}`;
      const chosen = (document.querySelector(`input[name="${name}"]:checked`) || {}).value;
      const ok = m.feature;
      const exp = document.getElementById(`${name}-explain`);
      if (chosen === ok) { correct++; exp.innerHTML = `<span class="text-success fw-bold">Correct!</span>`; }
      else { exp.innerHTML = `<span class="text-danger fw-bold">Wrong.</span> ${ok}`; }
      document.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
        inp.closest('.bf-choice')?.classList.toggle('selected', inp.checked);
      });
    });
    document.getElementById('score-feat').textContent = `Score: ${correct}/${total} (${Math.round(correct/total*100)}%)`;
  });

  document.getElementById('reset-feat')?.addEventListener('click', () => location.reload());
})();

// Maintain click styling
document.addEventListener('change', (e) => {
  const inp = e.target.closest('input[type="radio"]');
  if (!inp) return;
  document.querySelectorAll(`input[name="${inp.name}"]`).forEach(el => {
    el.closest('.bf-choice')?.classList.toggle('selected', el.checked);
  });
});

// Keep the tab header in view when switching tabs
document.addEventListener('DOMContentLoaded', () => {
  const quizTabsEl = document.getElementById('quizTabs'); // <ul id="quizTabs" ...>
  if (!quizTabsEl) return;

  // Bootstrap fires 'shown.bs.tab' on the <a data-bs-toggle="tab"> element
  quizTabsEl.addEventListener('shown.bs.tab', () => {
    quizTabsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
