# Build and Deploy

build.sh is used to build a zip file that can be sent to any server
run.sh and server-run.sh are platform dependent and must be changed in order to work

# Website Launch Checklist

1. Pre-Launch:

- [x] Buy Server
- [x] change images based on screen size
- [x] Upload Product Photos
- [x] update admin panel to add early access
- [x] update return policy
- [ ] update measurements
- [ ] update weights
- [ ] Ensure DB accuracy
- [ ] QA testing

2. Launch:

- [ ] Allow access to the entire website to everyone
- [ ] Finished Website

3. Post-Launch:

- [ ] Add ability to create pickup from admin panel
- [ ] Create routine pickups
- [ ] Get payment methods page working
- [ ] Save card if so choosen
- [ ] Allow selection of address by moving pin on the map
- [ ] Add a close button to product page
- [ ] Go back to exact shop settings and scroll to exact product on product page
- [ ] Add ability to track shipments

# Fix Pre Launch Mode

- [ ] Move /access to (shop)
- [ ] Delete /access/+layout.svelte
- [ ] Remove everything below first if in /access/+layout.server.js
- [ ] SET EARLY_ACCESS to FALSE in .env
- [ ] Move everything from (shop)/home to routes and delete (shop)/home
- [ ] Remove if (url.pathname === "/") from routes/+layout.svelte
- [ ] Remove load function from routes/+page.server.js

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
- [x] Stop Scrolling while modal is loaded
- [x] Stop navigation while modal is loaded
- [x] Verify shop page design
- [x] Verify signup page design
- [x] Verify login page design
- [x] Upload actual products to DB
- [x] Verify product page design
- [x] Get profile page working
- [x] Get edit profile working
- [x] Get email validation during signup working
- [x] Get Contact Form working
- [x] Get password reset working
- [x] Get verify email working
- [x] Change DB to allow for email list
- [x] Get Phone Numbers working
- [x] Get checkout working
- [x] Get phone number verification working
- [x] Add ability to save cards in DB
- [x] Change DB to allow for multiple coupons on a product
- [x] Change DB to allow for multiple coupons on a profile
- [x] Change DB to allow for multiple coupons on entire store
- [x] Get location button working
- [x] Show payment acceptance icons on cart page
- [x] Get Top part for cart page showing
- [x] Redo cart page
- [x] Finish Delivery Page
- [x] Save Order stages in database
- [x] Update info if order status is below paid
- [x] Only allow /cart/review if order_id is in cookies and order status is below pending
- [x] Get address book working
- [x] Finish Review Page
- [x] Fix Homepage and Logo image
- [x] Get Image upload working
- [x] Finish Checkout
- [x] Add ability to save an address from the delivery page
- [x] Get order history working
- [x] Save order post checkout
- [x] Get post checkout page working
- [x] Enable Order Again button in /profile/orders
- [x] Create Shipment and get tracking info
- [x] Make it so that /cart/delivery cannot be accessed without having items
- [x] Add ability to cancel order from review page
- [x] Add ability to make an entire collection live
- [x] Send an uploading message while image uploads
- [x] Get Logout Working
- [x] Add (optional) to fields that are optional in forms
- [x] Insert weights to DB
- [x] Add up the weight for all products
- [x] Set the weight in create Shipment
- [x] Collection Live functionality
- [x] Add size chart and return policy in products page
- [x] Finish Unsubscribe page
- [x] Email templates
- [x] Fix Image Server
- [x] Use Permissions correctly
- [x] change images based on screen size
- [x] update admin panel to add early access
- [x] Fix Google Maps error
- [ ] Verify profile page
- [ ] Verify edit profile
- [ ] Verify password reset
- [ ] Verify email verification
- [ ] Verify location button
- [ ] Verify checkout
- [ ] Verify cart page
- [ ] Verify Delivery Page
- [ ] Verify post checkout page
- [ ] Verify address book
- [ ] Verify order history
- [ ] Fix Delivery system
- [ ] update measurements
- [ ] update weights
- [ ] Give each page a meta description and maybe a different title
- [ ] Add Print Label functionality
- [ ] Add ability to generate a commericial invoice

# Post Release To Do

- [ ] Finish Admin Panel
- [ ] Add security to image server by authenticating user before upload or delete
- [ ] Redo Discounts to allow for members to receive discounts without code
- [ ] Add ability to create pickup from admin panel
- [ ] Create routine pickups
- [ ] Increase Performance
- [ ] Use Page Insights to increase performance
- [ ] Limit the number of products on first page load
- [ ] Go back to exact shop settings and scroll to exact product on product page
- [ ] Add a close button to product page
- [ ] Add ability to track shipments
- [ ] Allow selection of address by moving pin on the map
- [ ] Get payment methods page working
- [ ] Save card if so choosen

# Completely Finished

- Homepage
- Shop page
- Signup page
- Login page
- Forgot password design
- Product page

# For Admin Panel

Products

- [x] create a place to create and update collections and categories
- [x] update products
- [x] add and delete images
- [x] add and update components and properties
- [x] update sizing info
- [x] update product size chart components
- [ ] add and update available components to size chart
- [ ] add and update available variations
- [ ] add and update available options on a variation
- [ ] add and remove variations on a product
- [ ] add and remove options on a product
- [ ] create product items on create product, update variations and update options
- [ ] update product items
- [ ] add product
- [ ] add and delete discounts in one place

Orders

- [x] Show all orders
- [ ] Ability to filter all orders by user name, user email, order date, status
- [ ] Ability to create pickups

User Controls

- [ ] seperate place for messages
- [ ] seperate place for members and member types
- [ ] seperate place to read contact form emails
- [ ] seperate list for email list
- [ ] create an abandoned cart section

Admin Controls

- [ ] create an admin control panel where you can add admins and admin types
- [ ] create an error log
- [ ] automatically apply parent permission (read-only) if child permission added

# Images

- Image Carousel
- Product Card
- Settings Card
- shop/[product_id]
- admin/[product_id]/images
- Order Product
- /orders (receipt product)

## Product Images

90 X 90
65 X 65
Full Size

## Logo

150 X 150
170 X 170

## Homepage

Full Size

# For Payment Methods

- [ ] In /cards/add tokenize and verify card to save it
- [ ] In /cart/review tokenize card and use it
- [ ] In /orders save card id

Every field the admin should have access to:

- Errors: id, location, name
