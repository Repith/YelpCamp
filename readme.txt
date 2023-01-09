Welcome to YelpCamp application!

To successfully launch follow those steps:
1) To download packages press: npm i 
2) Create .env file and set proper settings:
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
MAPBOX_TOKEN=
DB_URL=
3) To create camps via seeds:
- register a user, 
- copy user ID (via mongosh or MondoDBCompass)
- paste it into author: in seeds/index.js
- launch node seeds/index.js to create database of 200 camps