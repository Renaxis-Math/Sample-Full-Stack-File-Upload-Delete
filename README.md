# Hoang Chu - Sample Full-Stack File Upload and Delete

## Tech Stack
**Database**: Amazon S3
**Backend**: Node.js; express.js; Multer; Docker
**Middleend**: Axios; S3 client (s3.js); CORS Authentication.
**Frontend**: React.js, @chakra-ui libary; uuid v4

## Algorithm Used
- Higher Order Functions: map, filter
- OOP: state update
- System: async / await
- Ternary Conditional
- Dynamic Rendering and Props

## Instruction
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Build and Run**
- With Docker:
    ```bash
    docker compose up
    ```
    
    or

    ```bash
    docker-compose up
    ```

- Without Docker

    a. Install Node.js (check by npm --version). 
    b. Then, open 2 separated CMD terminals for backend and frontend
    c. In the backend terminal:
    ```bash
    cd backend
    npm install
    node server.js
    ```
    d.In the frontend terminal:
    ```bash
    cd frontend
    npm install
    npm start
    ```

3. **See the result** 
Visit `http://localhost:3000` to access the web app

4. **How to stop**
- With Docker:
    Ctrl + C

    or 
    
    ```bash
    docker ps
    ```

    List all the CONTAINER ID in the left

    For all CONTAINER ID(s) found:
    ```bash
    docker stop {CONTAINER_ID}
    ```

- Without Docker:
    a. In the backend terminal: Ctrl + C
    b. In the frontend terminal: Ctrl + C


## New Update Workflow

1. **Double Check Authentication in AWS S3 Database**
  - Ensure AWS S3 credentials and permissions are correctly configured.

2. **Update TCP/IP Validation in Backend `.env` File for CORS**
  - Modify the `.env` file in the backend directory to configure CORS settings and allow the frontend to communicate with the backend.

3. **Double Check Multer Configuration**
  - Verify Multer setup to handle file uploads and downloads properly in the backend.

4. **Define Request Path in Server (`server.js`)**
  - Specify the API endpoints and routes for handling file upload, download, and deletion operations in `server.js`.

5. **Add Appropriate Functions for S3 Client (`s3.js`)**
  - Implement functions for interacting with AWS S3, including upload, download, and delete operations.

6. **Define Returned Variable Flows**
  - Ensure proper data flow from the server to S3 and then to the frontend. Handle returned variables and update states accordingly.

7. **Frontend Integration**
  - **Main Component**: Integrate functionality into the main component of the frontend.
  - **Separated Component**: Write and test individual components for specific functionalities.
  - **Reintegration**: Combine separated components into the main frontend component and ensure smooth integration.

8. **Docker**
  ```bash
  docker compose down
  docker compose up --build
  ```

## Features

### Visual

- **Button-Based Visual**
  - Interactive buttons for file upload and deletion, styled dynamically.

- **On-Hold Uploading Filename**
  - Display the filename of the selected file during the upload process.

- **Image Grid Display**
  - Images are displayed in a dynamically organized N x 3 grid layout.

- **Dynamically Resized Button**
  - Button size adjusts based on window dimensions.

- **Dynamically Truncated Filename**
  - Long filenames are truncated to fit within the button area.

- **Dynamically Resized Image Dimensions**
  - Image sizes are adjusted based on container dimensions for a responsive layout.

- **Auto-Retrieve Filtered Files**
  - Fetch and display filtered files from S3 automatically when the browser starts or refreshes.

### Upload

- **Single File Upload**
  - Only one file can be uploaded at a time.

- **Folder and File Upload**
  - Supports uploading folders and files of all extensions.

- **Choose File Default**
  - Displays "Choose file" if no file is selected.

- **Unique File Naming**
  - Abstract (hash) the file name to a unique identifier in S3.

- **Timed Notifications**
  - Notifications for upload success or error, displayed for a timed duration.

- **File Count**
  - Count and display the number of uploaded files, updating the count after each upload.

- **Filter Files**
  - Only image files are displayed; non-image files are filtered out.

### Delete Each Image

- **Delete Button**
  - Each image can be deleted using a button displayed on the image.

- **Button Resizing**
  - Delete button resizes dynamically based on the image size.

- **Count Update**
  - Update the file count after each deletion, and persist the count across browser refreshes.

### Delete All Files

- **Bulk Deletion**
  - Option to delete all files from S3.

- **Count Reset**
  - Reset the file count to 0 after deletion, with the count persisting across browser refreshes or restarts.

## Setup

1. **Backend Setup**
   - Configure the `.env` file with AWS credentials and other necessary environment variables.
   - Install dependencies and run the backend server.

2. **Frontend Setup**
   - Configure environment variables for the frontend.
   - Build and serve the React application.

## Running the Application

1. **Start the Backend**
   - Run the backend server using `npm start` or similar command.

2. **Start the Frontend**
   - Serve the React frontend application using `npm start`.

## Contribution

Feel free to contribute to this project by submitting pull requests or opening issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.