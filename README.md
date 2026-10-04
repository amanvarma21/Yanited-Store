# Yanited Store — Full-Stack React + Express

Yanited Store is a mini e-commerce application (styled as a Manchester United
jersey store). It is split into two independent parts:

- **client/** — React + Vite frontend (http://localhost:5173)
- **server/** — Express.js REST API backend (http://localhost:5000)

The React frontend fetches product data from the Express backend instead of
importing it from a local file.

## Features

- Browse products on the home page
- Search products by name from a search bar in the navbar
- View individual product details
- Add products to a shopping cart
- Increase / decrease quantities and remove items in the cart
- Checkout with an order summary and total
- Login / signup (client-side auth)
- Client-side routing between pages
- Prices formatted with thousands separators (e.g. ₹1,299.00)

## Project structure

```
FSD-CIE2/
├── client/                       # React + Vite frontend
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar.jsx         # functional — two-tier nav + search bar
│   │   │   ├── ProductCard.jsx    # functional — single product card (props)
│   │   │   ├── ProductList.jsx    # CLASS component — fetches & lists products
│   │   │   └── Footer.jsx         # CLASS component — site footer
│   │   ├── Context/
│   │   │   ├── AuthContext.jsx    # React Context (auth)
│   │   │   ├── CartContext.jsx    # React Context (cart)
│   │   │   └── SearchContext.jsx  # React Context (search text)
│   │   ├── pages/
│   │   │   ├── Home.jsx           # reads search, renders ProductList
│   │   │   ├── Auth.jsx           # form handling (login/signup)
│   │   │   ├── Checkout.jsx       # cart + event handling
│   │   │   └── ProductDetails.jsx # useEffect + fetch one product
│   │   ├── assets/                # images (logo, icons, etc.)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── config.js             # API base URL + formatPrice helper
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                       # Express.js backend
│   ├── data/
│   │   └── products.js           # product data (source of truth)
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── authRoutes.js
│   ├── controllers/
│   │   └── productController.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## API endpoints

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/api`               | Health check — confirms API is up  |
| GET    | `/api/products`      | Returns all products               |
| GET    | `/api/products/:id`  | Returns one product (404 if none)  |
| POST   | `/api/auth/signup`   | Simple signup (optional)           |
| POST   | `/api/auth/login`    | Simple login (optional)            |

## How the frontend talks to the backend

```
Home.jsx
  → renders ProductList (class component)
    → componentDidMount()
      → fetch("http://localhost:5000/api/products")
        → Express API
          → products
      → this.setState()
        → ProductCard (via props)
```

`ProductDetails.jsx` works similarly using `useEffect` + `fetch` on
`/api/products/:id`.

## Search flow

```
Navbar (search input)
  → setSearch() in SearchContext
    → Home reads `search` from SearchContext
      → passes it as a prop to ProductList
        → ProductList filters products by name
```

The search input lives in the navbar, so it appears on every page, but the
filtering only affects the product grid on the home page.

## Running the project (two terminals)

**Terminal 1 — backend**

```
cd server
npm install
npm run dev
```

Starts the API on http://localhost:5000

**Terminal 2 — frontend**

```
cd client
npm install
npm run dev
```

Starts the app on http://localhost:5173

Both must be running at the same time. If the backend is down, the frontend
shows "Unable to load products."

## React concepts demonstrated

- Functional components: `Home`, `Navbar`, `ProductCard`, `ProductDetails`, `Auth`, `Checkout`
- **Class components: `ProductList` and `Footer`**
- Parent → child components and `props` (e.g. `ProductList` → `ProductCard`)
- `useState` (cart, auth, search, loading/error)
- `useEffect` (fetching a product in `ProductDetails`)
- Class state and lifecycle (`this.state`, `this.setState`, `componentDidMount` in `ProductList`)
- Event handling (add to cart, quantity +/- , logout, search typing)
- Form handling (`Auth` login/signup with react-hook-form)
- Client-side routing with React Router
- React Context (`AuthContext`, `CartContext`, `SearchContext`)
- Express.js REST API and frontend ↔ backend communication

## Notes / assumptions

- Authentication is client-side via `localStorage`. The Express auth endpoints
  are provided as a simple REST demonstration but are optional.
- The cart is client-side using React Context; `CartContext` fetches the
  product list from Express to compute item details and totals.
- Prices are formatted with the `formatPrice` helper in `config.js`
  (Indian-style grouping, two decimals).
- No database, JWT, or password hashing — kept simple for a college project.
