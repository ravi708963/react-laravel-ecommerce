
🛍️ Laravel + React E-commerce Project

This is a featured e-commerce module built using Laravel (API) and React (frontend). The React components are rendered inside the Laravel Blade template and use JWT Authentication for protected routes and role-based access control (admin/user).


🚀 Features

JWT-based login & registration

Admin-only Product CRUD with image upload (only admin can see the edit and delete button on products, and i have enable a button to add product by admin , it also visible for admin only)

Product list with pagination

Add to cart functionality (user-based, database saved)

Quantity updates and remove items from cart

Protected routes via React Router

Bootstrap-styled responsive UI

React inside Laravel blade (no separate Vite/CRA)


📂 Project Structure

├── app/

├── public/

│   └── storage/ (linked to store product images)

├── resources/

│   └── js/ (React components)

├── routes/

│   └── api.php (API endpoints)

├── database/

│   ├── migrations/

│   └── seeders/ (Admin user seeder)

├── .env

└── package.json

🛠️ Requirements

PHP >= 8.0

Composer

Node.js & npm

MySQL / SQLite

Laravel 10+

JWT Auth (tymon/jwt-auth)

Bootstrap (bootstrap via npm)

React & React Router

📦 Installation

git clone https://github.com/.....

cd react-laravel-ecommerce


Backend Setup (Laravel)

composer install

php artisan key:generate

php artisan migrate --seed

php artisan storage:link

php artisan jwt:secret

php artisan db:seed --class=AdminSeeder


database

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=ecommerce

DB_USERNAME=root

DB_PASSWORD=


Frontend Setup (React inside Laravel)

npm install

npm run dev


👨‍💻 Start the App

php artisan serve


Visit http://127.0.0.1:8000

login admin by 

email - admin@gmail.com

password - 123456



