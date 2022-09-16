# Tutor.remote Project

## Description

Application built with React framework which helps users to find tutors based on the subject, level and price. It also allows users to post their offers and become a tutors. App is fetching data making API calls to Firebase Realtime Database.

Tech Stack: HTML, CSS, React.js, GIT, Firebase.

Used hooks: useState, useEffect, useCallback, useContext
## Features
### Rendering results
After loading the page, application starts to fetch tutors data from Firebase Realtime Database by use of "use-http" custom hook. Then tutors data starts being rendered in "Tutors" Component. Due to app's state error or loading (spinner) message is rendered.

### Filtering results
User is allowed to filter results by category and level or sort them by price and release date. By use of React hooks results start being rerendered after filter change.

### Form
User is able to post his tutoring offer on the website by use of form. Form consist of several text, number and checkbox inputs. To submit it, user has to insert all needed data and if they are valid, "Post your offer" button will be activated. Input valididation was performed by use of "use-input" custom hook. After form submission, app is uploding new tutor offer to Firebase Database.


