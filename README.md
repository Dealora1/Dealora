# 🛍️ Dealora – Group Discount Shopping Platform

**Dealora** is a full-stack e-commerce web application where sellers can post products with group discount options. Buyers join a queue to unlock the deal once the required number of participants is reached. This platform encourages social shopping and enhances buying power through collaborative purchasing.

---

# Description

Dealora enables a unique “Join to Unlock” experience for shoppers. Each product can have a group discount condition set by the seller (e.g., "50 people must join"). When enough buyers join, the discount is applied, and the product is automatically sold to all in the queue.

The platform includes seller/buyer login, product catalog browsing, cart and checkout functionality, and queue-based logic—all backed by a MongoDB database.

---

# Setup and Installation

### Prerequisites

- Node.js (v18 or later)
- MongoDB Atlas account
- Code Editor (VS Code recommended)
- Git

---

### Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Dealora1/Dealora.git
   cd Dealora

2. **Install Backend Dependencies**  
   ```bash
   cd backend
   npm install

---
#  Version

- **Dealora App Version**: 1.0.0  
- **Node.js**: v18.x  
- **MongoDB**: Atlas Cloud Database  
- **JavaScript**: Vanilla JS

---

#  Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  

**Tools & Utilities**:
- Git & GitHub  
- Postman (API Testing)  
- MongoDB Compass  
- VS Code

---

#  Website Flow

1. **Home Page** – Displays product listings from the database.  
2. **Product Detail Page** – Shows individual product info, "Join to Unlock" button, and Add to Bag option.  
3. **Cart Page** – Displays selected products using `localStorage`.  
4. **Checkout Page** – Finalizes the order and stores it in MongoDB under the buyer’s name.  
5. **Sign Up/Login Pages** – Separate authentication flows for sellers and buyers.  
6. **Seller Dashboard** – Sellers can post products with group discount conditions.

---

#  Steps with Interaction

1. **Buyer Sign-up/Login**  
   Users can register and log in to browse and buy products.

2. **Seller Sign-up/Login**  
   Sellers can register and post products with discount queue logic.

3. **Join Queue**  
   On the product page, a user can join a discount queue. The product is only sold if the required number of buyers join.

4. **Cart Management**  
   Products are stored in the cart using `localStorage`.

5. **Order Placement**  
   Once the user clicks “Place Order,” the details are saved to MongoDB.

---

#  Future Work

- **Buyer Notifications** – Notify users when the queue is full or when deals are activated.
- **User Offer System** – Allow buyers to propose their own group offers, inviting others to join and unlock it
- **Seller Product Management** – Enable sellers to remove or update products through their dashboard
- **Offer Visibility on Product Page** – Display queue target, and discount info directly on the product detail page
- **Account Editing** – Let users update their profile information (e.g., name, password)
- **Account Deletion** – Allow users to permanently delete their accounts from the platform
---

#  Resources

- [Express.js Documentation](https://expressjs.com/)  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- [MDN Web Docs](https://developer.mozilla.org/)  
- [Postman](https://www.postman.com/)  
- [GitHub Docs](https://docs.github.com/)

---


#  App Demo

[![Watch the App Demo](https://github.com/user-attachments/assets/aa356ca4-2740-4d1c-bb91-8cf21627df9e)](https://github.com/Dealora1/Dealora/blob/main/App-Demo.Mp4.mp4)
