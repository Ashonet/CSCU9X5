// Single source of truth used by Identification Guide + Quiz + (optionally) Map popups
window.MUSHROOMS_DB = [
    // ---- Edible (10) ----
    {
      name: "Chanterelle",
      latin: "Cantharellus cibarius",
      edible: true,
      sideEffects: "Generally safe; rare GI upset if undercooked.",
      found: "Deciduous & coniferous woods; mossy banks; summer–autumn.",
      img: "Photos/Mushrooms/Edible/Chanterelle.webp",
      description: "Golden, wavy ridges (false gills), fruity apricot aroma; often in groups.",
      aka: ["Girolle"],
      feature: "Wavy cap with false gills (ridges), fruity apricot scent.",
      cook: "Lightly sauté in butter; avoid overcooking."
    },
    {
      name: "Porcini",
      latin: "Boletus edulis",
      edible: true,
      sideEffects: "Rich but heavy; avoid very old specimens.",
      found: "With spruce, pine, birch, beech; late summer–autumn.",
      img: "Photos/Mushrooms/Edible/Porcini.jpg",
      description: "Bulky bolete, white pores turning yellow to green; thick white stalk with netting.",
      aka: ["Cep", "Penny Bun"],
      feature: "Bolete with pores (not gills); thick white stipe with netting.",
      cook: "Slice and pan-sear; great in risotto/pastas."
    },
    {
      name: "Hedgehog Mushroom",
      latin: "Hydnum repandum",
      edible: true,
      sideEffects: "Occasionally peppery; trim darkened spines.",
      found: "Deciduous & conifer woods; late summer–autumn.",
      img: "Photos/Mushrooms/Edible/Hedgehog Mushroom.jpg",
      description: "Spines (teeth) under the cap instead of gills; pale buff to orange.",
      aka: ["Wood Hedgehog"],
      feature: "Teeth/spines under the cap instead of gills.",
      cook: "Sauté; lovely in cream/garlic sauces."
    },
    {
      name: "Oyster Mushroom",
      latin: "Pleurotus ostreatus",
      edible: true,
      sideEffects: "Can cause mild GI upset in some; cook well.",
      found: "On dead hardwood; parks & woodlands; autumn–winter.",
      img: "Photos/Mushrooms/Edible/Oyster Mushroom.jpg",
      description: "Fan-shaped caps in shelves; decurrent gills; lilac-grey to beige.",
      aka: [],
      feature: "Fan-shaped shelves with decurrent gills.",
      cook: "Quick stir-fry/sauté; good in noodles or tacos."
    },
    {
      name: "Chicken of the Woods",
      latin: "Laetiporus sulphureus",
      edible: true,
      sideEffects: "Some react (esp. from yew/conifer hosts). Try small amounts first; cook thoroughly.",
      found: "On oak, yew, cherry; late spring–autumn.",
      img: "Photos/Mushrooms/Edible/Chicken of the Woods.jpg",
      description: "Bright sulphur-yellow/orange shelves; meaty texture.",
      aka: [],
      feature: "Bright sulphur-yellow/orange shelves; meaty texture.",
      cook: "Cut young pieces; pan-fry like chicken or use in curries."
    },
    {
      name: "Wood Blewit",
      latin: "Lepista nuda",
      edible: true,
      sideEffects: "Must be cooked; raw can cause GI upset. Some individuals sensitive.",
      found: "Leaf litter, compost, edges; autumn–winter.",
      img: "Photos/Mushrooms/Edible/Wood Blewit.jpg",
      description: "Lilac tones to cap & gills when fresh; stout pale stalk.",
      aka: ["Blue-leg"],
      feature: "Lilac tones on cap/gills when fresh.",
      cook: "Must be cooked thoroughly; simple sauté."
    },
    {
      name: "Field Mushroom",
      latin: "Agaricus campestris",
      edible: true,
      sideEffects: "Avoid yellow-staining, phenolic-smelling lookalikes (A. xanthodermus).",
      found: "Pasture & lawns; late summer–autumn.",
      img: "Photos/Mushrooms/Edible/Field Mushroom.jpg",
      description: "Pink gills maturing chocolate-brown; ring present; no volva.",
      aka: [],
      feature: "Pink gills maturing chocolate-brown; ring present; no volva.",
      cook: "Sauté or grill; classic breakfast mushroom."
    },
    {
      name: "St George’s Mushroom",
      latin: "Calocybe gambosa",
      edible: true,
      sideEffects: "Rich; a few report GI sensitivity.",
      found: "Grassy places, hedgerows; spring (around St George’s Day).",
      img: "Photos/Mushrooms/Edible/St George’s Mushroom.jpg",
      description: "Creamy, thick flesh; mealy (cucumber) smell; spring fruiter.",
      aka: [],
      feature: "Thick, creamy cap; mealy (cucumber) smell; spring fruiter.",
      cook: "Sauté; great in creamy sauces/omelettes."
    },
    {
      name: "Fairy Ring Champignon",
      latin: "Marasmius oreades",
      edible: true,
      sideEffects: "Delicate; take care not to mix with toxic funnels.",
      found: "Lawns, meadows; spring–autumn; forms rings.",
      img: "Photos/Mushrooms/Edible/Fairy Ring Champignon.jpg",
      description: "Small buff caps; widely spaced gills; tough, wiry stem.",
      aka: [],
      feature: "Widely spaced gills; tough wiry stem; small buff caps.",
      cook: "Best sautéed or dried for stock."
    },
    {
      name: "Giant Puffball",
      latin: "Calvatia gigantea",
      edible: true,
      sideEffects: "Edible only when flesh is pure white; discard once yellowing.",
      found: "Pasture, field edges; late summer–autumn.",
      img: "Photos/Mushrooms/Edible/Giant Puffball.jpg",
      description: "Huge white ball; no visible cap/gills; sliceable like tofu.",
      aka: [],
      feature: "Huge white ball; pure white interior when edible.",
      cook: "Slice thick slabs; pan-fry in butter/egg and breadcrumb."
    },
  
    // ---- Poisonous (10) ----
    {
      name: "Death Cap",
      latin: "Amanita phalloides",
      edible: false,
      sideEffects: "Deadly (amatoxins): delayed GI, liver/kidney failure.",
      found: "With oak, beech; summer–autumn; often in parks.",
      img: "Photos/Mushrooms/Poisonous/Death Cap.jpg",
      description: "Olive cap, white gills; ring & white volva at bulbous base.",
      aka: [],
      feature: "Olive cap; white gills; ring + white volva at bulbous base."
    },
    {
      name: "Destroying Angel",
      latin: "Amanita virosa",
      edible: false,
      sideEffects: "Deadly (amatoxins).",
      found: "Conifer/birch woods; summer–autumn.",
      img: "Photos/Mushrooms/Poisonous/Destroying Angel.jpg",
      description: "Pure white cap, gills & stem; ring and volva present.",
      aka: [],
      feature: "All white; ring and volva present; deadly amatoxins."
    },
    {
      name: "Fly Agaric",
      latin: "Amanita muscaria",
      edible: false,
      sideEffects: "Toxic: nausea, delirium; neuroactive compounds.",
      found: "Birch & pine; late summer–autumn.",
      img: "Photos/Mushrooms/Poisonous/Fly Agaric.jpg",
      description: "Iconic red cap with white warts; white gills; ring & volva.",
      aka: [],
      feature: "Red cap with white warts; ring + volva; toxic."
    },
    {
      name: "Panther Cap",
      latin: "Amanita pantherina",
      edible: false,
      sideEffects: "Toxic: atropine-like; delirium, nausea.",
      found: "Mixed woods; summer–autumn.",
      img: "Photos/Mushrooms/Poisonous/Panther Cap.jpg",
      description: "Brown cap with neat white warts; white gills; ring & volva.",
      aka: [],
      feature: "Brown cap with neat white warts; ring + volva; toxic."
    },
    {
      name: "Funeral Bell (Deadly Galerina)",
      latin: "Galerina marginata",
      edible: false,
      sideEffects: "Deadly (amatoxins).",
      found: "On rotting wood; year-round in clumps.",
      img: "Photos/Mushrooms/Poisonous/Funeral Bell (Deadly Galerina).jpg",
      description: "Small brown caps; rusty gills; ring sometimes present.",
      aka: ["Deadly Galerina"],
      feature: "Small brown caps; rusty gills; sometimes a ring; deadly amatoxins."
    },
    {
      name: "Fool’s Funnel",
      latin: "Clitocybe rivulosa",
      edible: false,
      sideEffects: "Toxic (muscarine): sweating, salivation, GI upset.",
      found: "Lawns, parks, dunes; summer–winter.",
      img: "Photos/Mushrooms/Poisonous/Fool’s Funnel.jpg",
      description: "Whitish funnel cap; crowded decurrent gills; forms rings.",
      aka: ["Ivory Funnel"],
      feature: "Whitish funnel cap; decurrent crowded gills; muscarine."
    },
    {
      name: "Deadly Webcap",
      latin: "Cortinarius rubellus",
      edible: false,
      sideEffects: "Deadly (orellanine): kidney failure, delayed onset.",
      found: "Conifers, heaths; late summer–autumn.",
      img: "Photos/Mushrooms/Poisonous/Deadly Webcap.jpg",
      description: "Rusty-orange cap; cobwebby cortina; rusty-brown spores.",
      aka: [],
      feature: "Rusty-orange cap; cobwebby cortina; orellanine toxin."
    },
    {
      name: "Deadly Fibrecap",
      latin: "Inosperma erubescens",
      edible: false,
      sideEffects: "Deadly (muscarine).",
      found: "Calcareous woods, parks; summer–autumn.",
      img: "Photos/Mushrooms/Poisonous/Deadly Fibrecap.jpg",
      description: "Pale cap that reddens when bruised; fibrillose stem.",
      aka: ["Inocybe patouillardii"],
      feature: "Pale cap reddening when bruised; fibrillose stem; muscarine."
    },
    {
      name: "Sulphur Tuft",
      latin: "Hypholoma fasciculare",
      edible: false,
      sideEffects: "Poisonous: bitter taste, GI upset.",
      found: "On stumps/logs in dense clusters; most of the year.",
      img: "Photos/Mushrooms/Poisonous/Sulphur Tuft.jpg",
      description: "Sulphur-yellow caps with darker centres; greenish gills with age.",
      aka: [],
      feature: "Sulphur-yellow caps; darker centres; greenish gills with age."
    },
    {
      name: "Yellow Stainer",
      latin: "Agaricus xanthodermus",
      edible: false,
      sideEffects: "Causes GI upset; phenolic/ink smell when crushed.",
      found: "Parks, gardens; summer–autumn.",
      img: "Photos/Mushrooms/Poisonous/Yellow Stainer.jpg",
      description: "Looks like field mushroom but turns chrome yellow at base on bruising.",
      aka: [],
      feature: "Base bruises chrome-yellow; phenolic/ink smell; GI upset."
    }
  ];
  