# Intersection Hook for React

This package provides a set of tools to easily implement Intersection Observer in React applications. It allows you to register elements and track their visibility in the viewport. This is ideal for creating dynamic navigation menus that highlight the active section as the user scrolls.

![example](./examples/1.gif)

## Installation

You can install the package using npm or yarn.

### Using npm:

```bash
npm install @adrihle/intersection-hook
```

### Using yarn:

```bash
yarn add @adrihle/intersection-hook
```

## Usage

### Step 1: Set up the Provider (IntersectionProvider)

Wrap your application or component with the IntersectionProvider component to enable the useIntersection hook in any part of the component hierarchy. The provider handles the intersection state and configuration.

```tsx
import { IntersectionProvider } from '@adrihle/intersection-hook';

const App = () => {
  return (
    <IntersectionProvider config={{ threshold: 0.8, scrollBehavior: 'smooth' }}>
      <YourComponent />
    </IntersectionProvider>
  );
};
```

### Step 2: Use useIntersection in Your Component

Once your application is wrapped by the IntersectionProvider, you can use the useIntersection hook to register elements and track intersections.

#### Menu Component

This component renders a navigation menu with links to the registered sections. It highlights the active link based on the section currently visible.

```tsx
import { useIntersection } from '@adrihle/intersection-hook';

const Menu = () => {
  const { sections, activeSection, scrollTo } = useIntersection();

  return (
    <>
      {sections?.map(({ id, label }) => (
        <a
          key={id}
          onClick={scrollTo(id)}
          style={{ color: id === activeSection ? 'red' : 'yellow', cursor: 'pointer' }}
          data-testid={`menu-${id}`}
        >
          {label}
        </a>
      ))}
    </>
  );
};
```

#### Content Component

The Content component registers the sections and displays them on the page. The sections are automatically detected as they scroll into the visible area of the browser.

```tsx
import { useIntersection } from '@adrihle/intersection-hook';

const Content = () => {
  const { register } = useIntersection();

  return (
    <div>
      {Object.entries(SECTIONS).map(([id, label]) => (
        <div ref={register({ id, label })} data-testid={`content-${id}`} key={id}>
          {label}
        </div>
      ))}
    </div>
  );
};
```

## API

IntersectionProvider

The context provider that enables the useIntersection hook in child components.

### Props:

	•	children: The components to be wrapped.
	•	config: Optional configuration to customize the intersection observer behavior:
	•	threshold (default: 0.5): Percentage of the section visible in the viewport to consider it “intersected”.
	•	scrollBehavior (default: 'smooth'): The scroll behavior when clicking on a menu link (can be 'auto', 'smooth', or 'instant').

### useIntersection

A hook that provides access to the intersection functionality within components.

### Returns:

	•	register: A function to register an element for observation. It accepts an object with the properties id and label.
	•	activeSection: The id of the currently visible section in the viewport.
	•	sections: An array of registered sections, each containing the id and label properties.
	•	scrollTo: A function to scroll the view to a given section by its id.

## Contributing

If you would like to contribute to this project, feel free to fork it and submit pull requests. Please ensure to test your changes before submitting them.

## License

MIT License. See the LICENSE file for more details.
