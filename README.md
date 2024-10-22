# Differences from Last Branch

## App.jsx

- **Import Statements**:
  - Added `useState` to the React import.

- **New State and Function**:
  - Introduced a new state variable `isNavbarShowing` using `useState(false)`.
  - Added a `toggleNavbar` function to toggle the state of `isNavbarShowing`.

- **Navbar Functionality**:
  - Added `onClick` event on the navbar toggler button to call `toggleNavbar`.
  - Modified the `className` of the `div` with `id="navbarNav"` to conditionally include `"show"` based on the state `isNavbarShowing`.

These changes add functionality for toggling the visibility of the navbar.
