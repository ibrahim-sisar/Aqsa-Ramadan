const fajr = document.getElementById("fajr");
const dhuhr = document.getElementById("dhuhr");
const asr = document.getElementById("asr");
const maghrib = document.getElementById("maghrib");
const isha = document.getElementById("isha");
const time = document.getElementById("time");
const date = document.getElementById("date");
const countdown = document.getElementById("countdown");
const activateSoundBtn = document.getElementById("activateSoundBtn");

const prayerTimes = {
  fajr: "05:00",
  dhuhr: "12:30",
  asr: "15:45",
  maghrib: "18:30",
  isha: "20:00",
};

const adhanAudio = new Audio("adhan.mp3");

function askForSoundPermission() {
  activateSoundBtn.style.display = "block"; 
}

activateSoundBtn.addEventListener("click", () => {
  adhanAudio.play();
  activateSoundBtn.style.display = "none"; 
});

function get_location() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      main(latitude, longitude);
    },
    (error) => {
      if (error.message == "User denied Geolocation") {
        alert(
          "لم نتمكن من الحصول على موقعك الجغرافي. سيتم اعتماد موقع القدس كبديل."
        );
        main(31.7767, 35.2345);
      }
    }
  );
}

async function main(latitude, longitude) {
  const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=5`;

  let prayerTimesData = await get_data_from_api(url);
  if (prayerTimesData) {
    prayerTimes.fajr = prayerTimesData.data.timings.Fajr;
    prayerTimes.dhuhr = prayerTimesData.data.timings.Dhuhr;
    prayerTimes.asr = prayerTimesData.data.timings.Asr;
    prayerTimes.maghrib = prayerTimesData.data.timings.Maghrib;
    prayerTimes.isha = prayerTimesData.data.timings.Isha;

    fajr.innerHTML = from_24_to_12(prayerTimes.fajr);
    dhuhr.innerHTML = from_24_to_12(prayerTimes.dhuhr);
    asr.innerHTML = from_24_to_12(prayerTimes.asr);
    maghrib.innerHTML = from_24_to_12(prayerTimes.maghrib);
    isha.innerHTML = from_24_to_12(prayerTimes.isha);
    date.innerHTML = prayerTimesData.data.date.gregorian.date;

    setInterval(() => {
      time.innerHTML = get_time();
      let nextPrayer = get_next_prayer();
      let timeToNextPrayer = display_time_until_prayer(prayerTimes[nextPrayer]);
      countdown.innerHTML = `${timeToNextPrayer[0]}:${timeToNextPrayer[1]}:${timeToNextPrayer[2]}`;

      let nextPrayerTime = prayerTimes[nextPrayer];
      let [hours, minutes] = nextPrayerTime.split(":").map(Number);
      let nextPrayerInMinutes = hours * 60 + minutes;
      let currentTimeInMinutes =
        new Date().getHours() * 60 + new Date().getMinutes();
      let nextPrayerInSeconds = nextPrayerInMinutes * 60;
      let currentTimeInSeconds =
        currentTimeInMinutes * 60 + new Date().getSeconds();

      if (nextPrayerInSeconds === currentTimeInSeconds) {
        alert("حان الأن موعد الأذان");
        adhanAudio.play();
      }
    }, 1000);
  }
}

async function get_data_from_api(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function get_time() {
  let time2 = new Date();
  let hours = time2.getHours();
  let minutes = time2.getMinutes();
  let seconds = time2.getSeconds();

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  if (hours > 12) {
    hours = hours - 12;
    return `م ${hours}:${minutes}:${seconds}`;
  } else {
    if (hours === 0) {
      hours = 12;
    }
    return `ص ${hours}:${minutes}:${seconds}`;
  }
}

function from_24_to_12(time) {
  let [hours, minutes] = time.split(":");
  if (+hours === 0) {
    hours = 12;
  } else if (+hours > 12) {
    hours = +hours - 12;
    return "م " + hours + ":" + minutes;
  }
  return "ص " + time;
}

function get_next_prayer() {
  let time2 = new Date();
  let hour = time2.getHours();
  let minute = time2.getMinutes();
  let currentTime = hour * 60 + minute + time2.getSeconds() / 60;

  fajr.style.color = "#fff";
  dhuhr.style.color = "#fff";
  asr.style.color = "#fff";
  maghrib.style.color = "#fff";
  isha.style.color = "#fff";

  let prayers = {
    fajr: time_to_minutes(prayerTimes.fajr),
    dhuhr: time_to_minutes(prayerTimes.dhuhr),
    asr: time_to_minutes(prayerTimes.asr),
    maghrib: time_to_minutes(prayerTimes.maghrib),
    isha: time_to_minutes(prayerTimes.isha),
  };

  for (let prayer in prayers) {
    if (prayers[prayer] > currentTime) {
      document.getElementById(prayer).style.color = "orange";
      return prayer;
    }
  }

  document.getElementById("fajr").style.color = "orange";
  return "fajr";
}

function time_to_minutes(time) {
  let [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function display_time_until_prayer(prayerTime) {
  const { hours, minutes, seconds } = get_time_until_prayer(prayerTime);
  return [hours, minutes, seconds];
}

function get_time_until_prayer(prayerTime) {
  const now = new Date();
  const [hours, minutes] = prayerTime.split(":").map(Number);
  const prayerDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  if (now > prayerDate) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }

  const diff = prayerDate - now;
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const diffInSeconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    hours: diffInHours,
    minutes: diffInMinutes,
    seconds: diffInSeconds,
  };
}

askForSoundPermission();

get_location();
