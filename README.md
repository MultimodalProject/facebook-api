facebook-api
============

Pulls User data from the facebook graph API and places it in a relational DB.

TODO: 

- mutual friends (how it works, how to we put it to the database)
- pull nodes and links from database, put it into json
- question set 
    1. Friends older than x
    2. Friends younger than x
    3. Friends of x who are female
    4. Friends of x who live in y
    5. Females from Y
    6. zoom in
    7. zoom out
    8. reset view
- interaction with nodes ( hover, drag, see what happens )

Simon:
- implement a check in the beginning, so the data is not pulled if the user had done it before
- inspirational people build proper array (at the moment it just says database)
- objects missing from data base ( not all are inserted )

Doga:
- add a php file which can query the database
