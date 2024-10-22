# Differences from Last Branch

## App.jsx

### Lines Changed:

1. **Line 1**:
   ```diff
   - import React from 'react';
   + import React, {useState} from 'react';
   ```
   - **Explanation**: Added `useState` to the React import to manage state within the component.

2. **Line 5**:
   ```diff
   + const [isNavbarShowing, setNavbarShowing] = useState(false);
   ```
   - **Explanation**: Introduced a new state variable `isNavbarShowing` to control the visibility of the navbar.

3. **Line 7-10**:
   ```diff
   + // Toggle the collapse state
   + const toggleNavbar = () => {
   +   setNavbarShowing(!isNavbarShowing);
   + };
   ```
   - **Explanation**: Added a `toggleNavbar` function to toggle the state of `isNavbarShowing`.

4. **Line 20**:
   ```diff
   + onClick={toggleNavbar}
   ```
   - **Explanation**: Added an `onClick` event to the navbar toggler button to call the `toggleNavbar` function.

5. **Line 23**:
   ```diff
   - <div className="collapse navbar-collapse" id="navbarNav">
   + <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarNav">
   ```
   - **Explanation**: Modified the `className` of the `div` with `id="navbarNav"` to conditionally include `"show"` based on the state `isNavbarShowing`.

These changes add functionality for toggling the visibility of the navbar based on the state managed by `useState`.
