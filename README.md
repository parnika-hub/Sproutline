# Sproutline — Eco-Friendly Stationery E-Commerce Store

**Sproutline** is a responsive e-commerce web application selling sustainable, recycled, plantable, and plastic-free stationery.

---

## 🚀 Running the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🌿 Brand & Design System

- **Palette**:
  - Forest Green: `#2C5A43`
  - Sage: `#B9D1B0`
  - Kraft: `#C9A06B`
  - Mist Background: `#F0F4EC`
  - Ink Text: `#1F2B25`
  - White: `#ffffff`
- **Typography**: `Bricolage Grotesque` (Headings) and `DM Sans` (Body text).
- **Logo**: Handcrafted SVG leaf sprout on a kraft stem.
- **Accessibility**:
  - Buttons minimum 44px touch target
  - High-contrast color pairings (contrast ratio > 4.5:1)
  - Full keyboard focus outlines and semantic aria labels
  - Motion queries respect `prefers-reduced-motion`

---

## 📱 Pages & Routes

1. **`/` (Home)**:
   - Interactive `ScrollExpand` hero animation (*"Write on paper that grows back"*)
   - Bestseller product grid with `MaskedHeading`
   - Three key trust guarantees (plastic-free packing, plantable products, free shipping over Rs 500)
   - *"Our Promise"* feature band with dynamic `CrystalizedBall` WebGL canvas
2. **`/shop` (Shop Listing)**:
   - Category filtering chips (*All*, *Notebooks*, *Pens and pencils*, *Desk goods*)
   - Instant "Add to Cart" on every product card
3. **`/product/:id` (Product Detail)**:
   - High-resolution photograph, eco tag badge, and detailed product description
   - Interactive quantity stepper (- / +)
   - "Add to cart" and "View cart" CTAs
   - "More to explore" recommendations
4. **`/cart` (Shopping Cart)**:
   - Cart item list with quantity updates and remove buttons
   - Order summary sidebar with free shipping progress threshold
   - Empty cart state with quick browse link
5. **`/shipping` (Shipping Information)**:
   - Validated checkout form (Full name, address, city, 6-digit PIN code, phone)
   - Delivery method selector (Standard: 3–6 days / Express: 1–2 days)
   - Empty cart redirect guard
6. **`/review` (Review Order)**:
   - Item breakdown, delivery address summary, and chosen delivery method
   - Direct "Edit" links back to shipping and cart
   - Total calculation & "Place order 🌱" button
7. **`/order-success/:orderId` (Order Confirmation)**:
   - Order ID confirmation and multi-stage status progress indicators
   - Navigation links to "View my orders" and "Continue shopping"
8. **`/orders` (My Orders)**:
   - Order history with status tags (*Placed*, *Packed*, *Shipped*, *Delivered*)
   - Expandable order cards revealing item details, addresses, and price breakdowns
9. **`/login` (Authentication)**:
   - Demo email/password sign-in and "Continue as guest"
   - Desktop decorative panel featuring `CrystalizedBall` WebGL animation
10. **`/credits` (Photo Credits)**:
    - Attribution table and descriptions for all photography (also in `public/credits.md`)
11. **Help Pages**:
    - `/shipping-returns`, `/track-order`, `/contact`

---

## 💾 State Management

- **`CartContext`**: Cart items, quantities, subtotal calculations, persisted to `localStorage` (`sproutline_cart`).
- **`UserContext`**: Authenticated user / guest profile, persisted to `localStorage` (`sproutline_user`).
- **`OrdersContext`**: Placed order records, persisted to `localStorage` (`sproutline_orders`).
- **`CheckoutContext`**: Shipping address and delivery method drafts, persisted to `localStorage` (`sproutline_shipping`).
