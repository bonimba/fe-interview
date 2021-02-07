## Candidate notes
- I am not used to use a state management tool (anymore) so I just used useState/hooks and state colocation or "lifted up state".
- Same for CSS-in-JS. I only used linaria in the past 3 weeks and I think it would have taken me more time to set it up than just add some scss
- I only made one (start of) integration test for the App.
- I had to change some packages and scripts to make them work on my machine but I'll revert the script before committing. ("start": "set PORT=3001 && react-scripts start",) becuase it was complaining on Windows.
- I am used to throw errors in try/catch, but I didn't have the time to add an Error Boundry
- I could have also used AbortController to cancel concurrent api calls, but it's a nice to have and definitely not in a few hours test.


## Cleo Frontend Interview - Bills
### Get Started
1. Fork or clone this repo (a simple [`create-react-app`](https://github.com/facebook/create-react-app) extended with [`json-server`](https://github.com/typicode/json-server) and some Cleo-specific goodies)
1. Install dependencies via `yarn` (or `npm`)
1. Run `yarn start` to start the dev server
1. Run `yarn api` in a different terminal to start the json-api server

### The Task
1. Create a Tabs component that allows multiple pages to be switched between.
1. One tab should show a list of merchants with transactions that have been marked as bills. These can be found at http://localhost:3002/merchants. Merchant's marked as bills, have a flag `isBill` set to `true`.
1. Another tab should show a list of merchants with transactions which are potential bills. These can also be found at http://localhost:3002/merchants. Merchant's that could be potentially bills have a flag `isBill` set to `false`.
1. Under each merchant row for both lists, should be a hidden list of transactions for that merchant. This should show when the merchant row is clicked.
1. Under the name of each merchant should show a count of the transactions for it
1. Add an action to the bills tab for each merchant called "remove bill" which updates the relevant merchant's `isBill` flag to `false`. You can use a `PATCH` request to `http://localhost:3002/merchants/:id` using the id of the merchant to update the resource.
1. Add an action to the potential bills tab for each merchant called "Add as bill" which updates the relevant merchant's `isBill` flag to `true`.
1. After each action, the lists should reflect the changes.

### Notes
- Please aim to spend 2-3 hours completing this task
- We'd like to see state management tools being used
- Tools we use at Cleo include styled-components, Typescript and Redux (with Sagas)
- Style the components however you see fit. SASS or PostCSS are fine, but we'd prefer CSS in JS
- We love tests, linted code and great looking UIs
- The API contains other data, feel free to use this creatively if you have the time
- Remember to check your project runs before submitting
