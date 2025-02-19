# Prayer Times App Project - Ramadan 2025

![Ramadan Kareem](ramadan.webp)  
*O Allah, let us reach Ramadan*

## Verses about the Importance of Prayer

- **Allah (SWT) says:**  
   _"إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا" (النساء: 103)_ 
  *Prayer is a prescribed duty for the believers, and it is a fundamental part of our faith that we must observe at its appointed times.*

- **Allah (SWT) says:**  
  _"وَأَقِمِ الصَّلَاةَ لِذِكْرِي" (طه: 14)_
  *Prayer is a direct means to remember Allah, and it brings peace and tranquility to our hearts.*

- **Prophet Muhammad (PBUH) said:**  
  _"رَأْسُ الأَمْرِ الإِسْلاَمِ وَعَمُودُهُ الصَّلَاةُ." (حديث)_  
  *Prayer is considered the pillar of Islam, and it is the foundation of the faith upon which everything else rests.*

## Project Overview

### Project Goal

**The Prayer Times App** is a web-based application designed to provide accurate prayer times based on the user's geographic location. It is a tool that helps Muslims keep track of the prayer times, and it includes prayer time alerts with sound notifications for the call to prayer (adhan).

### Features of the Project

1. **Geolocation-Based Prayer Times:**  
   The app detects the user's geographical location and fetches the prayer times accordingly. If the location can't be detected, the app will default to Jerusalem's coordinates (31.7767° N, 35.2345° E).

2. **Prayer Times Display:**  
   The app displays the daily prayer times: Fajr, Dhuhr, Asr, Maghrib, and Isha, in a user-friendly format.

3. **Countdown Timer:**  
   A countdown timer shows the remaining time for the next prayer, dynamically updated every second.

4. **Adhan Sound Notification:**  
   When the time for prayer arrives, the app plays an **adhan** (call to prayer) sound to remind the user to pray, after the user has interacted with the app.

5. **Simple and User-Friendly Interface:**  
   The app has a clean interface that makes it easy for users to see prayer times and the countdown to the next prayer.

### How It Works

- **Technology Used:**  
  The project uses **HTML**, **CSS**, and **JavaScript** for the front-end design. Prayer times are fetched via an API (such as **Aladhan API**) based on the user's geographical coordinates.

- **Technical Workflow:**
  1. When the page is loaded, the app requests the user's geolocation using `navigator.geolocation`.
  2. The app uses this location to fetch prayer times from the API.
  3. Once the prayer times are obtained, the app updates the UI and displays the remaining time until the next prayer.
  4. When the prayer time is reached, an adhan sound is played, if the user has previously interacted with the app (due to browser restrictions).

### Future Enhancements

- **Customizable Options:**  
  There could be additional customization options, such as changing the adhan sound or customizing the UI based on prayer times.

- **Favorite Location Times:**  
  A feature could be added to save prayer times for specific locations so the user doesn't need to repeatedly fetch data from the API.

## Conclusion

- This app aims to help Muslims around the world keep track of their prayer times accurately, using the latest web technologies.  
- With features like geolocation-based prayer times, sound notifications for prayer times, and a countdown timer, it provides an easy and efficient way to ensure prayers are performed on time.

---

**Ramadan Kareem! May Allah accept our fasting and prayers.**
