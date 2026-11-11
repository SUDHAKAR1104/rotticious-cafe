# ☕ Rotticious Cafe — Premium Flagship Website

A website built for **Rotticious Cafe** (Chennai, Tamil Nadu) — inspired by the digital experience and aesthetic of **Starbucks Reserve** and coastal boutique cafes.

> *"Moving beyond Roti, Kapda aur Makaan to bring you the only three essentials that truly matter: Bakery | Coffee | Desserts."* — **#rottikaappicake**

---

## 🌟 Key Features & Architecture

### 1. 🌊 Hero Section & Brand Positioning
- **Full-Bleed Coastal & Espresso Visuals**: Featuring the Thiruvanmiyur beach-view rooftop aesthetic and Chikmagalur coffee craft.
- **Brand Story & Tagline**: Highlighting `#rottikaappicake` and Chennai's 3-pillar philosophy: Bakery, Coffee, and Desserts.
- **Key Metrics Bar**: Highlighting 100% Chikmagalur specialty coffee, 20+ brewing styles, 4.8★ flagship rating, and 3 iconic Chennai locations.

### 2. 📍 Interactive 3-Branch Experience Selector (Starbucks 'Find a Store' Style)
- **Live Open/Closed Status Engine**: Uses real-time local clock algorithms to compute whether each branch is currently *Open Now*, *Closing Soon*, or *Closed* based on specific operational hours:
  - **Thiruvanmiyur Beach Flagship (4.8 ★ / 29 reviews)**: 111, Valmiki Nagar, Kottivakkam. Beach-view rooftop, sports turf, and brand journey art museum. Opens at 6:00 AM on Mondays, 7:00 AM Sundays.
  - **Sholinganallur (OMR Hub) (4.4 ★ / 169 reviews)**: 151, Rajiv Gandhi Salai. Rustic theme, 300 Mbps Wi-Fi, power sockets at every booth, live music jam nights.
  - **Royapettah Landmark (4.0 ★ / 892 reviews)**: Opposite Sathyam Cinemas. Original hub, artisanal bakery counter, family booths, wheelchair accessibility.
- **1-Click Actions**: "Reserve Table", "Get Directions" (Google Maps), and "Chat Branch" (WhatsApp).

### 3. 🍽️ Curated Filterable Menu & Real-Time Search
- **Categories**:
  - ☕ **100% Chikmagalur Coffee & Beverages** (Americano, Spanish Iced Latte, Espresso Float, Mocha, Hot Chocolate, Iced Milo, Boba Tea, Nutella Thickshake, Watermelon Mojito)
  - 🥩 **Signature Steaks & Mains** (Chicken Steak in Southern Spice, Brown Sauce, Creamy Pesto, Lemon Francaise, Chicken Cordon Bleu, Chicken Parmigiana, Prawn Aglio e Olio)
  - 🍕 **Neapolitan Pizzas & Gourmet Burgers** (Handmade Seafood Pizza, Grilled Chicken Pizza, Margherita Pizza, Nashville Spiced Burger, Double Chipotle Burger, Fish Burger, Malabar Porotta Wraps, Club Sandwiches)
  - 🥐 **Artisanal Bakery & Desserts** (Lotus Biscoff Cake, Classic Cheesecake, Chocolate Bread, Cinnamon Buns, Donuts, Fudgy Brownies, Almond Biscotti & Rusks)
  - 🍟 **Small Plates & Sides** (BBQ Glazed Wings, Honey Garlic Wings, Peri Peri Fries, Garlic Cheese Toast, Caesar Salad)
- **Filter Chips**: All Items, Veg Only, Non-Veg, Chef's Signature, Under ₹250.
- **Instant Search**: Real-time multi-field query matching.

### 4. 🛒 Interactive Order Drawer (Mobile Order Experience)
- Slide-out order tray with live subtotals, quantity adjustments, and 5% GST calculations.
- **WhatsApp Direct Order Dispatch**: Generates formatted, itemized WhatsApp order messages to skip delivery aggregator commissions.

### 5. 📅 Instant Table Reservation Modal
- Interactive modal with branch auto-selection, seating preference picker (*Beach View Rooftop*, *Quiet Work Booth*, *Garden Patio*, *Artisanal Bakery Lounge*), date & time slots.
- Provides immediate booking confirmation with a unique booking reference code (`ROT-XXXXXX`) and 1-click WhatsApp forwarding.

### 6. 🏆 #RottiPerks Starbucks-Style Loyalty Program
- Loyalty rewards tier showcase (50 Beans: Free Drink, 120 Beans: Free Cake Slice, 250 Beans: VIP Sunset Rooftop Dinner).
- Instant mobile signup form crediting 25 Welcome Beans.

### 7. 🎸 Experiences Showcase & Brand Museum
- **Work-From-Café**: 300 Mbps Wi-Fi, universal power sockets, ergonomic seating.
- **Live Music Jam Nights**: Weekend acoustic sets under fairy lights.
- **Weekend Biker & Cycling Pitstops**: Dawn 6 AM pitstop along ECR/OMR highway corridor.
- **Brand Art Museum**: Showcase of coffee bean origins and the #rottikaappicake journey at Thiruvanmiyur.

---

## 🚀 How to Run Locally

The website is running on your machine:

```powershell
# Open terminal in the project directory
cd C:\Users\tksud\.gemini\antigravity\scratch\rotticious-cafe

# Run local web server
python serve.py
```

Then open your browser at:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 📁 File Structure

```
rotticious-cafe/
│
├── index.html       # Master semantic HTML structure with accessible ARIA tags
├── styles.css       # Starbucks Reserve design system, responsive grid & animations
├── app.js           # Live hours calculator, menu filter, cart drawer & reservation modal
├── serve.py         # Lightweight Python web server
└── README.md        # Comprehensive documentation
```
