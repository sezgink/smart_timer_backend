# smart_timer_backend

Timer app for tracking work periods, with aim of observe most effective time cycles and protect mental wellbeing while working.

For working example https://sezgink.github.io/smart_timer
(need for connecting to backend)

## Backend Job

Handle login and signup.

Give user JWT on login and check it for identification and authentication.

Saving the intervals from timer to DB and serve their daily intervals to user.

Creating, removing tasks on DB and serving tasks for each user.

Fetching working data of user from DB in defined days and send it to front-end in packs with meaningful data such as how much work made in defined days and which task they spend time with how much for each.

## Project Details

Used Express as router, mongoDB as non relational database, mongoose as mongoDB driver, JWT for signing authenication tokens.

ReactJS front-end source link: https://github.com/sezgink/smart_timer

 
