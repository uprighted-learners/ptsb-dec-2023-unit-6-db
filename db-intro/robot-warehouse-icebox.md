# Setting Up MongoDB Atlas Cluster
MongoDB Atlas is a fully managed cloud database service that makes it easy to set up, operate, and scale MongoDB deployments. Follow the steps below to create a MongoDB Atlas cluster:
## Step 1: Sign Up or Log In
If you don't have an account, sign up for MongoDB Atlas. If you already have an account, log in to your MongoDB Atlas account.
[MongoDB Atlas](https://cloud.mongodb.com/)
## Step 2: Create a New Cluster
After logging in, click on the Build a Cluster button.
Choose the free plan. You can also edit your provider and region
Name your cluster "replit"
Click the Create Cluster button to initiate the cluster creation process.

## Step 3: Configure Cluster Settings
Set up authentication by creating a MongoDB user with a username and password. MongoDB can autogenerate a secure password for you, make sure you copy the password for later use
In the Connection Security section, configure your IP Whitelist settings to allow connections from your application servers. You can add your IP address or specify a range. 
## Step 4: Connect to Your Cluster
After configuring the cluster settings, click on the Connect button again.
Choose the Connect Your Application option.
Copy the connection string provided. This string contains the necessary information to connect your application to the MongoDB Atlas cluster.
## Step 5: Connect Your Application


In Compass, we will use the same connection string to view our database. In New Connection, paste your connection string and click `Save & Connect` to get started with the lab!

### Example connection string 
`mongodb+srv://<username>:<password>@<clustername>.mongodb.net/<dbname>`

(replace `<username>`, `<password>`, and `<clustername>` with your actual credentials)


## Creating the Warehouse in MongoDB Compass
At the bottom of the grey sidebar, there will be a + button to create a database. In the pop-up form, enter the database name as "warehouse" and the collection name as "robots" and create the database.

In the sidebar, you should now see the warehouse database with the robots collection within it.