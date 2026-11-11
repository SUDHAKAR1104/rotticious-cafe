/**
 * Rotticious Cafe — Master Application Logic
 * Interactive Branch Selector, Live Hours Calculator, Menu Filter, Cart & Reservation System
 */

document.addEventListener('DOMContentLoaded', () => {
  initBranchSelector();
  initMenu();
  initCart();
  initModals();
  initPerksAndNewsletter();
  initNavigation();
});

/* ==========================================================================
   1. BRANCH DATA & LIVE HOURS CALCULATOR
   ========================================================================== */

const branchData = {
  thiruvanmiyur: {
    id: "thiruvanmiyur",
    name: "Thiruvanmiyur Beach Flagship",
    vibe: "Beach-View Rooftop • Mini Art Museum • Adjacent Sports Turf",
    rating: "4.8 ★ (29 reviews)",
    address: "111, Thiruvanmiyur Beach, Valmiki Nagar, Kottivakkam, Chennai 600041",
    phone: "+91 97890 01434",
    phoneRaw: "919789001434",
    pricing: "~₹400–₹1,100 for two",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    features: [
      { icon: "fa-water", text: "Panoramic Sea-Facing Rooftop" },
      { icon: "fa-palette", text: "Brand Journey Art Museum" },
      { icon: "fa-futbol", text: "Adjacent Sports Turf" },
      { icon: "fa-wifi", text: "Free 300Mbps Wi-Fi" },
      { icon: "fa-motorcycle", text: "Weekend Biker Morning Pitstop" },
      { icon: "fa-sun", text: "Opens 6 AM on Mondays, 7 AM Sundays" }
    ],
    hoursDisplay: "Mon: 6 AM–11 PM | Tue–Fri: 10 AM–11 PM | Sat: 10 AM–12 AM | Sun: 7 AM–11 PM",
    mapUrl: "https://maps.google.com/?q=111+Thiruvanmiyur+Beach+Valmiki+Nagar+Kottivakkam+Chennai+600041",
    checkOpenStatus: () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sun, 1 is Mon, 6 is Sat
      const currentHour = now.getHours() + now.getMinutes() / 60;

      let openHour = 10;
      let closeHour = 23;

      if (day === 1) { // Mon
        openHour = 6;
        closeHour = 23;
      } else if (day === 0) { // Sun
        openHour = 7;
        closeHour = 23;
      } else if (day === 6) { // Sat
        openHour = 10;
        closeHour = 24;
      } else { // Tue-Fri
        openHour = 10;
        closeHour = 23;
      }

      if (currentHour >= openHour && currentHour < closeHour) {
        const hoursLeft = closeHour - currentHour;
        if (hoursLeft <= 1) {
          return { status: "open", text: `Closing Soon (at ${formatTime(closeHour)})`, class: "warning" };
        }
        return { status: "open", text: `Open Now • Closes at ${formatTime(closeHour)}`, class: "open" };
      } else {
        return { status: "closed", text: `Closed • Opens at ${formatTime(openHour)}`, class: "closed" };
      }
    }
  },

  sholinganallur: {
    id: "sholinganallur",
    name: "Sholinganallur (OMR Hub)",
    vibe: "Rustic Work-Friendly Theme • Live Music Nights • Indoor & Outdoor Patios",
    rating: "4.4 ★ (169 reviews)",
    address: "151, Rajiv Gandhi Salai, OMR, Sholinganallur, Chennai 600119",
    phone: "+91 95396 96750",
    phoneRaw: "919539696750",
    pricing: "~₹400–₹1,200 for two",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    features: [
      { icon: "fa-laptop-code", text: "Laptop-Friendly with Free Gigabit Wi-Fi" },
      { icon: "fa-plug", text: "Universal Power Sockets at Every Booth" },
      { icon: "fa-music", text: "Live Music Jam Nights (Fri - Sun)" },
      { icon: "fa-tree", text: "Spacious Rustic Outdoor Garden Seating" },
      { icon: "fa-car", text: "Dedicated Valet & Bike Parking on OMR" }
    ],
    hoursDisplay: "Mon–Thu: 11 AM – 11 PM | Fri–Sun: 11 AM – 11:30 PM",
    mapUrl: "https://maps.google.com/?q=151+Rajiv+Gandhi+Salai+OMR+Sholinganallur+Chennai+600119",
    checkOpenStatus: () => {
      const now = new Date();
      const day = now.getDay();
      const currentHour = now.getHours() + now.getMinutes() / 60;
      const openHour = 11;
      const closeHour = (day === 5 || day === 6 || day === 0) ? 23.5 : 23;

      if (currentHour >= openHour && currentHour < closeHour) {
        return { status: "open", text: `Open Now • Closes at ${formatTime(closeHour)}`, class: "open" };
      } else {
        return { status: "closed", text: `Closed • Opens at 11:00 AM`, class: "closed" };
      }
    }
  },

  royapettah: {
    id: "royapettah",
    name: "Royapettah Landmark",
    vibe: "Original Cafe Hub • Master Artisanal Bakery Counter • Family Friendly",
    rating: "4.0 ★ (892 reviews)",
    address: "Thiru-vi-ka Rd, Peters Colony, Royapettah (Opp. Sathyam Cinemas), Chennai 600014",
    phone: "+91 87544 49754 / 044-48503030",
    phoneRaw: "918754449754",
    pricing: "~₹400–₹850 for two",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    features: [
      { icon: "fa-bread-slice", text: "Live Artisanal Bakery Counter" },
      { icon: "fa-film", text: "Directly Opposite Sathyam Cinemas" },
      { icon: "fa-wheelchair", text: "Wheelchair Accessible & Ramp Entrance" },
      { icon: "fa-users", text: "Family-Friendly Cozy Booths" },
      { icon: "fa-truck-fast", text: "Express Delivery till 9:00 PM" }
    ],
    hoursDisplay: "Mon–Sun: 10 AM – 11 PM (Delivery till 9 PM)",
    mapUrl: "https://maps.google.com/?q=Thiru-vi-ka+Rd+Royapettah+Opp+Sathyam+Cinemas+Chennai+600014",
    checkOpenStatus: () => {
      const now = new Date();
      const currentHour = now.getHours() + now.getMinutes() / 60;
      const openHour = 10;
      const closeHour = 23;

      if (currentHour >= openHour && currentHour < closeHour) {
        return { status: "open", text: `Open Now • Closes at 11:00 PM`, class: "open" };
      } else {
        return { status: "closed", text: `Closed • Opens at 10:00 AM`, class: "closed" };
      }
    }
  }
};

