## Movie Ticket Reservation API Documentation

This API provides a simple interface for managing and retrieving movie data and order information. It can be used to power a movie information website or application.

**Public URL:**  [https://rich-gold-crow-hem.cyclic.app](https://rich-gold-crow-hem.cyclic.app)
**Base URL:**  http://localhost:3000

### **Endpoints**

#### **ADMIN ENDPOINTS**

* **POST /movie-control** 
   * Adds a new movie to the database.
   * **Request Body (JSON):**
      ```json
      {
        "title": "Movie Title",
        "genre": "Movie Genre",
        "release_date": "YYYY-MM-DD",
        "runtime": 120, 
        "rating": 4, 
        "age_rating": "PG-13",
        "synopsis": "Movie Description",
        "poster_image_url": "https://..." 
      }
      ```
   * **Example:**
      ```
      curl -X POST http://localhost:3000/movie-control \
      -H "Content-Type: application/json" \
      -d '{"title": "Avatar: The Way of Water", "genre": "Action", ... }' 
      ```

* **PUT /movie-control/:id**
   * Updates an existing movie.
   * **Path Parameter:**
      * `id`: ID of the movie to update. 
   * **Request Body (JSON):** (Same structure as POST)
   * **Example:**
      ```
      curl -X PUT http://localhost:3000/movie-control/3 \
      -H "Content-Type: application/json" \
      -d '{"title": "The Avengers", "genre": "Superhero", ... }'
     ```

* **DELETE /movie-control/:id**
   * Deletes a movie from the database.
   * **Path Parameter:**
     * `id`: ID of the movie to delete.
   * **Example:**
     ```
     curl -X DELETE http://localhost:3000/movie-control/5 
     ```

#### **USER ENDPOINTS**

* **GET /movies**
  * Retrieves a list of all movies.
  * **Example:**
    ```
    curl http://localhost:3000/movies 
    ```

* **GET /movie-details/:id**
  * Retrieves details of a specific movie.
  * **Path Parameter:**
    * `id`: ID of the movie.
  * **Example:**
    ```
    curl http://localhost:3000/movie-details/2 
    ```

* **GET /orders**
  * Retrieves list of all orders.
  * **Example:**
    ```
    curl http://localhost:3000/orders
    ```

* **GET /order-details/:id**
  * Retrieves details of a specific order.
  * **Path Parameter:**
    * `id`: ID of the order.
  * **Example:**
    ```
    curl http://localhost:3000/order-details/1
    ```

* **POST /order-details/:id**
  * Creates a new order.
  * **Path Parameter:**
    * `id`: ID of the movie to order.
  * **Example:**
    ```
    curl -X POST http://localhost:3000/order-details/4
    ```

* **DELETE /order-details/:id**
   * Deletes an order.
   * **Path Parameter:**
     * `id`: ID of the order to delete.
   * **Example:**
     ```
     curl -X DELETE http://localhost:3000/order-details/2 
     ```  

* **PUT /order-details/:id**
   * Updates the status of an order.
   * **Path Parameter:**
     * `id`: ID of the order to update.
   * **Request Body:**
     *  ```json
     *  { "status": "Confirmed" }
     *  ```
   * **Example:**
     ```
     curl -X PUT http://localhost:3000/order-details/1 -H "Content-Type: application/json" -d '{"status": "Confirmed"}'
     ```  
