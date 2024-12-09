Backend code found here: https://github.com/kepelbaum/x-clone-backend

# X Clone
A full-stack X (formerly Twitter) clone featuring posts, replies, media sharing, messaging, and notifications.

## Features
- Posts with image/video support (with search function for text content)
- Reply chains and retweets
- Emoji and GIF integration (Giphy API)
- Direct messaging
- Profile customization
- Follow system with suggestions
- Trending hashtags
- Real-time notifications
- Post pagination
- JWT authentication
- Responsive design

## Tech Stack
### Frontend
- Next.js (TypeScript)
- Tailwind CSS
- Deployed on Vercel

### Backend
- Java Spring Boot
- PostgreSQL
- Cloudinary for media storage
- RESTful API architecture
- Deployed on Railway

## Live App

Try it here: [X Clone](https://nu-gold.vercel.app/)

## Local Development
### Frontend
1. `git clone https://github.com/kepelbaum/x-clone-frontend`
2. `cd x-clone-frontend`
3. `npm install`
4. Configure environment variables
5. `npm run dev` for development

### Backend
1. `git clone https://github.com/kepelbaum/x-clone-backend`
2. `cd x-clone-backend`
3. Configure application.properties with PostgreSQL and Cloudinary credentials
4. Run Spring Boot application

Both repositories required for full functionality:
- Frontend: [x-clone-frontend](https://github.com/kepelbaum/x-clone-frontend)
- Backend: [x-clone-backend](https://github.com/kepelbaum/x-clone-backend)

## Future Improvements
- Revisit responsive design for mobile resolutions - mainly message autoscroll (highest priority)
- Minor UI fixes (mainly login screen)
- Refactor large components & standardize naming and structure
- Use Faker.js to populate the app with mock data (users, posts, messages)
- Further UI improvements or extra features (quote replies, images in private messages, etc)

Feel free to contribute or report issues!
