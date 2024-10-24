The line-by-line changes between the branches `04-resizing-and-useEffect` and `05-routing-in-react` are as follows:

### `package-lock.json`:
```diff
@@ -9,7 +9,8 @@
       "version": "0.0.0",
       "dependencies": {
         "react": "^18.3.1",
-        "react-dom": "^18.3.1"
+        "react-dom": "^18.3.1",
+        "wouter": "^3.3.5"
       },
       "devDependencies": {
         "@eslint/js": "^9.11.1",
@@ -3284,6 +3285,12 @@
         "node": "*"
       }
     },
+    "node_modules/mitt": {
+      "version": "3.0.1",
+      "resolved": "https://registry.npmjs.org/mitt/-/mitt-3.0.1.tgz",
+      "integrity": "sha512-vKivATfr97l2/QBCYAkXYDbrIWPM2IIKEl7YPhjCvKlG3kE2gm+uBo6nEXK3M5/Ffh/FLpKExzOQ3JJoJGFKBw==",
+      "license": "MIT"
+    },
     "node_modules/ms": {
       "version": "2.1.3",
       "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
@@ -3679,6 +3686,15 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/regexparam": {
+      "version": "3.0.0",
+      "resolved": "https://registry.npmjs.org/regexparam/-/regexparam-3.0.0.tgz",
+      "integrity": "sha512-RSYAtP31mvYLkAHrOlh25pCNQ5hWnT106VukGaaFfuJrZFkGRX5GhUAdPqpSDXxOhA2c4akmRuplv1mRqnBn6Q==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=8"
+      }
+    },
     "node_modules/resolve": {
       "version": "2.0.0-next.5",
       "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.5.tgz",
@@ -4178,6 +4194,15 @@
         "punycode": "^2.1.0"
       }
     },
+    "node_modules/use-sync-external-store": {
+      "version": "1.2.2",
+      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.2.2.tgz",
+      "integrity": "sha512-PElTlVMwpblvbNqQ82d2n6RjStvdSoNe9FG28kNfz3WiXilJm4DdNkEzRhCZuIDwY8U08WVihhGR5iRqAwfDiw==",
+      "license": "MIT",
+      "peerDependencies": {
+        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
+      }
+    },
     "node_modules/vite": {
       "version": "5.4.9",
       "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.9.tgz",
@@ -4347,6 +4372,20 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/wouter": {
+      "version": "3.3.5",
+      "resolved": "https://registry.npmjs.org/wouter/-/wouter-3.3.5.tgz",
+      "integrity": "sha512-bx3fLQAMn+EhYbBdY3W1gw9ZfO/uchudxYMwOIBzF3HVgqNEEIT199vEoh7FLTC0Vz5+rpMO6NdFsOkGX1QQCw==",
+      "license": "Unlicense",
+      "dependencies": {
+        "mitt": "^3.0.1",
+        "regexparam": "^3.0.0",
+        "use-sync-external-store": "^1.0.0"
+      },
+      "peerDependencies": {
+        "react": ">=16.8.0"
+      }
+    },
     "node_modules/yallist": {
       "version": "3.1.1",
       "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
```

### `package.json`:
```diff
@@ -11,7 +11,8 @@
   },
   "dependencies": {
     "react": "^18.3.1",
-    "react-dom": "^18.3.1"
+    "react-dom": "^18.3.1",
+    "wouter": "^3.3.5"
   },
   "devDependencies": {
     "@eslint/js": "^9.11.1",
```

