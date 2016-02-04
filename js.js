$(document).ready(function() {
  setTimeout(function(){
    $(".jarvis").fadeOut();
  }, 200);
});


if (annyang) {

  function Speak(message) {
    responsiveVoice.speak(message, "UK English Male");
}
  function thanks() {
    setTimeout(function() {
      annyang.addCommands(giveBack);
    }, 5000);
  }
  var date = new Date();
  var weekday = new Array(7);
      weekday[0]=  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

  var monthDay = new Array(7);
      monthDay[0] = "January";
      monthDay[1] = "February";
      monthDay[2] = "March";
      monthDay[3] = "April";
      monthDay[4] = "May";
      monthDay[5] = "June";
      monthDay[6] = "July";
      monthDay[7] = "August";
      monthDay[8] = "September";
      monthDay[9] = "October";
      monthDay[10] = "November";
      monthDay[11] =  "December";

Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

var currentDay = function() {
  $(".hello").text(weekday[date.getDay()]);
  Speak("It is " + weekday[date.getDay()]);
  thanks();
}

var shortDate = function() {
  $(".hello").text(date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
  Speak("It is " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
  thanks();
}

var longDate = function() {
  $(".hello").text(weekday[date.getDay()] + " " + date.getDate() + " " + monthDay[date.getMonth()] + " " + date.getFullYear());
  Speak("It is " + weekday[date.getDay()] + " " + date.getDate() + " " + monthDay[date.getMonth()] + " " + date.getFullYear());
  thanks();
}

var searchFor = function(term) {
  Speak("Showing results for " + term);
  $(".hello").html("<iframe width='1000' height='2000' src='https://duckduckgo.com/?q="+term+"'></iframe>");
  thanks();
}

var currentWeather = function() {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=6933ba0037482aa067de0a66cb8192eb', function(data) {
   console.log(data);
   console.log(this.weather.description);
   Speak("The weather is currently with a high of " + data.main.temp_max + "degrees and lows of " + data.main.temp_min + "degrees and" + data.description + "s of rain");
  });
  thanks();
}
var tellAJoke = function() {
  var random = Math.floor(Math.random() * 10);
  var jokes = ["Teacher: Kids, what does the chicken give you?Student: Meat! Teacher: Very good! Now what does the pig give you?Student: Bacon! Teacher: Great! And what does the fat cow give you? Student: Homework!", "A child asked his father, How were people born? So his father said, Adam and Eve made babies, then their babies became adults and made babies, and so on. The child then went to his mother, asked her the same question and she told him, We were monkeys then we evolved to become like we are now. The child ran back to his father and said, You lied to me! His father replied, No, your mom was talking about her side of the family.", "Q: What did the duck say when he bought lipstick? A: Put it on my bill.", "What happens to a frog's car when it breaks down? It gets toad away.", "My friend thinks he is smart. He told me an onion is the only food that makes you cry, so I threw a coconut at his face.","Q: Why was six scared of seven? A: Because seven ate nine.", "Q: Why couldn't the blonde add 10 + 5 on a calculator? A: She couldn't find the 10 button.", "A teacher asked her students to use the word beans in a sentence. My father grows beans, said one girl. My mother cooks beans, said a boy. A third student spoke up, We are all human beans.", "A recent worldwide survey showed that out of 2,146,703,436 people, 94% were too lazy to actually read that number.", "Instead of the John, I call my toilet the Jim. That way it sounds better when I say I go to the Jim first thing every morning."];
  $(".hello").text(jokes[random]);
  Speak("Heres one "+jokes[random]+" I am so funny am I not");
  thanks();
}
var randomCatGif = function() {
  $(".hello").append("<a href='http://thecatapi.com'><img src='http://thecatapi.com/api/images/get?format=src&type=gif'></a>");
  Speak("Heres one I found");
  thanks();
}

var randomCatPicture = function() {
  $(".hello").append("<a href='http://thecatapi.com'><img src='http://thecatapi.com/api/images/get?format=src'></a>");
  Speak("Heres one I found... is that not cute?");
  thanks();
}

var doLaugh = function() {
  Speak("ok. Ha ha ha ha ha ha ha ha ha ha ha");
  thanks();
}

var beCreepy = function() {
  console.log("Being creepy");
  Speak("ok. HA ha ha ha ha ", {rate: 0.1});
  Speak("ha ha ha", {pitch: 4}, {rate: 6});
  thanks();
}

var currentTimezone = function(timezone) {
  var timezones = ["GMT"];
  var differences = [0];
  if (!timezones.contains(timezone)) {
    Speak("This timezone does not exist");
  } else {
    console.log(timezones[timezone]);
    var difference = differences[timezones[timezone]];
    var hour = date.getHours() - difference,
      minute = date.getMinutes();

    var dd = "AM";
    if (hour >= 12) {
        hour = hour-12;
        dd = "PM";
    }
    if (hour == 0) {
        hour = 12;
    }
    minute = minute<10?"0"+minute:minute;

    var pattern = new RegExp("0?"+hour+":"+minute);

    var replacement = hour+":"+minute;
    replacement += " "+dd;
    Speak("It is currently "+(replacement)+" in "+timezone);
  }
  thanks();
}

var timeNow = function() {
  var hour = date.getHours(),
      minute = date.getMinutes();

  var dd = "AM";
    if (hour >= 12) {
        hour = hour-12;
        dd = "PM";
    }
    if (hour == 0) {
        hour = 12;
    }
    minute = minute<10?"0"+minute:minute;

    var pattern = new RegExp("0?"+hour+":"+minute);

    var replacement = hour+":"+minute;
    replacement += " "+dd;
  Speak("It is currently "+ replacement);
  thanks();
}

var setTimer = function(time, unit) {
  console.log(time);
  var units = ["minute", "minutes", "hour", "hours", "second", "seconds"];
  if (units.contains(unit)){
    Speak("Setting a timer for "+time+unit);

    if (unit == "minute" ) {
      var time = time*60;
      console.log(time);
    }
    annyang.addCommands({
      'Cancel timer': function() {
        Speak("Cancelling timer.");
        $(".progress").fadeOut();

      }
    })

    $(".progress").animate({
      width: "100%",
      height: "0%"
    }, (time*1000), "linear", function() {
      Speak("DIng ding ding ding ding ding dun dun duuu duun  the timer has finished");
      $(".progress").fadeOut();
    });
  } else {
    Speak("I could not set a timer for " + time + unit);
  }
  thanks();
}

var checkLessons = function() {
  var monday = ["English", "Science", "Maths", "Latin"],
      tuesday = ["Art", "Maths", "Humanities", "French"],
      wednesday = ["Latin", "Maths", "Humanities", "English"],
      thursday = ["Science", "Maths", "English", "French"],
      friday = ["Pe", "Humanities", "Music", "English"],

      englishTecher = "Ms Barber",
      mathsTeacher = "Ms Brown",
      humanitiesTeacher = "Mr Holloway",
      latinTeacher = "Mr Quinlan",
      scienceTeacher = "Mr  Ball",
      peTeacher = "Mr Pickup",
      frenchTeacher = "Ms Krishnan",
      musicTeacher = "Mr Catamole",
      artTeacher = "Ms Neilson";
  if (weekday[date.getDay()] == "Saturday") {
    Speak("Its Saturday, there is no school today");
  }
  else if (weekday[date.getDay()] == "Sunday") {
    Speak("There is no school on Sunday, you dimwit");
  }
  else if (weekday[date.getDay()] == "Monday") {
    Speak("Today you have " + monday[0] + " first period with " + englishTeacher );
  }
  thanks();
}

var awesomeGuy = function() {
  var random = Math.floor(Math.random() * 3);
  var awesomeGuys = ["Max", "Max Ungless", "Max The Monster"];
  Speak("The most awesome guy is " +  awesomeGuys[random]);
   thanks();
}
// Calculator
var calculatorAddition = function(num1, num2) {
  var ans = parseInt(num1) + parseInt(num2);
  if (!parseInt(num1) && !parseInt(num2)) {
      Speak(num1 + "or" + num2 + " is not a number");
    } else {
      Speak(num1 + " plus " + num2 + " equals " + ans);
    }

  thanks();
}

var calculatorSubtraction = function(num1, num2) {
  var ans = parseInt(num1) - parseInt(num2);
  if (!parseInt(num1) && !parseInt(num2)) {
      Speak(num1 + "or" + num2 + " is not a number");
    } else {
      Speak(num1 + " minus " + num2 + " equals " + ans);
    }


  thanks();
}

var calculatorMultiplication = function(num1, num2) {
  var ans = parseInt(num1) * parseInt(num2);
if (!parseInt(num1) && !parseInt(num2)) {
    Speak(num1 + "or" + num2 + " is not a number");
  } else {
    Speak(num1 + " times " + num2 + " equals " + ans);
  }

  thanks();
}

var calculatorDivision = function(num1, num2) {
  console.log("Division is taking progress");
  var ans = parseInt(num1) / parseInt(num2);
  if (!parseInt(num1) && !parseInt(num2)) {
    Speak(num1 + "or" + num2 + " is not a number");
  } else {
    Speak(num1 + " divided by " + num2 + " equals " + ans);
  }
  console.log(ans);

  thanks();
}

var calculatorSquaring = function(num) {
  var num = parseInt(num);
  if (!parseInt(num)) {
    Speak(num + " is not a number");
  } else {
    Speak(num + " squared equals" + (num * num));
  }

  thanks();
}

var calculatorSquareRoot = function(num) {
  if (!parseInt(num)) {
    Speak(num + " is not a number");
  } else {
    var num = parseInt(num);
    Speak("The square root of " + num + " is " + Math.sqrt(num));
  }
}

var calculatorLogarithm = function(num) {
  if (!parseInt(num)) {
    Speak(num + " is not a number");
  } else {
    var num = parseInt(num);
    Speak("Log " + num + " equals " + Math.log(num));
  }
}

var calculatorRounded = function(num) {
  if (!parseFloat(num)) {
    Speak(num + " is not a number");
  } else {
    var num = parseFloat(num);
    Speak(num + " rounded is " + Math.round(num));
  }
}

var calculatorPowers = function(num, power) {
  if (!parseInt(num) && !parseInt(power)) {
    Speak(num + "or "+power+" is not a number" );
  } else {
    var num = parseInt(num);
    var power = parseInt(power);
    Speak(num + "to the power of " + power + " equals " + Math.pow(num, power));
  }
}

var calculatorCircumference = function(diameter) {
  var pi = Math.PI;
  if (!parseInt(diameter)) {
    Speak(diameter + "is not a number" );
  } else {
    var diameter = parseInt(diameter);
    Speak("The circumference of the circle would be " + Math.round(pi * diameter));
  }
}

var calculatorArea = function(radius) {
  var pi = Math.PI;
  if (!parseInt(radius)) {
    Speak(radius + "is not a number" );
  } else {
    var radius = parseInt(radius);
    Speak("The area of the circle would be " + Math.round(pi*(radius*radius)));
  }
}

var recitePi = function() {
  Speak("Sure. " + Math.PI + " that is all I know");
}
var giveBack = {
  'Thanks (Jarvis)': function() {
    Speak("No problem Max. All in a days code.");
  }
}

// SoundCloud

var scSearch = function(term) {
  console.log("It works, Uncle Sam!");
  SC.initialize({
  client_id: 'b0753e3ad8b2e82d5def07b5858d2007'
});
var track_url = 'http://soundcloud.com/forss/flickermood';
SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
  console.log('oEmbed response: ', oEmbed);
});
// find all sounds of buskers licensed under 'creative commons share alike'
  SC.get('/tracks', {
    q: term
  }).then(function(tracks) {
    console.log(tracks);
    Speak("SoundCloud results for " + term);
    $(".hello").text("SoundCloud results for " + term);
    for (i = 0; i < tracks.length; i++) {
      console.log(tracks[i].title);
      $(".hello").append("</br>" + tracks[i].title);

    console.log(tracks[i].permalink_url);
    }

  });
}

