# Monitoring API (RAW Node)

- API Server
- Create, Edit, Update, Delete User
- CRUD operation without database, using file system
- Token based authentication
- Logout Mechanism
- Set links & Up or Down links
- Edit or Delete links & rate limit
- Check up or down links per one minute

<h3>How to use this application</h3>
<p>Clone git -> https://github.com/muhammad-alamin1/raw-node-monitoring-app.git</p>

    Postman has been used as client side for this application
    This application run production & local. We run this application http://localhost:8000
    This application all routes are available -->
        * http://localhost:8000/user
        * http://localhost:8000/token
        * http://localhost:8000/check

<h4>User Related routes<h4>

    1. Create user :

        * url: http://localhost:8000/user
        * method: POST
        * requirements data --> firstName(string), lastName(string), phone(string), password(string),toAgreement(boolean)
        * Postman body data like this & hit enter:
            {
                "firstName": "John",
                "lastName": "Doe",
                "phone": "01311111111",
                "password": "YYYY",
                "toAgreement": true,
            }

    2. Get user :

        * url: http://localhost:8000/user?phone=01311111111
        * method: GET
        * Authentication check! Create token & set headers(like dictionary) key=token, value=htb76qi7ajmkc7lq17qrtrtb6
        * Output data like this:
            {
                "firstName": "John",
                "lastName": "Doe",
                "phone": "01311111111",
                "toAgreement": true,
            }

     3. Update user :

        * url: http://localhost:8000/user
        * method: PUT
        * Phone number is primary key
        * Authentication check! Create token & set headers(like dictionary) key=token, value=htb76qi7ajmkc7lq17qrtrtb6
        * We must be send body one updated field
            {
                "firstName": "Abdur",
                "lastName": "Rahman",
                "phone": "01311111111",
                "password": "XXX"
            }

     4. Delete user :

        * url: http://localhost:8000/user?phone=01311111111
        * method: DELETE
        * Phone number is primary key
        * Authentication check! Create token & set headers(like dictionary) key=token, value=htb76qi7ajmkc7lq17qrtrtb6

<h4>Token Related routes<h4>
