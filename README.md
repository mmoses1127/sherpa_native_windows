# README: Sherpa React Native Test

# Overview

This mobile application application allows has basic authentication (using protected routes)
for two users who will login to do two different sets of
controls and set settings intervals for either temperature or fan speed.

# Demo

[Demo Video](https://www.loom.com/share/e88c0db53f5043b18ed7b38eacf7a28b)

# Caveats

- Testing of this application was only done on an Android device. iOS functionality may be limited.
- This application features a SQLite local database that is stored on the user's device. This is for simplicity and ease of testing. In a production build, a remote database would be used.

# Functionality

- User A will create a list of temperatures in a 24h period.
- Each list item will contain 3 values: Start time, end time, temperature
(accuracy of 0.1) value (no lower than 0, no higher than 100).
- User A can delete, edit and add new list items.
- User A can also switch the temperature view from Fahrenheit to Celsius in a
separate page.
- Consider the server only takes in measurements in Celsius.
- User B will create a list of fan intensities in a 24h period.
- Each list item will contain 3 values: Start time, end time, intensity value (low,
medium, high).
- User B can delete, edit and add new list items.
- User B can also switch the intensity from [low, medium, high] to [1, 2, 3].
- Consider the server only takes in number values [1,2,3].

# Deployment

1. Clone the project, open a terminal in the root directory, and run 'npm install'.
2. Once you have all dependencies, run 'npx expo start' to use the expo platform to run the app.
3. Follow the instructions to connect your device or an emulator (the Expo Go app is needed to use a pysical device).


# Login

Sign up is currently disabled but below are the login credentials for the two user types:

- User A: email: a@test.io password: 'password'
- User B: email: b@test.io password: 'password'

The authentication protocol is currently set to tab-strictness, meaning that closing a tab will log a user out, and multiple users can be logged in on different tabs. These settings can be changed by changing the location from which the session restore function acquires the user credential (from sessionStorage to browser cookies).

# Development Notes

## Styling

- Styling is accomplished via utility classes, using the [TailwindCSS](https://tailwindcss.com/) framework.
- Pixel-perfect rendering was not prioritized in this project - clarity and functionality were made a priority.

## Contact

- Developer: Michael Moses
- GitHub: github.com/mmoses1127
- Email: [mmoses1127@gmail.com](mmoses1127@gmail.com)
- Favorite Color: green :green_heart:
