Intially the user needs to be added into DB with the help of Super User 
    email : rightdrawsa@urjita.com
    password: rightdraw$1

Super User / Admin : 
    abilities  : 
        1. Able to create a user into the system then only a user can login
        2. Able to delete a user post that a same user can not able to login into our system
        3. Able to modify a user like tweaking the roles and persoanl details

Login : 
    - Signin => Just basic login with email and password. 
    - Forget password => For a momemnt it's a basic password override in DB
    - Post login based on user roles he/she will be redirected to dedicated module the logic for that avalable in (src/pages/RightDrawWrapper.jsx)

Home : 
    - Based on user all the eligble roles will be displayed here so that user can redirect to any available module

MODULES / Screens : 
    - Admin
    - Designer
        1. Can create designer template and get the PDF.
    - Verifier
        1.Can create verifier template and get the PDF.
    - Approver
        1. Can create approver template and get the PDF.
These are the four pages will be displayed for the user based on roles