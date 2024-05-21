# Wishlist App

Welcome to the Wishlist App repository! This application empowers users to curate and organize wishlists, facilitating seamless communication of desired items to friends and family. The backend is crafted with C# for the Web API, while React powers the frontend, ensuring an intuitive user experience. With SQL Server as the database backend, our app is designed to streamline the process of tracking and sharing items you desire

## Features

- **User Authentication:** Users can sign up, log in, and manage their accounts securely.
- **Create Wishlists:** Users can create multiple wishlists to organize their desired items.
- **Add and Remove Items:** Easily add new items to a wishlist or remove existing ones.
- **Search Functionality:** Search for specific users.


## Technologies Used

- **Backend:** C# for Web API development
- **Frontend:** React for building the user interface
- **Database:** SQL Server for storing wishlist data
- **Authentication:** JWT

## Getting Started

To get started with the Wishlist App, follow these steps:

1. **Clone the Repository:**

  ```
git clone https://github.com/fdippiton/wishlist-app.git

  ```

2. **Backend Setup:**
- Navigate to the `wishlist-api` directory.
- Open the solution of the API file in Visual Studio or your preferred IDE.
- Restore NuGet packages and build the solution.
- Update the database connection string in `appsettings.json` to point to your SQL Server instance.
- Run the database migrations to create the necessary tables.
- Start the backend server.

3. **Frontend Setup:**
- Navigate to the `client-app` directory.
- Install dependencies using npm:
  ```
  npm install
  ```
- Start the frontend server:
  ```
  npm start
  ```

4. **Access the Application:**
- Once both the backend and frontend servers are running, access the application in your web browser at `http://localhost:3000` and API at `http://localhost:5109/api/`.

## Contributing

Contributions are welcome! If you have any ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
