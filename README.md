# Food Rating System

to start the server first locate the server folder in the terminal by using the following command ` cd server ` and insert the following commands in the terminal `npm start`

HERE ARE THE DOCUMENTATION OF THE API

// this route helps to add post

(post) http://localhost:5000/post/addpost

    input: {image,post_name,description}
	output: return 1 if it is saved and else 0
 	error: error object

// this route helps to update post

(put) http://localhost:5000/post/updatepost

    input: {post_id, image,post_name,description}
	output: return 1 if it is updated and else 0
	error: error object

// this route helps to list all post with their ratings

(get) http://localhost:5000/post/listallpost

    input: none
	output: []array that contain posts
	error: error object

// this route helps to list specific user rated posts

(post) http://localhost:5000/post/favpost

    input: {user_id}
	output: []array that contains user rated post or empty array if there is no user rated post
	error: error object

// this route helps to select specific post get the post details

(post) http://localhost:5000/post/searchpost

    input:  {post_id}
	output: []array that contains specific post or empty array if the  specific post not found
	error: error object

// this route helps to delete post

(delete) http://localhost:5000/post/deletepost

    input:  {post_id}
	output: return 1 if it is deleted and else 0
	error: error object

// this route helps to add admin

(post) http://localhost:5000/admin/addadmin

    input: {fname,lname,email}
	output: insertID(int value)
	error: error object

// this route helps to update admin

(put) http://localhost:5000/admin/updateadmin

    input: {admin_id,fname,lname,email}
	output: return 1 if it is updated and else 0
	error: error object

// this route helps to delete admin

(delete) http://localhost:5000/admin/deleteadmin

    input: {admin_id}
	output: return 1 if it is deleted and else 0
	error: error object

// this route helps to add user

(post) http://localhost:5000/user/adduser

    input: {fname,lname,email}
	output: insertID(int value)
	error: error object

// this route helps to update user

(put) http://localhost:5000/user/updateuser

    input: {user_id,fname,lname,email}
	output: return 1 if it is updated and else 0
	error: error object

// this route helps to delete user

(delete) http://localhost:5000/user/deleteuser

    input: {user_id}
	output: return 1 if it is deleted and else 0
	error: error object

// this route helps to add rate

(post) http://localhost:5000/rate/addrate

    input: {rate_number,user_id,post_id}
	output: return 1 if it is saved and else 0
	error: error object

// this route helps to update rate

(put) http://localhost:5000/rate/updaterate

    input: {rate_number,user_id,post_id}
	output: return 1 if it is updated and else 0
	error: error object

// this route helps to get specific post rate number that is rated by a specific user

(post) http://localhost:5000/rate/searchrate

    input: {user_id,post_id}
	output: return  0 if it is not rated and else rate number(int)
	error: error object

//this route helps to delete rate

(delete) http://localhost:5000/rate/deleterate

    input: {user_id, post_id}
	output: return 1 if it is deleted and else 0
	error: error object

// this route helps to add useraccount for user

(post) http://localhost:5000/useraccount/adduseraccountuser

    input: {username,password,user_id}
	output: return 1 if it is saved and else 0
	error: error object

// this route helps to add useraccount for admin

(post) http://localhost:5000/useraccount/adduseraccountadmin

    input: {username,password,admin_id}
	output: return 1 if it is saved and else 0
	error: error object

// this route helps to check if the admin username and password exists in the useraccount table

(post) http://localhost:5000/useraccount/checkforadmin

    input: {username, password}
	output: return 0 if the admin is not existed else return {admin_id}
	error: error object

// this route helps to check if the user username and password exists in the useraccount table

(post) http://localhost:5000/useraccount/checkforuser

    input: {username, password}
	output: return 0 if the user is not existed else return {user_id}
	error: error object

// this route helps to update useraccount for user

(put) http://localhost:5000/useraccount/updateuseraccountuser

    input: {password,user_id}
	output: return 1 if it is updated and else 0
	error: error object

// this route helps to update useraccount for admin

(put) http://localhost:5000/useraccount/updateuseraccountadmin

    input: {password,admin_id}
	output: return 1 if it is updated and else 0
	error: error object

// this route helps to update useraccount for user

(delete) http://localhost:5000/useraccount/deleteuseraccountuser

    input: {user_id}
	output: return 1 if it is deleted and else 0
	error: error object

// this route helps to update useraccount for admin

(delete) http://localhost:5000/useraccount/deleteuseraccountadmin

    input: {admin_id}
	output: return 1 if it is deleted and else 0
	error: error object

  Note:

* u need to configure the config file based on your mysql credential
* the api is not fully tested yet
* to link the API with the android app, first u need to edit the index.js file and post.js file that is located on the route folder.
  first your pc and the phone that the app is installed must be connected to the same wifi, then we need to copy the pc IPV4 address and replace the 'localhost' and '127.0.0.1' address.
  after that we can send request and recieve response from the android app by the pc IPV4 address
* the database name must be saved as 'food_rating_system'
* the database does not contain any data
