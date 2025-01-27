# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# To-Do
- [x] Style send button
- [x] On home page, center about us once you reach the scroll height
- [x] Change direction on first scroll
- [x] Make arrows clickable
- [x] Show the number of items on the cart icon
- [x] Make the logo a link to homepage
- [x] Add messages table to DB and load messages into layout
- [x] Create popup window system
- [x] Change DB to save multiple components per products
- [x] Change DB to allow for multiple properties per component
- [x] Add product info to db and products page
- [x] Create image carousel on product page
- [x] Get signup page working
- [x] Get login page working
- [ ] Finish small screen shop page design
- [ ] Add size chart and return policy in products page
- [ ] Get Forget Password working
- [ ] Get Verify email working
- [ ] Get Contact Form working
- [ ] Redo Cart Page
- [ ] Get Checkout working
- [ ] Get profile page working
- [ ] Get Edit profile working
- [ ] Get Order History working
- [ ] Add ability to save cards
- [ ] Get Payment Methods Page working
- [ ] Get Address Book working
- [ ] Change DB to allow for multiple coupons on a product
- [ ] Change DB to allow for multiple coupons on a profile
- [ ] Change DB to allow for multiple coupons on entire store
- [ ] Add ability to select coupons at checkout
- [ ] Go back to exact shop settings and scroll to exact product on product page
- [ ] Add a close button to product page
- [ ] Change sizes for bigger screens
- [ ] Limit the number of products on first page load

# To-Do for minimal viable product
- [x] Load products from DB
- [x] Add functionality to dropdown menus on shop page
- [x] Make a products page
- [x] Create Cart
- [ ] Implement Checkout
- [ ] Finish Contact form
- [x] Edit Database to be able to save sizes

In Case of minimal viable product:
- [ ] Disable location
- [ ] Disable profile

# Completely Finished
- Homepage Design
- Shop page Design for big screens


Model information and a table = size chart

# Needed in the next 2 weeks
- [ ] Presentable
- [ ] Products need to be added