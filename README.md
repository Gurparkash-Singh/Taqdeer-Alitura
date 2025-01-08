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
- [ ] Get signup page working
- [ ] Get login page working
- [ ] Get profile page working
- [ ] Limit the number of products on first page load
- [ ] Change DB to save multiple components per products
- [ ] Change DB to allow for multiple properties per component
- [ ] Add product info to db and products page
- [ ] Add size chart and return policy in products page
- [ ] Create image carousel on product page
- [ ] Create popup window system
- [ ] On home page, center about us once you reach the scroll height
- [ ] Change direction on first scroll
- [ ] Add ability to save cards
- [ ] Add ability to select coupons at checkout
- [ ] Change DB to allow for multiple coupons on a product
- [ ] Change DB to allow for multiple discounts on a profile
- [ ] Go back to exact shop settings and scroll to exact product on product page
- [ ] Add a close button to product page

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

Confirm new homepage with Faris if not then restore old homepage

product <- component <- properties

Create table components
Create table properties

weight / gsm
origin
all components

Model information and a table = size chart

Fix Fonts
Add arrow to the add to cart button