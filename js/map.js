// Leaflet map: theme-aware tiles + species polygons + legend + category toggles
(function () {
  // --- Theme helpers (work with or without theme.js) ---
  function isDark() { return document.body.classList.contains('dark-mode'); }
  function outlineColor() { return isDark() ? '#ffffff' : '#000000'; }

  // --- Basemaps & map init ---
  const lightTiles = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { attribution: '&copy; OpenStreetMap contributors &copy; CARTO', maxZoom: 19 }
  );
  const darkTiles = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { attribution: '&copy; OpenStreetMap contributors &copy; CARTO', maxZoom: 19 }
  );

  const boundsUK = L.latLngBounds([49.8, -8.7], [60.9, 1.8]);

  const map = L.map('map', {
    center: [54.5, -3.0],
    zoom: 6,
    minZoom: 5,
    maxBounds: boundsUK,
    maxBoundsViscosity: 0.8
  });

  let currentBase;
  function setBaseByTheme() {
    const next = isDark() ? darkTiles : lightTiles;
    if (currentBase && map.hasLayer(currentBase)) map.removeLayer(currentBase);
    next.addTo(map);
    currentBase = next;
  }
  setBaseByTheme();
  map.whenReady(() => map.fitBounds(boundsUK));

  // --- Species colours ---
  const speciesColors = {
    // Edible
    'Chanterelle':               '#f6c453',
    'Porcini':                   '#a67c52',
    'Hedgehog Mushroom':         '#f4a261',
    'Oyster':                    '#6aaed6',
    'Chicken of the Woods':      '#f59e0b',
    'Wood Blewit':               '#9b8de3',
    'Field Mushroom':            '#7dbf7a',
    'St George’s Mushroom':      '#b8d151',
    'Fairy Ring Champignon':     '#9bd0a9',
    'Giant Puffball':            '#d6d3c4',
    // Poisonous
    'Death Cap':                 '#7b2cbf',
    'Destroying Angel':          '#8d99ae',
    'Fly Agaric':                '#e63946',
    'Panther Cap':               '#a97155',
    'Funeral Bell (Deadly Galerina)': '#b56576',
    'Fool’s Funnel':             '#adb5bd',
    'Deadly Webcap':             '#d08770',
    'Deadly Fibrecap':           '#cc4e5c',
    'Sulphur Tuft':              '#ffd166',
    'Yellow Stainer':            '#ff9f1c'
  };

  // Category sets (for master toggles)
  const EDIBLE = new Set([
    'Chanterelle','Porcini','Hedgehog Mushroom','Oyster','Chicken of the Woods',
    'Wood Blewit','Field Mushroom','St George’s Mushroom','Fairy Ring Champignon','Giant Puffball'
  ]);
  const POISONOUS = new Set([
    'Death Cap','Destroying Angel','Fly Agaric','Panther Cap','Funeral Bell (Deadly Galerina)',
    'Fool’s Funnel','Deadly Webcap','Deadly Fibrecap','Sulphur Tuft','Yellow Stainer'
  ]);

  // Curvy-ish, illustrative polygons (broad areas)
  const POLYS = {
    // ---------- EDIBLE ----------
    // Scottish Highlands, Wales, and SW England
    'Chanterelle': [
      [[58.10,-5.35],[58.25,-4.90],[58.25,-4.40],[58.10,-3.80],[57.90,-3.40],[57.60,-3.30],[57.40,-3.80],[57.55,-4.50],[57.85,-5.00],[58.00,-5.30]],
      [[53.25,-4.30],[53.05,-4.00],[52.85,-3.70],[52.60,-3.50],[52.40,-3.60],[52.35,-4.00],[52.55,-4.40],[52.90,-4.45],[53.10,-4.50],[53.25,-4.40]],
      [[50.75,-4.40],[50.55,-4.00],[50.45,-3.70],[50.50,-3.40],[50.70,-3.50],[50.85,-3.80],[50.95,-4.20],[51.05,-4.50]]
    ],
    // Lake District & Southern Scotland
    'Porcini': [
      [[54.10,-2.90],[53.80,-2.40],[53.40,-2.10],[53.00,-1.60],[52.60,-1.30],[52.30,-1.80],[52.10,-2.40],[52.25,-3.10],[52.60,-3.30],[53.10,-3.10],[53.70,-3.10]],
      [[55.95,-4.60],[55.75,-4.10],[55.55,-3.50],[55.45,-3.00],[55.55,-2.40],[55.85,-2.50],[56.05,-3.10],[56.10,-3.80]]
    ],

    // Cumbria & Scottish lowlands
    'Hedgehog Mushroom': [
      [[54.80,-3.60],[54.60,-3.30],[54.55,-2.90],[54.55,-2.60],[54.70,-2.30],[54.95,-2.35],[55.10,-2.70],[55.05,-3.20],[54.90,-3.50]],
      [[57.70,-3.80],[57.85,-3.30],[57.85,-2.60],[57.65,-2.10],[57.45,-2.35],[57.45,-3.10]]
    ],

    // Southern England & Midlands
    'Oyster': [
      [[51.85,0.60],[51.80,0.20],[51.65,-0.20],[51.45,-0.50],[51.25,-0.30],[51.25,0.20],[51.40,0.60],[51.65,0.80]],
      [[52.95,-1.90],[52.80,-1.45],[52.65,-1.10],[52.45,-1.20],[52.35,-1.70],[52.50,-2.10]]
    ],

    // Wales to Midlands corridor
    'Chicken of the Woods': [
      [[53.40,-3.40],[53.05,-3.20],[52.65,-2.70],[52.25,-2.20],[51.90,-2.30],[51.65,-2.80],[51.60,-3.35],[51.95,-3.70],[52.40,-3.80],[52.90,-3.60],[53.30,-3.50]]
    ],

    // South & Central England
    'Wood Blewit': [
      [[51.30,-1.30],[51.10,-0.90],[50.90,-0.50],[50.80,-0.10],[50.90,0.30],[51.15,0.10],[51.35,-0.30],[51.45,-0.90]],
      [[52.80,-2.40],[52.65,-2.00],[52.50,-1.60],[52.35,-1.70],[52.20,-2.10],[52.30,-2.50]]
    ],

    // East Anglia & Midlands
    'Field Mushroom': [
      [[52.15,0.60],[52.00,0.20],[52.00,-0.30],[52.15,-0.70],[52.45,-0.60],[52.55,-0.10],[52.45,0.40]],
      [[52.75,1.40],[52.65,1.10],[52.60,0.70],[52.70,0.30],[52.95,0.35],[53,0.80]]
    ],

    // South East & Northern England
    'St George’s Mushroom': [
      [[51.85,0.50],[51.70,0.20],[51.55,-0.10],[51.45,-0.30],[51.45,0.30],[51.65,0.55]],
      [[54.30,-2.50],[54.15,-2.20],[54.05,-1.90],[54.10,-1.60],[54.30,-1.75],[54.40,-2.10]]
    ],

    // Southern & Central England
    'Fairy Ring Champignon': [
      [[51.80,-0.60],[51.70,-0.30],[51.60,0.05],[51.55,-0.15],[51.55,-0.55],[51.70,-0.80]],
      [[52.65,-1.65],[52.55,-1.40],[52.45,-1.20],[52.35,-1.40],[52.40,-1.70],[52.55,-1.85]]
    ],

    // Midlands & Yorkshire
    'Giant Puffball': [
      [[53.15,-1.20],[53.00,-0.95],[52.85,-0.85],[52.75,-1.05],[52.85,-1.35],[53.05,-1.40]],
      [[54.90,-1.80],[54.75,-1.50],[54.60,-1.45],[54.55,-1.75],[54.65,-2.00],[54.85,-2.05]]
    ],

    // ---------- POISONOUS ----------
    // Southern England
    'Death Cap': [
      [[51.80,-0.60],[51.70,-0.20],[51.55,0.10],[51.40,-0.05],[51.45,-0.60],[51.65,-0.85]]
    ],

    // Scottish Highlands
    'Destroying Angel': [
      [[57.40,-4.80],[57.55,-4.40],[57.70,-4.00],[57.70,-3.50],[57.55,-3.20],[57.30,-3.30],[57.20,-3.80],[57.25,-4.30]]
    ],

    // Northern & Central Scotland
    'Fly Agaric': [
      [[55.30,-2.60],[55.10,-2.30],[54.95,-2.00],[54.85,-2.10],[54.85,-2.50],[55.00,-2.80],[55.20,-2.85]],
      [[56.90,-3.20],[56.85,-2.80],[56.75,-2.50],[56.60,-2.55],[56.60,-2.95],[56.75,-3.25]]
    ],

    // South Central England
    'Panther Cap': [
      [[51.40,-1.40],[51.25,-1.10],[51.10,-0.80],[51.00,-0.60],[51.05,-1.10],[51.25,-1.50]]
    ],

    // Wales & Central Scotland
    'Funeral Bell (Deadly Galerina)': [
      [[52.90,-3.90],[52.70,-3.60],[52.50,-3.40],[52.35,-3.55],[52.45,-3.90],[52.70,-4.05]],
      [[56.30,-3.90],[56.20,-3.50],[56.10,-3.10],[56.00,-3.30],[56.05,-3.70]]
    ],

    // South Coast & Midlands
    'Fool’s Funnel': [
      [[50.95,-0.95],[50.85,-0.60],[50.80,-0.20],[50.85,0.10],[50.95,0.15],[51.00,-0.30]],
      [[52.55,-1.20],[52.45,-1.00],[52.35,-1.05],[52.35,-1.30],[52.45,-1.45],[52.55,-1.40]]
    ],

    // Highlands
    'Deadly Webcap': [
      [[57.15,-3.95],[57.20,-3.60],[57.10,-3.30],[56.95,-3.20],[56.85,-3.45],[56.90,-3.80]]
    ],

    // South Midlands
    'Deadly Fibrecap': [
      [[51.85,-1.10],[51.75,-0.80],[51.60,-0.70],[51.50,-0.90],[51.55,-1.20],[51.70,-1.30]],
      [[51.90,-1.90],[51.80,-1.60],[51.70,-1.40],[51.65,-1.70],[51.75,-2.00],[51.85,-2.05]]
    ],

    // North Wales & Midlands
    'Sulphur Tuft': [
      [[54.95,-2.10],[54.85,-1.80],[54.70,-1.70],[54.65,-2.00],[54.75,-2.25],[54.90,-2.30]],
      [[52.65,-4.10],[52.45,-3.90],[52.30,-3.70],[52.35,-4.15],[52.55,-4.25]]
    ],

    // South East & Midlands
    'Yellow Stainer': [
      [[51.70,0.40],[51.60,0.05],[51.50,-0.20],[51.45,-0.10],[51.45,0.35],[51.60,0.55]],
      [[52.60,-1.70],[52.50,-1.45],[52.40,-1.30],[52.35,-1.55],[52.45,-1.80],[52.55,-1.85]]
    ]
  };

  // Gentle de-clutter offsets for crowded SE/Midlands (deg lat,lng)
  const NUDGE = {
    'Field Mushroom':                [ 0.00,  0.35],
    'Yellow Stainer':                [-0.10,  0.25],
    'Oyster':                        [ 0.10, -0.25],
    'Fairy Ring Champignon':         [ 0.15, -0.05],
    'Wood Blewit':                   [-0.12, -0.18],
    'St George’s Mushroom':          [ 0.08,  0.18],
    'Giant Puffball':                [ 0.05, -0.12],
    'Death Cap':                     [-0.05,  0.10],
    'Funeral Bell (Deadly Galerina)':[ 0.07, -0.15],
    'Fool’s Funnel':                 [-0.08,  0.12]
  };
  const applyNudge = (coords, dLat, dLng) => coords.map(([la,ln]) => [la + dLat, ln + dLng]);

  // Build layers
  const overlayGroups = {};            // for per-species layer control
  const speciesGroupMap = {};          // name -> group (for master toggles)
  const allRegionPolys = [];

  Object.keys(POLYS).forEach(name => {
    const group = L.layerGroup();
    const fill = speciesColors[name] || '#888';
    const [dLat, dLng] = NUDGE[name] || [0,0];

    POLYS[name].forEach(coords => {
      const shifted = (dLat || dLng) ? applyNudge(coords, dLat, dLng) : coords;
      const poly = L.polygon(shifted, {
        stroke: true,
        color: outlineColor(),
        weight: 1.8,
        fillColor: fill,
        fillOpacity: 0.20,
        smoothFactor: 1.2
      })
      .bindPopup(`<strong>${name}</strong><br><small>Generalised area</small>`)
      .on('mouseover', e => { e.target.setStyle({ weight: 3 }); e.target.bringToFront(); })
      .on('mouseout',  e => { e.target.setStyle({ weight: 1.8 }); });

      poly.addTo(group);
      allRegionPolys.push(poly);
    });

    overlayGroups[name] = group;
    speciesGroupMap[name] = group;
    group.addTo(map); // visible by default
  });

  // --- Base/species layer control ---
  L.control.layers(null, overlayGroups, { collapsed: true }).addTo(map);

  // --- Legend ---
  const legend = L.control({ position: 'bottomleft' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = '<strong>General Areas</strong>';
    Object.entries(speciesColors).forEach(([name, col]) => {
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<span class="swatch" style="background:${col}"></span> ${name}`;
      div.appendChild(row);
    });
    return div;
  };
  legend.addTo(map);

  function restyleOutlines() {
    const col = outlineColor();
    allRegionPolys.forEach(p => p.setStyle({ color: col }));
  }
  restyleOutlines();

  // Keep tiles + outlines + legend styles synced with theme
  window.addEventListener('themechange', () => {
    setBaseByTheme();
    restyleOutlines();
    // Legend box restyles automatically via CSS because body class changes
  });


  // --- Categories control (top-right) ---
const catCtrl = L.control({ position: 'topright' });
catCtrl.onAdd = function () {
  const div = L.DomUtil.create('div', 'cat-panel leaflet-control'); // keep Leaflet control styling
  div.innerHTML = `
    <div class="strong">Categories</div>
    <label class="form-check d-flex align-items-center gap-2">
      <input id="toggle-edible" class="form-check-input" type="checkbox" checked>
      <span>Edible</span>
    </label>
    <label class="form-check d-flex align-items-center gap-2">
      <input id="toggle-poison" class="form-check-input" type="checkbox" checked>
      <span>Poisonous</span>
    </label>
  `;
  return div;
};
catCtrl.addTo(map);

  function setCategoryVisible(set, visible) {
    Object.keys(speciesGroupMap).forEach(name => {
      if (set.has(name)) {
        if (visible) {
          if (!map.hasLayer(speciesGroupMap[name])) map.addLayer(speciesGroupMap[name]);
        } else {
          if (map.hasLayer(speciesGroupMap[name])) map.removeLayer(speciesGroupMap[name]);
        }
      }
    });
  }

  // attach events
  setTimeout(() => {
    const edBox = document.getElementById('toggle-edible');
    const poBox = document.getElementById('toggle-poison');
    if (edBox && poBox) {
      edBox.addEventListener('change', () => setCategoryVisible(EDIBLE, edBox.checked));
      poBox.addEventListener('change', () => setCategoryVisible(POISONOUS, poBox.checked));
    }
  }, 0);

  // --- Outline restyle when theme changes ---
  function restyleOutlines() {
    const col = outlineColor();
    allRegionPolys.forEach(p => p.setStyle({ color: col }));
  }
  restyleOutlines();

  window.addEventListener('themechange', () => { setBaseByTheme(); restyleOutlines(); });
})();
