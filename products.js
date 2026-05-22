// ─── Products ────────────────────────────────────────────────────
// Set `img` to a path like "images/my-photo.jpg" for each product.
// Until you add your own photos, the site shows a neutral grey placeholder.
const products = [
  // Row 1 — featured (spans 2 cols) + 2 regular
  { id: 1,  name: "Wide Leg Cargo Pant",       price: "$148", badge: "New",   featured: true,  img: "" },
  { id: 2,  name: "Relaxed Straight Jean",      price: "$138",                                   img: "" },
  { id: 3,  name: "Pleated Trouser",            price: "$128",                                   img: "" },
  // Row 2
  { id: 4,  name: "Overdye Cargo Pant",         price: "$158", badge: "New",                     img: "" },
  { id: 5,  name: "Washed Wide Leg Jean",       price: "$138",                                   img: "" },
  { id: 6,  name: "Linen Wide Trousers",        price: "$118",                                   img: "" },
  { id: 7,  name: "Twill Cargo Pant",           price: "$148",                                   img: "" },
  // Row 3 — featured (spans 2 cols) + 2 regular
  { id: 8,  name: "Heritage Denim",             price: "$158", badge: "Best", featured: true,  img: "" },
  { id: 9,  name: "Utility Wide Pant",          price: "$138",                                   img: "" },
  { id: 10, name: "Relaxed Chino",              price: "$118",                                   img: "" },
  // Row 4
  { id: 11, name: "Double Pleat Trouser",       price: "$128",                                   img: "" },
  { id: 12, name: "Overdyed Baggy Jean",        price: "$148", badge: "New",                     img: "" },
  { id: 13, name: "Drawstring Wide Pant",       price: "$108",                                   img: "" },
  { id: 14, name: "Washed Cargo Pant",          price: "$158",                                   img: "" },
  // Row 5
  { id: 15, name: "Relaxed Linen Pant",         price: "$118",                                   img: "" },
  { id: 16, name: "Heavy Denim Baggy Jean",     price: "$168",                                   img: "" },
  { id: 17, name: "Military Cargo Pant",        price: "$158", badge: "Best",                    img: "" },
  { id: 18, name: "Pleated Wide Trouser",       price: "$128",                                   img: "" },
  // Row 6 — featured (spans 2 cols) + 2 regular
  { id: 19, name: "Vintage Wash Jean",          price: "$148", badge: "New",  featured: true,  img: "" },
  { id: 20, name: "Overdye Utility Pant",       price: "$138",                                   img: "" },
  { id: 21, name: "Relaxed Corduroy Trouser",   price: "$128",                                   img: "" },
  // Row 7
  { id: 22, name: "Balloon Fit Jean",           price: "$148",                                   img: "" },
  { id: 23, name: "Washed Black Cargo",         price: "$158",                                   img: "" },
  { id: 24, name: "Easy Wide Pant",             price: "$108",                                   img: "" },
  { id: 25, name: "Straight Leg Chino",         price: "$118",                                   img: "" },
];

function imgUrl(p) {
  return p.img || "";  // empty string → broken src → onerror shows grey placeholder
}

function buildGrid() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card" + (p.featured ? " featured" : "");
    const src = imgUrl(p);
    card.innerHTML = `
      <div class="product-image">
        <img
          ${src ? `src="${src}"` : ""}
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none'"
        >
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <p class="product-name">${p.name}</p>
        <p class="product-price">${p.price}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

buildGrid();
