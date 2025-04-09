
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
emai - admin@gmail.com
password - 123456


You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