### `src/App.jsx`:
```diff
@@ -1,115 +1,27 @@
-import React, { useState, useEffect } from 'react';
-import ProductCard from './ProductCard';
-
-
-
+import React from 'react';
+import Navbar from './Navbar';
+import HomePage from './HomePage';
+import {Route, Switch} from 'wouter';
+import ProductsPage from './ProductsPage';
+import RegisterPage from './RegisterPage';
 function App() {
 
-  const [isNavbarShowing, setNavbarShowing] = useState(false);
-
-  // Sync the collapse state with screen size
-  useEffect(() => {
-    const syncNavbarState = () => {
-      setNavbarShowing(window.innerWidth >= 992); // Show if larger than 992px, otherwise don't show
-    };
-
-    syncNavbarState(); // Run on mount to set the initial state
-
-    // Listen for window resize events
-    window.addEventListener('resize', syncNavbarState);
-
-    // Cleanup the listener on unmount
-    return () => window.removeEventListener('resize', syncNavbarState);
-  }, []);
-
-  // Toggle the collapse state
-  const toggleNavbar = () => {
-    setNavbarShowing(!isNavbarShowing);
-  };
-
 
   return (
     <>
-      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
-        <div className="container">
-          <a className="navbar-brand" href="#">E-Shop</a>
-          <button
-            className="navbar-toggler"
-            type="button"
-            onClick={toggleNavbar}
-          >
-            <span className="navbar-toggler-icon"></span>
-          </button>
-          <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
-            <ul className="navbar-nav ms-auto">
-              <li className="nav-item">
-                <a className="nav-link active" aria-current="page" href="#">Home</a>
-              </li>
-              <li className="nav-item">
-                <a className="nav-link" href="#">Products</a>
-              </li>
-              <li className="nav-item">
-                <a className="nav-link" href="#">About</a>
-              </li>
-              <li className="nav-item">
-                <a className="nav-link" href="#">Contact</a>
-              </li>
-            </ul>
-          </div>
-        </div>
-      </nav>
-
-      <header className="bg-primary text-white text-center py-5">
-        <div className="container">
-          <h1 className="display-4">Welcome to E-Shop</h1>
-          <p className="lead">Discover amazing products at unbeatable prices!</p>
-          <a href="#" className="btn btn-light btn-lg">Shop Now</a>
-        </div>
-      </header>
-
-      <main className="container my-5">
-        <h2 className="text-center mb-4">Featured Products</h2>
-
-        <div className="row">
-          <div className="col-md-3 mb-4">
-            <ProductCard
-              imageUrl="https://picsum.photos/id/20/300/200"
-              productName="Product 1"
-              price="19.99"
-            />
-          </div>
-
-          <div className="col-md-3 mb-4">
-            <ProductCard
-              imageUrl="https://picsum.photos/id/1/300/200"
-              productName="Product 2"
-              price="29.99"
-            />
-          </div>
-
-          <div className="col-md-3 mb-4">
-            <ProductCard
-              imageUrl="https://picsum.photos/id/26/300/200"
-              productName="Product 3"
-              price="39.99"
-            />
-          </div>
-
-          <div className="col-md-3 mb-4">
-            <ProductCard
-              imageUrl="https://picsum.photos/id/96/300/200"
-              productName="Product 4"
-              price="49.99"
-            />
-          </div>
-        </div>
-
-      </main>
 
-      <footer className="bg-dark text-white text-center py-3">
-        <div className="container">
-          <p>&copy; 2023 E-Shop. All rights reserved.</p>
-        </div>
-      </footer>
+    <Navbar/>
+    <Switch>
+        <Route path="/" component={HomePage} />
+        <Route path="/products" component={ProductsPage} />
+        <Route path="/register" component={RegisterPage} />
+    </Switch>    
+
+    <footer className="bg-dark text-white text-center py-3">
+      <div className="container">
+        <p>&copy; 2023 E-Shop. All rights reserved.</p>
+      </div>
+    </footer>
 
     </>
   );
```

### New Files:
- `src/HomePage.jsx`
- `src/Navbar.jsx`
- `src/ProductsPage.jsx`
- `src/RegisterPage.jsx`

For more detailed view, you can check the [commit comparison](https://github.com/kunxin-chor/sctp-react-ecommerce-frontend/compare/04-resizing-and-useEffect...05-routing-in-react).
