# Dead Simple State

Dead Simple State, or DSState is a dead simple state management library that is completely framework agnostic. It is designed to be easy to use, understand, and implement.

## Features

- **Framework agnostic**: Can be used with any JavaScript framework or library.
- **Simple API**: Easy to understand and use.
- **Lightweight**: Small footprint, no dependencies.
- **Reactive**: Automatically updates the UI when the state changes.
- **TypeScript support**: Fully typed for TypeScript users.

## Getting Started

To get started with DSState, you can install it via npm or yarn:

```bash
npm install dsstate
```

Then, you can import it into your project:

```typescript
import { ref } from "dsstate";
```

## Basic Usage

Lets create a Vanilla JS counter app using DSState. Typically, you would want to use a framework with this,
but this is just to show how easy it is to use DSState.

```typescript
import { ref, watch } from "dsstate";

const count = ref(0);

const counterText = ref(count, (v) => `Count: ${v}`);

const counter = document.createElement("h1");
watch(counterText, (v) => {
  counter.innerText = v;
});

const button = document.createElement("button");
button.innerText = "Increment";
button.addEventListener("click", () => {
  count.val++;
});

document.body.appendChild(button);
document.body.appendChild(counter);
```
