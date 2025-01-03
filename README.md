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
- [ ] Resend contact in +page.server.js
- [x] Style send button
- [x] Rotate arrow on home page
- [x] Toggle dropdown menus on shop page
- [x] Add functionality to dropdown menus on shop page
- [ ] Show product images on shop page
- [ ] Create product page
- [ ] Get cart working
- [ ] Get signup page working
- [ ] Get login page working
- [ ] Get profile page working
- [ ] Limit the number of products on first page load
- [ ] Get Contact form working
- [ ] Add product info to db and products page
- [ ] Add size chart and return policy in products page
- [ ] Go back to exact shop settings and scroll to exact product on product page
- [ ] Create image carousel on product page
- [ ] Create popup window system


# To-Do for minimal viable product
- [x] Load products from DB
- [x] Add functionality to dropdown menus on shop page
- [x] Make a products page
- [x] Create Cart
- [ ] Implement Checkout
- [x] Edit Database to be able to save sizes

In Case of minimal viable product:
- [ ] Disable location
- [ ] Disable profile
- [x] Move Contact Information to About Us

I have finished almost everything for minimal viable product
I just need to talk to Faris and finish checkout
