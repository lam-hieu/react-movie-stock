# Create React App
- npx create-react-app [my-app-name]
- cd [my-app]
- npm start

# Resources
- npm i react-router-dom axios query-string sass swiper@6.8.4 --save
- npm i react-router-dom@5.3.0
- npm install react@17.0.2 react-dom@17.0.2 --save
- npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev


# Fonts
- @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap');

# Icons
- Boxicons: https://boxicons.com/

# API
- API: https://www.themoviedb.org/

# Structure files
    | react-movie-stock
        | src # file sources code
            | api
            | assets
            | components
            | config
            | pages
            | scss
        | public


# Tips code
- rafc -> create Home.jsx Obj
- rafcp

# Deploy Github pages
- install: npm install gh-pages-deploy -g
- add: "homepage": "https://lam-hieu.github.io/react-movie-stock"
- Thêm vào trong thẻ script: "predeploy": "npm run build", "deploy": "gh-pages -d build"