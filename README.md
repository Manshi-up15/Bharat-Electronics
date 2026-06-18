# Bharat Electronics ⚡

Bharat Electronics is a modern, high-performance web application designed to showcase electrical and electronic products. Built with cutting-edge web technologies, it features a sleek public-facing catalog alongside a secure, comprehensive administrative dashboard for complete content management.

## 🌟 Key Features

### Public Storefront
* **Product Catalog:** Browse a wide range of electrical and electronics products.
* **Category Navigation:** Filter and explore items by specific categories.
* **Photo Gallery:** View images of the physical store, past work, and premium products.
* **Contact & Location:** Easily find store details, contact info, and integrated Google Maps directions.
* **Responsive & Fast:** Optimized for seamless usage across all devices (mobile, tablet, desktop).
* **Dark Mode:** Fully responsive, premium dark and light themes seamlessly integrated across the site.
* **SEO Optimized:** Implements Local Business JSON-LD and Next.js metadata for optimal search engine visibility.

### Admin Dashboard (CMS)
* **Secure Authentication:** Protected admin login utilizing bcrypt and JWT (JSON Web Tokens) with CSRF protection.
* **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products, including price, availability, and featured status.
* **Category Management:** Easily create and manage product categories.
* **Gallery Management:** Upload, delete, and edit titles for photos in the public gallery.
* **Image Uploads:** Direct integration with Cloudinary for robust, fast image hosting and management.
* **Dynamic Settings:** Update business info (phone, email, Instagram, Google Maps URL, Hero text) dynamically without touching code.

## 🚀 Technology Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions, API Routes)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom UI components
* **Database:** [MongoDB Atlas](https://www.mongodb.com/) (Mongoose / Native Driver)
* **Image Hosting:** [Cloudinary](https://cloudinary.com/)
* **Authentication:** JWT, bcryptjs
* **Validation:** Zod
* **Deployment:** Optimized for Vercel

## ⚙️ Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine. You will also need:
* A MongoDB cluster (Atlas or local)
* A Cloudinary account for image hosting

### Environment Variables
Create a `.env.local` file in the root directory and configure the following variables:

```env
# MongoDB Connection
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/bharat-electronics"

# JWT Secret for Authentication
JWT_SECRET="your_super_secret_jwt_key_here"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Manshi-up15/Bharat-Electronics.git
   cd Bharat-Electronics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed Initial Admin Account (Optional but recommended for first setup):
   ```bash
   npm run seed-admin
   ```
   *(Check `scripts/seed-admin.js` for default credentials or to modify them).*

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Build & Deployment

To run a production build locally and ensure there are no TypeScript or ESLint errors:
```bash
npm run build
```

This project is optimized for deployment on [Vercel](https://vercel.com). Simply link your GitHub repository to a new Vercel project, add your environment variables in the Vercel dashboard, and deploy.

## 📝 License
This project is proprietary and built specifically for Bharat Electronics.