var openWebsite = function(website) {
  window.location.href = website;
  console.log("Opening your website");
}
var commands = {
  'What day is it (today)': currentDay,
  'What is the short date (today)': shortDate,
  'What is the long date (today)': longDate,
  'Search for *term': searchFor,
  'What is the weather (like) today': currentWeather,
  'What is the tempurate (like) (today)': currentWeather,
  '(can) (you) tell me (another) (a) joke': tellAJoke,
  '(Can you) show me some (cute) cat gifs': randomCatGif,
  '(Can you) show me (a) (some) (cute) cat (pictures) (images) (photos) (pics)': randomCatPicture,
  'What time is it in *timezone': currentTimezone,
  'What time is it (now)': timeNow,
  'Set a timer for *time *unit': setTimer,
  'What lessons do I have today': checkLessons,
  'Who is the most awesome guy': awesomeGuy,
  'What is *num1 + *num2': calculatorAddition,
  'What is *num1 - *num2': calculatorSubtraction,
  'What is *num1 (times) x *num2': calculatorMultiplication,
  'What is *num1 (divided by) / *num2': calculatorDivision,
  'what is *num squared': calculatorSquaring,
  'What is the square root of *num': calculatorSquareRoot,
  'What is log *num': calculatorLogarithm,
  'What is *num rounded': calculatorRounded,
  'What is *num to the power of *power': calculatorPowers,
  'What is the circumference of a circle with a diameter of *diameter': calculatorCircumference,
  'What is the area of a circle with a radius of *radius': calculatorArea,
  'Recite pi': recitePi,
  'Search SoundCloud for *term': scSearch,
  '*Go to *website': openWebsite
}

annyang.addCommands({
'(hi) (hey) Jarvis': function() {
  console.log("'Sup.");
  if (date.getHours() <= 12) {
    Speak("Morning Max");
  }
  else if (date.getHours() > 12 && date.getHours() < 17) {
    Speak("Good Afternoon Max");
  }
  else if (date.getHours() >= 17) {
    Speak("Evening - Max");
  }
  $(".jarvis-end").css("width", "0");
  annyang.addCommands(commands);
  $(".jarvis-end").animate({
    width: "100%"
  }, 30000, "linear", function() {
    annyang.removeCommands(commands);
  });


}});
annyang.start();


}
