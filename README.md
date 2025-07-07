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
- [ ] Verify payment methods page
- [ ] Add size chart and return policy in products page
- [ ] Insert weights to DB
- [ ] Add up the weight for all products
- [ ] Set the weight in create Shipment
- [ ] Add astrisks to required fields for all forms

# Post Release To Do
- [ ] Finish Admin Panel
- [ ] Add security to image server by authenticating user before upload or delete
- [ ] Redo Discounts to allow for members to receive discounts without code
- [ ] Add ability to create pickup from admin panel
- [ ] Create routine pickups
- [ ] Get payment methods page working
- [ ] Save card if so choosen
- [ ] Create a critical error route
- [ ] Allow selection of address by moving pin on the map
- [ ] Increase Performance
- [ ] Use Page Insights to increase performance
- [ ] Limit the number of products on first page load
- [ ] Go back to exact shop settings and scroll to exact product on product page
- [ ] Add a close button to product page
- [ ] Add ability to track shipments

# To-Do for minimal viable product
- [x] Load products from DB
- [x] Add functionality to dropdown menus on shop page
- [x] Make a products page
- [x] Create Cart
- [x] Finish Contact form
- [x] Edit Database to be able to save sizes
- [x] Finish profile
- [x] Finish edit profile
- [x] Implement Checkout
- [x] Finish order history
- [ ] Fix Client Details for shipment
- [ ] Move all credentials to production

In Case of minimal viable product:
- [ ] Disable Payment Methods

# Completely Finished
- Homepage
- Shop page
- Signup page
- Login page
- Forgot password design
- Product page

Size chart is a photo should be added to the product images
Sizing contains model information
Add Table to DB for model size information

# Needed in the next 2 weeks
- [ ] Presentable
- [x] Products need to be added

# Before Launch
- Move Homepage to look like the one in the image
- When an email is entered add them to the email list
- If email is already allowed move them to the sign up page
- If account exists for the email entered move them to the login page
- Only allow signups from allowed emails
- Disable access to the entire website without loging in
- Move all instances to Production Credentials (twilio, tap and aramex)
- Fix Client Details for shipment

# For Critical Error Route
- A post request should be able to be made to the route with an error message
- The route should be used to send critical front end error messages

# For Admin Panel
Products
- [x] create a place to create and update collections and categories
- [x] update products
- [x] add and delete images
- [x] add and update sizes and quantities
- [x] add and update components and properties
- [ ] add product
- [ ] add and delete discounts in one place
- [ ] update sizing info

Allow if collection, categories, products, images, sizes, components, properties or discounts

Orders
- [ ] Show all orders
- [ ] Ability to filter all orders by user name, user email, order date, status
- [ ] Ability to create pickups

Allow if users, orders or order items

User Controls
- [ ] seperate place for messages
- [ ] seperate place for members and member types
- [ ] seperate place to read contact form emails
- [ ] seperate list for email list
- [ ] create an abandoned cart section

Allow if messages, members, member types, contact form, email list, carts

Admin Controls
- [ ] create an admin control panel where you can add admins and admin types
- [ ] create an error log

Allow if admins, admin types, admin permissions, errors, permissions

# Image Sizes required
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
