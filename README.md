Hi!

Thanks a lot for the assessment! It was an interesting one!

# Some boilerplate decisions

- The code is linted with `tslint` (for typescript) & `stylelint` (for `styled-components`), prettified with `prettier` and tested with `jest` (together with `enzyme`, `enzyme-to-json` & `jest-styled-components`)
- I've added a few git hooks (can be found in `.huskyrc`, won't explain them here, they all are straight-forward)
- Commit messages are also linted according to the `conventional-commits` convention
- Staged files are processed on `pre-commit` (prettified, linted) with `lint-staged` tool

# First task

It can be found in `src/calculator.ts`. But it's a small file, so I'll just duplicate it's content here:

```ts
export const addN = (n: number) => (arg: number) => n + arg;
// const addEight = addN(8);

// const fifteen = addEight(7);
```

# Second task

There is still one issue with unit tests (canvas mocking), which I haven't solved due to lack of time.

Other than that the app is ready and live version is deployed [here](https://dott-dborysov.firebaseapp.com)

# App structure

The app is really small. In the beginning, I wanted to add redux & saga, but then I realized that the app behavior can be implemented using react hooks

# PWA

I did not do a lot to achieve this, mostly all PWA features are out-of-the-box for create-react-app. But in any case, the app is fully PWA according to `Lighthouse`
