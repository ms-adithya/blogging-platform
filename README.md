# Blogging Platform

## 🚀 Project Overview
This Blogging Platform allows users to create, read, update, and delete blog posts. Users can also comment on posts. The project is built with **HTML, CSS, JavaScript** for the frontend and **Django** for the backend.

## 🌐 Live Demo
- **Frontend (GitHub Pages)**: [Blogging Platform Frontend](https://ms-adithya.github.io/blogging-platform/)
- **Backend (Render)**: [Blogging Platform API](https://blogging-platform-2135.onrender.com)

## 📂 Project Structure
```
blogging-platform/
│── docs/                   # Frontend files for GitHub Pages
│   ├── index.html          # Homepage
│   ├── create.html         # Blog post creation page
│   ├── edit.html           # Blog post editing page
│   ├── comment.html        # Comments section
│   ├── blog.html           # Blog details section
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css  # Styling
│   │   ├── js/
│   │   │   ├── script.js   # Main JS logic
│   │   │   ├── app.js      # App-specific logic
│   │   │   ├── api.js      # API calls
│
│   ├── manage.py
│   ├── blogs/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── serializers.py
│   │   ├── admin.py
│   │   ├── app.py
│   │   ├── filters.py
│   │   ├── pagination.py
│   │   ├── permissions.py
│
│── README.md               # Project documentation
│── requirements.txt        # Dependencies for backend
│── .gitignore              # Ignore unnecessary files
```

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (for development), PostgreSQL (for deployment)
- **Hosting**:
  - **Frontend**: GitHub Pages
  - **Backend**: Render

## 🚀 Features
✅ Create, edit, and delete blog posts  
✅ View all published blogs  
✅ Comment on blog posts  
✅ Responsive design  
✅ API integration for backend communication  

## 🔧 Setup Instructions
### 🖥️ Local Development
#### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/ms-adithya/blogging-platform.git
   cd blogging-platform/backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv env
   source env/bin/activate   # On Windows: env\Scripts\activate
   pip install -r requirements.txt
   ```
3. Run database migrations:
   ```bash
   python manage.py migrate
   ```
4. Start the Django server:
   ```bash
   python manage.py runserver
   ```
5. Open **http://127.0.0.1:8000/** in your browser.

#### **Frontend Setup**
1. Navigate to the `docs/` folder:
   ```bash
   cd ../docs
   ```
2. Open `index.html` in a browser or use a local server:
   ```bash
   python -m http.server
   ```
3. Access the frontend at **http://localhost:8000/**

## 🚀 Deploying to GitHub Pages
1. Move all frontend files to the `docs/` directory.
2. Push changes to the `main` branch.
3. In **GitHub Settings** → **Pages**, set the source to `docs/` folder.
4. Wait for deployment and access the site via `https://ms-adithya.github.io/blogging-platform/`.

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

## 📝 Contact
For any issues or suggestions, feel free to open an **issue** or **pull request**. 🚀

