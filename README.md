# Food Donation and Blockchain Storage System

## 📌 Project Overview
This project is a **food donation system** that allows restaurants and individuals to donate surplus food to **NGOs** and charities. The system also utilizes **Blockchain and IPFS** to store donation records securely, ensuring **transparency and accountability**. A PDF report of donations can also be generated for government records.

---
## 🚀 Features
- User Authentication (**JWT-based authentication** for Restaurants & NGOs)
- Food Donation Management (**Restaurants can donate food, NGOs can view and request pickup**)
- **Blockchain & IPFS Storage** (Food donation data is stored securely on the blockchain, and receipts are stored on IPFS)
- **Real-time Notifications** (Users receive updates on donation requests)
- **PDF Report Generation** (jsPDF used to generate government reports of donations)

---
## 🏗️ Folder Structure
```bash
📂 project-root/
├── 📁 backend/         # Express.js backend
│   ├── 📁 models/      # Mongoose models (User, FoodDonation)
│   ├── 📁 routes/      # API routes (Auth, Donations, Blockchain)
│   ├── server.js      # Main Express server
│   ├── config.js      # Database and environment configurations
│   ├── middleware/    # Auth and security middlewares
│
├── 📁 frontend/        # React.js frontend
│   ├── 📁 src/
│   │   ├── 📁 components/  # Reusable React components
│   │   ├── 📁 pages/       # Page components (Dashboard, DonateFood, Blockchain)
│   │   ├── 📁 context/     # React context for global state management
│   │   ├── 📁 api/         # Axios instance for API calls
│   │   ├── App.js         # Main React App
│   │   ├── index.js       # React entry point
│
├── 📄 package.json       # Dependencies and scripts
├── 📄 README.md          # Project documentation
```

---
## 🛠️ Technologies Used
### **Frontend:**
- **React.js** (UI development)
- **React Router** (Navigation)
- **Axios** (API requests)
- **jsPDF** (PDF report generation)
- **IPFS-HTTP-Client** (Upload files to IPFS)

### **Backend:**
- **Node.js & Express.js** (Backend API)
- **MongoDB & Mongoose** (Database for storing donation data)
- **JWT (JSON Web Token)** (Authentication)
- **bcryptjs** (Password hashing)
- **dotenv** (Environment variable management)
- **Multer** (File handling middleware)
- **Pinata IPFS API** (Decentralized file storage)

### **Blockchain & IPFS:**
- **IPFS (InterPlanetary File System)** (Decentralized storage)
- **Pinata** (IPFS file pinning service)
- **Blockchain** (Immutable records of donations)

---
## 📥 Installation & Setup
### **1. Clone the repository:**
```sh
git clone https://github.com/yourusername/food-donation-blockchain.git
cd food-donation-blockchain
```

### **2. Setup Backend**
```sh
cd backend
npm install  # Install dependencies
```

Create a `.env` file in the `backend/` folder with the following:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
```

Run the backend server:
```sh
npm start
```

### **3. Setup Frontend**
```sh
cd frontend
npm install  # Install dependencies
```

Run the React frontend:
```sh
npm run dev
```

---
## 🔗 API Endpoints
| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| POST   | `/api/auth/login`   | User login |
| POST   | `/api/auth/register` | User registration |
| POST   | `/api/food/donate`  | Create a food donation |
| GET    | `/api/food/list`    | View all available food donations |
| POST   | `/api/blockchain/store` | Store donation record on blockchain |

---
## 📝 Generating a Blockchain Report
1. Navigate to the `Blockchain` page in the frontend.
2. Upload a donation record to **IPFS & Blockchain**.
3. Click the "Generate Report" button.
4. A **PDF report** will be generated and made available for download.

---
## 👥 Contributors
- **Your Name** – *Full Stack Developer*

---
## 📜 License
This project is **open-source** under the **MIT License**.

---
## 💡 Future Enhancements
- **Smart Contract Integration** to fully automate donations.
- **Ethereum or Solana-based NFT** for verified donors.
- **AI-powered food demand prediction** to reduce wastage.

---
🚀 *Built with love for a world with **zero food waste!** ❤️*