function formatTime(decimalHour) {
  if (decimalHour === 24) return "12:00 AM";
  const hours = Math.floor(decimalHour);
  const minutes = Math.round((decimalHour - hours) * 60);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes ? `:${minutes < 10 ? '0' : ''}${minutes}` : ':00';
  return `${displayHours}${displayMinutes} ${period}`;
}

function initBranchSelector() {
  const tabs = document.querySelectorAll('.branch-tab');
  const container = document.getElementById('branchCard');

  function renderBranch(branchKey) {
    const b = branchData[branchKey];
    if (!b) return;

    const liveStatus = b.checkOpenStatus();

    container.innerHTML = `
      <div class="branch-layout">
        <div class="branch-media">
          <img src="${b.image}" alt="${b.name}" loading="lazy">
          <div class="branch-overlay-badge">
            <span class="status-indicator ${liveStatus.status === 'open' ? '' : 'closed'}"></span>
            <span>${liveStatus.text}</span>
          </div>
        </div>

        <div class="branch-details">
          <div>
            <div class="branch-header-meta">
              <h3 class="branch-name">${b.name}</h3>
              <span class="branch-rating-badge"><i class="fa-solid fa-star"></i> ${b.rating}</span>
            </div>
            
            <p class="branch-vibe-tag"><i class="fa-solid fa-sparkles text-gold"></i> ${b.vibe}</p>

            <div class="branch-info-grid">
              <div class="info-box">
                <strong><i class="fa-solid fa-location-dot"></i> Address</strong>
                <span>${b.address}</span>
              </div>
              <div class="info-box">
                <strong><i class="fa-regular fa-clock"></i> Operating Hours</strong>
                <span>${b.hoursDisplay}</span>
              </div>
              <div class="info-box">
                <strong><i class="fa-solid fa-phone"></i> Reservations & Call</strong>
                <a href="tel:${b.phone.split('/')[0].trim()}">${b.phone}</a>
              </div>
              <div class="info-box">
                <strong><i class="fa-solid fa-wallet"></i> Average Pricing</strong>
                <span>${b.pricing}</span>
              </div>
            </div>

            <div class="branch-features-chips">
              ${b.features.map(f => `
                <span class="feature-chip"><i class="fa-solid ${f.icon}"></i> ${f.text}</span>
              `).join('')}
            </div>
          </div>

          <div class="branch-action-bar">
            <button class="btn btn-primary" onclick="openReservationModal('${b.id}')">
              <i class="fa-regular fa-calendar-check"></i> Reserve at ${b.id === 'thiruvanmiyur' ? 'Rooftop Beach' : b.name.split(' ')[0]}
            </button>
            <a href="${b.mapUrl}" target="_blank" rel="noreferrer" class="btn btn-outline">
              <i class="fa-solid fa-diamond-turn-right"></i> Get Directions
            </a>
            <a href="https://wa.me/${b.phoneRaw}?text=Hi%20Rotticious%20${b.name}!%20I%20would%20like%20to%20inquire%20about%20a%20table." target="_blank" rel="noreferrer" class="btn btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> Chat Branch
            </a>
          </div>
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const branchKey = tab.getAttribute('data-branch');
      renderBranch(branchKey);
    });
  });

  // Render first branch by default
  renderBranch('thiruvanmiyur');
}

/* ==========================================================================
   2. CURATED MENU DATA & FILTER ENGINE
   ========================================================================== */

const menuDataset = [
  // 100% Chikmagalur Coffee & Beverages
  {
    id: "bev-1",
    name: "Spanish Iced Latte",
    category: "coffee",
    categoryLabel: "100% Chikmagalur Brew",
    price: 240,
    diet: "veg",
    tag: "Signature",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80",
    description: "Double espresso from Chikmagalur Arabica layered with sweet condensed milk, cold milk & cracked ice."
  },
  {
    id: "bev-2",
    name: "Espresso Float",
    category: "coffee",
    categoryLabel: "Artisan Dessert Coffee",
    price: 260,
    diet: "veg",
    tag: "Customer Favorite",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80",
    description: "Rich dark roast single-estate espresso poured tableside over two scoops of velvety Madagascan vanilla gelato."
  },
  {
    id: "bev-3",
    name: "Classic Americano",
    category: "coffee",
    categoryLabel: "Chikmagalur Specialty",
    price: 160,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
    description: "Double shot of single-estate Chikmagalur espresso pulled over pure hot mountain water. Notes of cocoa & toasted almond."
  },
  {
    id: "bev-4",
    name: "Belgian Hot Chocolate",
    category: "coffee",
    categoryLabel: "Specialty Sips",
    price: 210,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=700&q=80",
    description: "Slow-melted Belgian dark chocolate whisked with steaming whole milk and topped with toasted mini marshmallows."
  },
  {
    id: "bev-5",
    name: "Dark Mocha",
    category: "coffee",
    categoryLabel: "100% Chikmagalur Brew",
    price: 220,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=80",
    description: "Single-estate espresso blended with rich dark cocoa ganache and silky microfoam, dusted with Valrhona cocoa."
  },
  {
    id: "bev-6",
    name: "Iced Milo Dinosaur",
    category: "coffee",
    categoryLabel: "Chilled Refreshers",
    price: 190,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1558857563-b37df262494f?auto=format&fit=crop&w=700&q=80",
    description: "Nostalgic malted chocolate shake topped with a generous heap of undissolved Milo powder and crushed ice."
  },
  {
    id: "bev-7",
    name: "Assam Brown Sugar Boba Tea",
    category: "coffee",
    categoryLabel: "Boba Specialty",
    price: 230,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=700&q=80",
    description: "Strong Assam black tea brewed fresh with creamy milk, brown sugar flame torched drip, and slow-cooked tapioca boba."
  },
  {
    id: "bev-8",
    name: "Nutella Thickshake",
    category: "coffee",
    categoryLabel: "Indulgent Shakes",
    price: 250,
    diet: "veg",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
    description: "Rich swirl of authentic Ferrero Nutella blended with rich dairy ice cream, crushed roasted hazelnuts & whipped cream."
  },
  {
    id: "bev-9",
    name: "Watermelon Mojito",
    category: "coffee",
    categoryLabel: "Coastal Coolers",
    price: 120,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
    description: "Muddled fresh watermelon chunks, garden mint, squeezed lime juice, and carbonated soda over crushed ice."
  },

  // Signature Steaks & Mains
  {
    id: "steak-1",
    name: "Chicken Steak in Southern Spice",
    category: "steaks",
    categoryLabel: "Signature Steaks & Mains",
    price: 499,
    diet: "non-veg",
    tag: "Chef's Signature",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80",
    description: "Pan-grilled tender chicken breast basted in Chettinad-peppercorn jus, served with garlic mashed potatoes & buttered veggies."
  },
  {
    id: "steak-2",
    name: "Chicken Steak in Brown Sauce",
    category: "steaks",
    categoryLabel: "Signature Steaks & Mains",
    price: 489,
    diet: "non-veg",
    tag: "Classic",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    description: "Herb-marinated chicken breast seared to juicy perfection, smothered in slow-simmered caramelized onion demi-glace."
  },
  {
    id: "steak-3",
    name: "Chicken Steak in Creamy Pesto Sauce",
    category: "steaks",
    categoryLabel: "Signature Steaks & Mains",
    price: 519,
    diet: "non-veg",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80",
    description: "Grilled chicken fillet blanketed with fresh Italian basil-pine nut velouté, served with charred cherry tomatoes."
  },
  {
    id: "steak-4",
    name: "Chicken Steak in Lemon Francaise",
    category: "steaks",
    categoryLabel: "Signature Steaks & Mains",
    price: 649,
    diet: "non-veg",
    tag: "Chef's Premium",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80",
    description: "Parmesan & egg-dipped chicken breast gently sautéed in a silky white butter, lemon reduction, and caper sauce."
  },
  {
    id: "steak-5",
    name: "Chicken Cordon Bleu",
    category: "steaks",
    categoryLabel: "Signature Steaks & Mains",
    price: 549,
    diet: "non-veg",
    tag: "Signature",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=700&q=80",
    description: "Golden panko-crusted chicken rolled with smoked melted cheese and herb butter, served with dijon cream sauce."
  },
  {
    id: "steak-6",
    name: "Chicken Parmigiana",
    category: "steaks",
    categoryLabel: "Signature Steaks & Mains",
    price: 529,
    diet: "non-veg",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=700&q=80",
    description: "Crispy chicken schnitzel coated in artisanal marinara sauce, melted buffalo mozzarella, and aged parmesan crust."
  },
  {
    id: "steak-7",
    name: "Prawn Aglio e Olio",
    category: "steaks",
    categoryLabel: "Gourmet Pasta & Mains",
    price: 479,
    diet: "non-veg",
    tag: "Coastal Special",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80",
    description: "Spaghetti tossed in cold-pressed extra virgin olive oil, slivered golden garlic, chili flakes, and butter-seared coastal prawns."
  },

  // Neapolitan Pizzas & Burgers
  {
    id: "pizza-1",
    name: "Handmade Seafood Pizza",
    category: "pizzas",
    categoryLabel: "Wood-Fired Neapolitan",
    price: 520,
    diet: "non-veg",
    tag: "Coastal Flagship",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
    description: "48-hour slow fermented dough, San Marzano tomato puree, buffalo mozzarella, fresh squids, prawns, and fragrant oregano."
  },
  {
    id: "pizza-2",
    name: "Grilled Chicken Neapolitan Pizza",
    category: "pizzas",
    categoryLabel: "Wood-Fired Neapolitan",
    price: 440,
    diet: "non-veg",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    description: "Char-crusted artisan crust loaded with smoky grilled chicken bits, roasted bell peppers, red onion & creamy mozzarella."
  },
  {
    id: "pizza-3",
    name: "Classic Margherita Pizza",
    category: "pizzas",
    categoryLabel: "Wood-Fired Neapolitan",
    price: 180,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    description: "San Marzano sauce, fresh torn basil leaves, extra virgin olive oil drizzle, and molten bocconcini mozzarella cheese."
  },
  {
    id: "burger-1",
    name: "Nashville Spiced Chicken Burger",
    category: "pizzas",
    categoryLabel: "Gourmet Burgers",
    price: 340,
    diet: "non-veg",
    tag: "Spicy Favorite",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    description: "Double buttermilk-dunked crispy chicken thigh tossed in cayenne-paprika oil, served with tangy slaw & pickles on brioche."
  },
  {
    id: "burger-2",
    name: "Double Chicken Chipotle Burger",
    category: "pizzas",
    categoryLabel: "Gourmet Burgers",
    price: 380,
    diet: "non-veg",
    tag: "Heavy Hitter",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
    description: "Twin seared chicken patties, double cheddar slices, smoky Mexican chipotle mayonnaise, and crisp butterhead lettuce."
  },
  {
    id: "burger-3",
    name: "Golden Fish Burger",
    category: "pizzas",
    categoryLabel: "Gourmet Burgers",
    price: 360,
    diet: "non-veg",
    tag: "Coastal Special",
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=700&q=80",
    description: "Fresh crumb-fried sea bass fillet, house-whipped caper tartare sauce, pickled gherkins, and melted American cheese."
  },
  {
    id: "wrap-1",
    name: "Crispy Fried Chicken Porotta Wraps",
    category: "pizzas",
    categoryLabel: "Chennai Fusion Wraps",
    price: 280,
    diet: "non-veg",
    tag: "Chef's Signature",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80",
    description: "Southern spiced crunchy chicken tenders layered with Malabar flaky porotta, mint mayo, pickled onions & lime squeeze."
  },
  {
    id: "wrap-2",
    name: "Rotticious Club Sandwich",
    category: "pizzas",
    categoryLabel: "Artisanal Breads",
    price: 260,
    diet: "veg",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    description: "Triple-decker artisan toasted bread with crispy lettuce, English cucumber, heirloom tomatoes, and cheddar spread."
  },

  // Artisanal Bakery & Desserts
  {
    id: "bake-1",
    name: "Lotus Biscoff Signature Cake",
    category: "bakery",
    categoryLabel: "Artisanal Bakery & Desserts",
    price: 240,
    diet: "veg",
    tag: "Chef's Signature",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    description: "Layers of spiced Belgian Biscoff sponge infused with caramelized biscuit butter and light white chocolate mousse."
  },
  {
    id: "bake-2",
    name: "Classic New York Cheesecake",
    category: "bakery",
    categoryLabel: "Artisanal Bakery & Desserts",
    price: 90,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
    description: "Silky baked cream cheese custard over an artisanal buttery graham cracker crust. Best enjoyed with our espresso."
  },
  {
    id: "bake-3",
    name: "Artisan Chocolate Bread Loaf",
    category: "bakery",
    categoryLabel: "Handcrafted Bakery",
    price: 160,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
    description: "Warm braided slow-fermented brioche loaf folded with semi-sweet dark chocolate morsels. Baked fresh every morning."
  },
  {
    id: "bake-4",
    name: "Glazed Cinnamon Buns",
    category: "bakery",
    categoryLabel: "Handcrafted Bakery",
    price: 140,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=700&q=80",
    description: "Soft pillowy dough rolled with aromatic Ceylon cinnamon and brown sugar, topped with rich cream cheese drizzle."
  },
  {
    id: "bake-5",
    name: "Belgian Chocolate Donuts",
    category: "bakery",
    categoryLabel: "Handcrafted Bakery",
    price: 110,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=700&q=80",
    description: "Brioche ring donuts filled with smooth chocolate ganache and dipped in glossy dark chocolate glaze."
  },
  {
    id: "bake-6",
    name: "Fudgy Chocolate Brownie",
    category: "bakery",
    categoryLabel: "Artisanal Bakery & Desserts",
    price: 130,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    description: "Crackle-topped decadent double chocolate brownie served warm with a drizzle of salted caramel."
  },
  {
    id: "bake-7",
    name: "Artisanal Rusk & Almond Biscotti",
    category: "bakery",
    categoryLabel: "Traditional Bakes",
    price: 90,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80",
    description: "Twice-baked cardamom infused milk rusks and roasted almond cookies, the ultimate companion for hot Chikmagalur coffee."
  },

  // Small Plates & Sides
  {
    id: "side-1",
    name: "BBQ Glazed Chicken Wings",
    category: "sides",
    categoryLabel: "Small Plates & Appetizers",
    price: 409,
    diet: "non-veg",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80",
    description: "Crispy fried chicken wings smothered in sticky house hickory smoke barbecue sauce with ranch dipping."
  },
  {
    id: "side-2",
    name: "Honey Garlic Chicken Wings",
    category: "sides",
    categoryLabel: "Small Plates & Appetizers",
    price: 389,
    diet: "non-veg",
    tag: "Crowd Favorite",
    image: "https://images.unsplash.com/photo-1527477378370-13f56bca7f78?auto=format&fit=crop&w=700&q=80",
    description: "Crispy chicken wings glazed in wild forest honey, minced caramelized garlic, and toasted white sesame seeds."
  },
  {
    id: "side-3",
    name: "Peri Peri Hand-Cut Fries",
    category: "sides",
    categoryLabel: "Small Plates & Appetizers",
    price: 190,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
    description: "Golden crispy skin-on potato fries dusted in zesty African bird's eye chili spice mix, served with garlic dip."
  },
  {
    id: "side-4",
    name: "Molten Garlic Cheese Toast",
    category: "sides",
    categoryLabel: "Small Plates & Appetizers",
    price: 180,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=700&q=80",
    description: "Thick sourdough slices baked with roasted garlic herb butter, shredded mozzarella, and yellow cheddar cheese."
  },
  {
    id: "side-5",
    name: "Crisp Caesar Salad",
    category: "sides",
    categoryLabel: "Fresh Bowls",
    price: 130,
    diet: "veg",
    tag: "Under ₹250",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=700&q=80",
    description: "Fresh romaine lettuce hearts, garlic sourdough croutons, shaved parmesan flakes, and classic Caesar dressing."
  }
];

let activeCategory = 'all';
let activeDiet = 'all';
let activeSearchQuery = '';

function initMenu() {
  const grid = document.getElementById('menuGrid');
  const catButtons = document.querySelectorAll('.category-btn');
  const dietButtons = document.querySelectorAll('.filter-chip');
  const searchInput = document.getElementById('menuSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  function renderMenu() {
    let filtered = menuDataset.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary & Attribute filter
      if (activeDiet === 'veg' && item.diet !== 'veg') return false;
      if (activeDiet === 'non-veg' && item.diet !== 'non-veg') return false;
      if (activeDiet === 'signature' && !item.tag.toLowerCase().includes('signature')) return false;
      if (activeDiet === 'budget' && item.price > 250) return false;

      // Search query
      if (activeSearchQuery.trim() !== '') {
        const q = activeSearchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-mug-saucer" style="font-size: 3rem; color: var(--color-border); margin-bottom: 16px;"></i>
          <h3 style="color: var(--color-espresso-900); font-family: var(--font-serif); margin-bottom: 8px;">No Delicious Items Found</h3>
          <p style="color: var(--color-muted-text); margin-bottom: 20px;">We couldn't find items matching "${activeSearchQuery}". Try clearing your filters.</p>
          <button class="btn btn-primary" onclick="resetMenuFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="menu-card" data-id="${item.id}">
        <div class="card-media">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="card-badges">
            <span class="card-tag ${item.tag.toLowerCase().includes('signature') ? 'signature' : ''}">${item.tag}</span>
            <div class="diet-pill">
              <span class="${item.diet === 'veg' ? 'veg-badge' : 'nonveg-badge'}" title="${item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
            </div>
          </div>
        </div>

        <div class="card-content">
          <div class="card-title-row">
            <h4 class="item-title">${item.name}</h4>
            <span class="item-price">₹${item.price}</span>
          </div>
          <p class="item-desc">${item.description}</p>
          
          <div class="card-footer">
            <span class="card-category-label">${item.categoryLabel}</span>
            <button class="btn-add-cart" onclick="addToCart('${item.id}')">
              <i class="fa-solid fa-plus"></i> Add
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Category tab clicks
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderMenu();
    });
  });

  // Dietary filter clicks
  dietButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dietButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDiet = btn.getAttribute('data-diet');
      renderMenu();
    });
  });

  // Search input
  searchInput.addEventListener('input', (e) => {
    activeSearchQuery = e.target.value;
    clearBtn.style.display = activeSearchQuery.length > 0 ? 'block' : 'none';
    renderMenu();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    activeSearchQuery = '';
    clearBtn.style.display = 'none';
    renderMenu();
  });

  window.resetMenuFilters = () => {
    activeCategory = 'all';
    activeDiet = 'all';
    activeSearchQuery = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    catButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
    dietButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-diet') === 'all'));
    renderMenu();
  };

  renderMenu();
}

/* ==========================================================================
   3. CART & ORDER DRAWER (STARBUCKS MOBILE ORDER EXPERIENCE)
   ========================================================================== */

let cart = [];

function initCart() {
  const btnOpenCart = document.getElementById('btnOpenCart');
  const btnCloseCart = document.getElementById('btnCloseCart');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const btnStartOrdering = document.getElementById('btnStartOrdering');
  const btnCheckoutWhatsApp = document.getElementById('btnCheckoutWhatsApp');
  const btnCheckoutDelivery = document.getElementById('btnCheckoutDelivery');
  const btnHeaderOrder = document.getElementById('btnHeaderOrder');
  const btnMobileOrder = document.getElementById('btnMobileOrder');

  function openCart() {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnOpenCart.addEventListener('click', openCart);
  btnCloseCart.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  if (btnStartOrdering) {
    btnStartOrdering.addEventListener('click', () => {
      closeCart();
      const menuSec = document.getElementById('menu');
      if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnHeaderOrder) {
    btnHeaderOrder.addEventListener('click', () => {
      openDeliveryModal('Select Service');
    });
  }

  if (btnMobileOrder) {
    btnMobileOrder.addEventListener('click', () => {
      closeMobileMenu();
      openDeliveryModal('Select Service');
    });
  }

  // Checkout via WhatsApp with itemized invoice
  btnCheckoutWhatsApp.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    let message = `*☕ ROTTICIOUS CAFE ORDER INQUIRY*\n`;
    message += `---------------------------------\n`;
    cart.forEach(item => {
      message += `• ${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
    });
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    message += `---------------------------------\n`;
    message += `Subtotal: ₹${subtotal}\n`;
    message += `Taxes (5% GST): ₹${tax}\n`;
    message += `*Grand Total: ₹${total}*\n\n`;
    message += `Please confirm preparation time & delivery address.\n#rottikaappicake`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919789001434?text=${encoded}`, '_blank');
    showToast('Redirecting to WhatsApp to complete your order!', 'success');
  });

  btnCheckoutDelivery.addEventListener('click', () => {
    closeCart();
    openDeliveryModal('Swiggy / Zomato');
  });

  window.addToCart = (itemId) => {
    const item = menuDataset.find(m => m.id === itemId);
    if (!item) return;

    const existing = cart.find(c => c.id === itemId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }

    updateCartUI();
    showToast(`Added "${item.name}" to your order tray!`, 'success');
  };

  window.changeCartQty = (itemId, delta) => {
    const existing = cart.find(c => c.id === itemId);
    if (!existing) return;

    existing.qty += delta;
    if (existing.qty <= 0) {
      cart = cart.filter(c => c.id !== itemId);
    }

    updateCartUI();
  };

  window.removeFromCart = (itemId) => {
    cart = cart.filter(c => c.id !== itemId);
    updateCartUI();
    showToast('Item removed from tray.', 'info');
  };
}

function updateCartUI() {
  const badge = document.getElementById('cartCountBadge');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartFooter = document.getElementById('cartFooter');
  const cartSubtitle = document.getElementById('cartSubtitle');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTax = document.getElementById('cartTax');
  const cartTotal = document.getElementById('cartTotal');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalCount;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '';
    if (cartEmptyState) cartEmptyState.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    if (cartSubtitle) cartSubtitle.textContent = '0 items selected';
    return;
  }

  if (cartEmptyState) cartEmptyState.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';
  if (cartSubtitle) cartSubtitle.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''} in tray`;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  cartSubtotal.textContent = `₹${subtotal}`;
  cartTax.textContent = `₹${tax}`;
  cartTotal.textContent = `₹${total}`;

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">₹${item.price * item.qty} <small style="color:var(--color-muted-text); font-weight:normal;">(₹${item.price} each)</small></div>
      </div>
      <div class="cart-qty-ctrl">
        <button class="qty-btn" onclick="changeCartQty('${item.id}', -1)" aria-label="Decrease">&minus;</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeCartQty('${item.id}', 1)" aria-label="Increase">&plus;</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove item">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

/* ==========================================================================
   4. TABLE RESERVATION & DELIVERY MODALS
   ========================================================================== */

function initModals() {
  const reservationModal = document.getElementById('reservationModal');
  const btnCloseReservation = document.getElementById('btnCloseReservation');
  const btnCancelRes = document.getElementById('btnCancelRes');
  const reservationForm = document.getElementById('reservationForm');
  const resDateInput = document.getElementById('resDate');

  // Set default reservation date to today or tomorrow
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }

  // Reservation triggers
  const resTriggers = [
    document.getElementById('btnOpenReserve'),
    document.getElementById('btnHeroReserve'),
    document.getElementById('btnBannerReserve'),
    document.getElementById('fabReserveBtn'),
    document.getElementById('btnMobileReserve'),
    document.getElementById('footerReserveLink')
  ];

  resTriggers.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        closeMobileMenu();
        openReservationModal('thiruvanmiyur');
      });
    }
  });

  window.openReservationModal = (branchId = 'thiruvanmiyur') => {
    const branchSelect = document.getElementById('resBranch');
    if (branchSelect && branchId) {
      branchSelect.value = branchId;
    }
    reservationModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeReservationModal() {
    reservationModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (btnCloseReservation) btnCloseReservation.addEventListener('click', closeReservationModal);
  if (btnCancelRes) btnCancelRes.addEventListener('click', closeReservationModal);

  reservationModal.addEventListener('click', (e) => {
    if (e.target === reservationModal) closeReservationModal();
  });

  // Handle Form Submission
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const branchVal = document.getElementById('resBranch').value;
    const branchName = branchData[branchVal] ? branchData[branchVal].name : branchVal;
    const dateVal = document.getElementById('resDate').value;
    const timeVal = document.getElementById('resTime').value;
    const guestsVal = document.getElementById('resGuests').value;
    const seatingVal = document.getElementById('resSeating').value;
    const nameVal = document.getElementById('resName').value;
    const phoneVal = document.getElementById('resPhone').value;
    const notesVal = document.getElementById('resNotes').value;

    const bookingRef = "ROT-" + Math.floor(100000 + Math.random() * 900000);

    closeReservationModal();

    // Show Confirmation Dialog & Prompt to forward to WhatsApp
    const waText = `Hi Rotticious! I just submitted a table reservation:\n\n*Booking Ref:* ${bookingRef}\n*Branch:* ${branchName}\n*Date:* ${dateVal}\n*Time:* ${timeVal}\n*Guests:* ${guestsVal}\n*Seating:* ${seatingVal}\n*Name:* ${nameVal}\n*Phone:* ${phoneVal}\n*Notes:* ${notesVal || 'None'}\n\nPlease confirm my reservation!`;

    const sendToWA = confirm(`🎉 Table Reservation Received!\n\nReference: ${bookingRef}\nLocation: ${branchName}\nGuests: ${guestsVal}\nTime: ${timeVal} on ${dateVal}\n\nWould you like to forward this instant booking to Rotticious WhatsApp for VIP confirmation?`);

    if (sendToWA) {
      window.open(`https://wa.me/919789001434?text=${encodeURIComponent(waText)}`, '_blank');
    }

    showToast(`Reservation confirmed for ${nameVal}! Ref: ${bookingRef}`, 'success');
    reservationForm.reset();
  });

  // Delivery Modal
  const deliveryModal = document.getElementById('deliveryModal');
  const btnCloseDelivery = document.getElementById('btnCloseDelivery');
  const btnHeroDelivery = document.getElementById('btnHeroDelivery');
  const btnBannerWhatsApp = document.getElementById('btnBannerWhatsApp');

  window.openDeliveryModal = (platformName = 'Direct') => {
    const title = document.getElementById('deliveryModalTitle');
    if (title) title.textContent = `Order Rotticious (${platformName})`;
    deliveryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeDeliveryModal() {
    deliveryModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (btnCloseDelivery) btnCloseDelivery.addEventListener('click', closeDeliveryModal);
  if (btnHeroDelivery) btnHeroDelivery.addEventListener('click', () => openDeliveryModal('Express Delivery'));
  if (btnBannerWhatsApp) {
    btnBannerWhatsApp.addEventListener('click', () => {
      window.open('https://wa.me/919789001434?text=Hi%20Rotticious!%20I%20would%20like%20to%20book%20a%20table%20at%20Thiruvanmiyur%20Beach%20Rooftop.', '_blank');
    });
  }

  deliveryModal.addEventListener('click', (e) => {
    if (e.target === deliveryModal) closeDeliveryModal();
  });

  // Custom Catering WhatsApp Action
  const btnCustomCatering = document.getElementById('btnCustomCatering');
  if (btnCustomCatering) {
    btnCustomCatering.addEventListener('click', () => {
      window.open('https://wa.me/919789001434?text=Hi%20Rotticious!%20I%20am%20interested%20in%20custom%20event%20catering%20or%20celebration%20cakes.', '_blank');
    });
  }
}

/* ==========================================================================
   5. ROTTIPERKS LOYALTY & NEWSLETTER LOGIC
   ========================================================================== */

function initPerksAndNewsletter() {
  const btnJoinPerks = document.getElementById('btnJoinPerks');
  const perksPhone = document.getElementById('perksPhone');

  if (btnJoinPerks) {
    btnJoinPerks.addEventListener('click', () => {
      const phone = perksPhone.value.trim();
      if (!phone || phone.length < 10) {
        showToast('Please enter a valid 10-digit mobile number.', 'info');
        perksPhone.focus();
        return;
      }
      showToast('🎉 Welcome to #RottiPerks! 25 Welcome Beans credited to ' + phone, 'success');
      perksPhone.value = '';
    });
  }

  const btnNewsletterSub = document.getElementById('btnNewsletterSub');
  const newsletterEmail = document.getElementById('newsletterEmail');

  if (btnNewsletterSub) {
    btnNewsletterSub.addEventListener('click', () => {
      const email = newsletterEmail.value.trim();
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.', 'info');
        newsletterEmail.focus();
        return;
      }
      showToast('Subscribed! Watch out for exclusive brew invitations.', 'success');
      newsletterEmail.value = '';
    });
  }
}

/* ==========================================================================
   6. NAVIGATION & MOBILE DRAWER
   ========================================================================== */

let closeMobileMenu;

function initNavigation() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileDrawer = document.getElementById('closeMobileDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu open / close
  function openMobile() {
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeMobileMenu = closeMobile;

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobile);
  if (closeMobileDrawer) closeMobileDrawer.addEventListener('click', closeMobile);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobile);
  });

  // Scrollspy highlighting for desktop links
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION UTILITY
   ========================================================================== */

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
