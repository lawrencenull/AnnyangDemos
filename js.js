$(document).ready(function() {
  setTimeout(function(){
    $(".jarvis").animate({
      height: "10%",
      top: 0,
      opacity: 0.5,
      zIndex: 2
    }, 200 );
    $(".jarvis h1").css("letter-spacing", "1.6em");
    $(".jarvis h1").css("opacity", 1, "!important");
  }, 200)

});


if (annyang) {


 function calcTime(timezone, offset) {
     // create Date object for current location
     var d = new Date();

     // convert to msec
     // subtract local time zone offset
     // get UTC time in msec
     var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

     // create new Date object for different timezone
     // using supplied offset
     var nd = new Date(utc + (3600000*offset));
     Speak("It is currently " + getTimeAsString(nd) + " in " + timezone);
   }

   function getTimeAsString(date) {
     return date.getHours() + ' ' + date.getMinutes();
   }
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
   console.log(data.weather.description);
   Speak("In London there are" + data.weather[0].description + " and an average temperature of " + (data.main.temp-273.15) + " degrees celcius");
  });
  thanks();
}

var currentTempurature = function() {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=6933ba0037482aa067de0a66cb8192eb', function(data) {
   console.log(data);
   console.log(data.weather.description);
   Speak("In London the tempurature is " + (data.main.temp-273.15) + " degrees celcius");
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


var currentTimezone = function(timezone) {
 $.getJSON("timezones.json", function(data) {
   console.log(timezone);
   var found = false;
   for (var i = 0; i < data.length; i++) {
     if (data[i].abbr == timezone ) {
       found = true;
       console.log("Looking up timezone "+data[i].abbr+" found at index "+i);
       calcTime(timezone, data[i].offset);
       break;
     }
   }
   if (!found) {
     console.log("That is not a timezome!");
     Speak(timezone + " is not a timezone");
   }

 });
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
  var d = new Date();
  var currentDay = weekday[d.getDay()];
  if (currentDay == "Saturday") {
    Speak("Its Saturday, there is no school today");
  }
  else if (currentDay == "Sunday") {
    Speak("There is no school on Sunday, you dimwit");
  } else {
    $.getJSON("lessons.json", function(data) {

      var today = data.day.currentDay;

      Speak("Here are your lessons for " + today + " - ");
      for (var i = 0; i < 4; i++) {
        if (!i == 4) {
        Speak(today.lessons[i].subject + " with " + today.lessons[i].teacher + " in " + today.lessons[i].room + " then ");
      } else {
        Speak(today.lessons[i].subject + " with " + today.lessons[i].teacher + " in " + today.lessons[i].room);
      }
    }
    });
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
  console.log(num1 + num2);
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
  thanks();
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
  thanks();
}

var openWebsite = function(website) {
  window.location.href = website;
  console.log("Opening your website");
}

var takeAPicture = function() {
   Speak("This feature is not currently working.");
   thanks();
}

var searchWikipedia = function(term) {
  console.log("Searching Wikipedia for " + term);
  Speak("Showing results for " + term);
  $(".hello").html("<iframe width='1000' height='2000' src='https://en.wikipedia.org/w/index.php?search="+term+"'></iframe>");
  thanks();
}

var trendingNow = function() {
  Speak("Here is what is trending");
 $.getJSON('http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=https://www.google.co.uk/trends/hottrends/atom/feed', function(data) {

      console.log(data);
  });

  console.log("Trending right now");

  $(".hello").html("<iframe scrolling='no' style='border:none;' width='250' height='413' src='https://www.google.co.uk/trends/hottrends/widget?pn=p9&amp;tn=10&amp;h=413'></iframe>");

  thanks();
}

var playDubstep = function() {
  Speak("0000000000000000 - drop that bass - weeeeeeeeeeewwwwwwwwaaaaaaawwwwwwwwwweaaaaaaaaa 0000000 - yea yea yea yea yea yea yea yea yea yea yea  - wub wub wub wub - ye ya xye ya ye ya bam bam bam ye ya ye ya wubty wub wub bots - bebebebebebebebebebebebebebbebebebebe zzzzzzzz - word ");
  thanks();
}

var beingCool = function() {
  Speak("Like this - yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea yea - Satisfied?");
  thanks();
}

var alternativesTo = function(alternative) {
  Speak("Here are some alternatives to " + alternative);
  $(".hello").html("<iframe id='alternativesto' scrolling='no' style='border:none;' width='1000' height='3000' src='http://alternativeto.net/software/" + alternative + "/'></iframe>");
  var iframe = document.getElementById('alternativesto');
  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

  var appTitle = innerDoc.getElementsByClassName('app-title');

  console.log(alternative);
  console.log(appTitle);
  thanks();
}

var quoteOfTheDay = function() {
  $.getJSON('http://quotes.rest/qod.json', function(data) {
    console.log(data);
    var quote = data.contents.quotes[0];
    $(".hello").append("<img src='" + quote.background + "'> <h1> " + quote.quote + "</h1>");
    Speak("The quote of the day for " + quote.date + " is by "+ quote.author + " and is as follows - " + quote.quote  + "- inspiring right?");
  });
  thanks();
}

var wordOfTheDay = function() {
  Speak("This feature is currently not available.");
  thanks();
}
var repeatThis = function(repeat) {
  Speak(repeat);
  thanks();
}

var getDefinition = function(word) {
  $.ajax({
    type: "GET",
    // Append the word to the url for the API call
    url: "https://montanaflynn-dictionary.p.mashape.com/define?word=" + word,
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 'MwhiJe6mqQmshMKv2FuIORKmLLs8p17GsmFjsnUBUL2AXKIvsI');
    },
    success: function(data) {
      Speak(word + " means " + data.definitions[0].text);
      console.log (JSON.stringify(data));
      console.log("Requesting Dictionary");
    },
    error: function() { console.log("There has been an error"); },
  });
  thanks();
}

var airQuality = function(place) {
  $.getJSON('https://api.breezometer.com/baqi/?location=' + place + '&key=08cb3609c5ce4105baa59da1324d4d46', function(data) {
    Speak("The air in " + data.country_name + " is of " + data.breezometer_description + " and the main pollutant is " + data.dominant_pollutant_description);
  });
  thanks();
}

var timeOfDay = function() {
  if (date.getHours() < 12) {
    Speak("It is the morning");
  }
  else if (date.getHours() == 12) {
    Speak("It is mid day");
  }
  else if (date.getHours() < 17) {
    Speak("It is the afternoon");
  }
  else if (date.getHours() >= 17  && date.getHours() < 20) {
    Speak("It is the evening");
  }
  else if (date.getHours() >= 20) {
    Speak("It is the night");
  }
  thanks();
}

var whoIsKitty = function() {
  Speak("Kitty - also known as Kitty Jean Prevezer - is a 13 year old school girl studying, she is currently in Year 8.");
  thanks();
}

var whoIsFlo = function() {
  Speak("Flo - also known as Florence Alice Ingelby - is a 13 year old school girl, she is currently in Year 8");
  thanks();
}

var whoIsEssie = function() {
  Speak("Essie - also known as Esther Webb - is a 12 year old school girl, she is currently in year 8");
  thanks();
}

var whoIsSuki = function() {
  Speak("Suki - also known as Suki Griffiths -  is a 13 year old school girl, she is currently in year 8");
  thanks();
}

var whoIsScarlett = function() {
  Speak("Scarlett is a 13 year old school girl, she is currrently in year 8");
  thanks();
}

var whoIsKittyB = function() {
  Speak("Kitty B - also known as Kitty Katherine, is a 12 year old school girl, she is currently in Year 8");
  thanks();
}

var loveCalculator = function(name1, name2) {
  var random = Math.round(Math.random() * (100 - 0) + 0);

  console.log(random);
  if (random == 100) {
    Speak("They are a " + random + " percent amazing couple. They will get together very soon or should already be together");
  }
  else if (random > 90) {
    Speak("This is an amazing match." + name1 + " and " + name2 + " could be a couple! Almost will be. Good luck with a score of " + random + " percent");
  }
  else if (random > 70) {
    Speak("Ooh la la. Looks like " + name1 + " and " + name2 + " would be great match with a score of " + random + " percent");
  }
  else if (random < 20) {
    Speak(name1 + " and " + name2 + " would never go together! Euurgh. They have a score of " + random + " percent");
  }
  else if (random < 50) {
    Speak("Meh, I dont think that " + name1 + " and " + name2 + " would be a good match  - with a score of " + random + "percent");
  }
  thanks();
}

var whoIsNatty = function() {
  Speak("Natty - also known as Nathaniel Abbebe Assafa - is a 12 year old school boy, currently studying for his exams");
  thanks();
}

var whoIsMax = function() {
  Speak("Whos Max - Oh hes really nobody. Only really the smartest bestest person ever.");
}
var firstNounEndings = function() {
  var singEndings = ["a", "am", "i", "i", "a"];
  var plurEndings = ["i", "as", "arum", "is", "is"];

  Speak("The singular endings for the first declension are - " + singEndings + " and the plural endings are - " + plurEndings);
  thanks();
}

var secondMasculineNounEndings = function() {
  var singEndings = ["us", "um", "i", "o", "o"];
  var plurEndings = ["i", "os", "orum", "is", "is"];

  Speak("The singular endings for the second declension masculine are - " + singEndings + " and the plural endings are - " + plurEndings);
  thanks();
}

var secondNeuterNounEndings = function() {
  var singEndings = ["um", "um", "i", "o", "o"];
  var plurEndings = ["a", "a", "arum", "is", "is"];

  Speak("The singular endings for the second declension masculine are - " + singEndings + " and the plural endings are - " + plurEndings);
  thanks();
}

var thirdMasculineNounEndings = function() {
    var singEndings = ["none", "em", "is", "i", "e"];
    var plurEndings = ["es", "es", "um", "ibus", "ibus"];

    Speak("The singular endings for the third declension masculine are - " + singEndings + " and the plural endings are - " + plurEndings);
    thanks();
}

var mostRecentEarthQuake = function() {
  $.ajax({
    type: "GET",
    // Append the word to the url for the API call
    url: "https://montanaflynn-earthquake-seismology.p.mashape.com/eqs?limit=10&min_magnitude=0'",
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 'VcvzGHfd7OmshN6WShvEXZB3BT1Cp17odfXjsnezo6xbGaZ40J');
    },
    success: function(data) {
      Speak("The most recent earthquake was in " + data.earthquakes[0].region + " and had a recorded magnitude of " + data.earthquakes[0].magnitude + " - the date was " + data.earthquakes[0].timedate);
    },
    error: function() {
      console.log("There has been an error");
      Speak("I could not get the latest Earthquake");
    },
  });
}

var recentEarthquakeAbove = function(magnitude) {
  $.ajax({
    type: "GET",
    // Append the word to the url for the API call
    url: "https://montanaflynn-earthquake-seismology.p.mashape.com/eqs?limit=10&min_magnitude=" + magnitude,
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 'VcvzGHfd7OmshN6WShvEXZB3BT1Cp17odfXjsnezo6xbGaZ40J');
    },
    success: function(data) {
      Speak("The most recent earthquake with a magnitude of " + magnitude + " or above was located in " + data.earthquakes[0].region + " and had a recorded magnitude of " + data.earthquakes[0].magnitude + " at " + data.earthquakes[0].timedate);
    },
    error: function() {
      console.log("There has been an error");
      Speak("I could not get the latest Earthquake");
    },
  });
}

var recentEarthquakeMagnitude = function(magnitude) {
  $.ajax({
    type: "GET",
    // Append the word to the url for the API call
    url: "https://montanaflynn-earthquake-seismology.p.mashape.com/eqs?limit=10&min_magnitude='",
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 'VcvzGHfd7OmshN6WShvEXZB3BT1Cp17odfXjsnezo6xbGaZ40J');
    },
    success: function(data) {
      Speak("The most recent earthquake was in " + data.earthquakes[0].region + " and had a recorded magnitude of " + data.earthquakes[0].magnitude + " - the date was " + data.earthquakes[0].timedate);
    },
    error: function() {
      console.log("There has been an error");
      Speak("I could not get the latest Earthquake");
    },
  });
}

// Conversions

var metreToCentimeter = function(num) {
  console.log(num);
}

var additionTest = function() {
  Speak("Ready - Lets go - reply by saying  the answer is whatever the answer is");
  questions = []
  answers = []


  for (var x = 1; x <= 10; x++) {
      var random1 =  Math.floor(Math.random() * (10 - 1)) + 1;
      var random2 =  Math.floor(Math.random() * (10 - 1)) + 1;

      var question = random1 + " + " + random2;
      var answer = random1 + random2;

      console.log(question);
      console.log(answer);

      questions.push(question);
      answers.push(answer);
  }
  for (num in questions) {
    Speak(question[num]);
    annyang.addCommands(reply);
    var check = function(answer) {
      console.log(answer);
      if (answer == answers[num]) {
        Speak("Correct.");
        return;
      } else {

        Speak("Du Do - Wrong");
        return;
      }
    }
    var reply = {
      'The answer = *answer': check
    }
  }
}

var commands = {
  'What day is it (today)': currentDay,
  'What is the short date (today)': shortDate,
  'What is the long date (today)': longDate,
  'Search for *term': searchFor,
  'What is the weather (like) today': currentWeather,
  'What is the tempurate (like) (today)': currentTempurature,
  '(can) (you) tell me (another) (a) joke': tellAJoke,
  '(Can you) show me some cute cat gifs': randomCatGif,
  'Show me some cat gifs': randomCatGif,
  'I need cat': randomCatGif,
  'Give me some cat': randomCatGif,
  'Show some cat pictures': randomCatPicture,
  '(Can you) show me (a) (some) (cute) cat (pictures) (images) (photos) (pics)': randomCatPicture,
  'What time is it in *timezone': currentTimezone,
  'What time is it (now)': timeNow,
  'Set a timer for *time *unit': setTimer,
  'Start a timer for *time *unit': setTimer,
  'What lessons do I have today': checkLessons,
  'Who is the most awesome guy': awesomeGuy,
  'What is *num1 + *num2': calculatorAddition,
  'What is *num1 - *num2': calculatorSubtraction,
  'What is *num1 (times) x *num2': calculatorMultiplication,
  'What is *num1 divided by *num2': calculatorDivision,
  'what is *num squared': calculatorSquaring,
  'What is the square root of *num': calculatorSquareRoot,
  'What is log *num': calculatorLogarithm,
  'What is *num rounded': calculatorRounded,
  'What is *num to the power of *power': calculatorPowers,
  'What is the circumference of a circle with a diameter of *diameter': calculatorCircumference,
  'What is the area of a circle with a radius of *radius': calculatorArea,
  'Recite pi': recitePi,
  'Search SoundCloud for *term': scSearch,
  'Go to *website': openWebsite,
  'Take a photo': takeAPicture,
  'Search Wikipedia for *term': searchWikipedia,
  'What is trending right now': trendingNow,
  'Whats trending': trendingNow,
  'Play some dubstep': playDubstep,
  'Beatbox for me': playDubstep,
  'Sing some dubstep': playDubstep,
  'Sing some dubstpe for me': playDubstep,
  'What is being cool like': beingCool,
  '(what are some) Alternatives to *alternative': alternativesTo,
  'Show me some alternatives to *alternative': alternativesTo,
  'What is the quote of the day': quoteOfTheDay,
  'Show me the quote of the day': quoteOfTheDay,
  'What is the quote of the day today': quoteOfTheDay,
  'Repeat this *repeat': repeatThis,
  'Can you repeat this *repeat': repeatThis,
  'What is the word of the day': wordOfTheDay,
  'What does *word mean': getDefinition,
  'What is the definition of *word': getDefinition,
  'Define *word': getDefinition,
  'What is the air like in *place': airQuality,
  'What is the air quality (like) in (the) *place': airQuality,
  'How is the air quality in (the) *place': airQuality,
  'What time of day is it': timeOfDay,
  'What sort of time (of day) is it': timeOfDay,
  'Who is Kitty': whoIsKitty,
  'Who is Flow': whoIsFlo,
  'Who is Essie ': whoIsEssie,
  'Who is Scarlett': whoIsScarlett,
  'Who is Suki': whoIsSuki,
  'Who is Natty': whoIsNatty,
  'Who is Max': whoIsMax,
  'Who is Kitty Katherine': whoIsKittyB,
  'Wood *name1 and *name2 be a good match': loveCalculator,
  'Calculate *name1 and *name2 s love status': loveCalculator,
  'Recite (the) first declension noun endings': firstNounEndings,
  'Recite (the) second declension masculine noun endings': secondMasculineNounEndings,
  'Recite (the) second declension neuter noun endings': secondNeuterNounEndings,
  'Recite (the) third declension masculine noun endings': thirdMasculineNounEndings,
  'What is the most recent earthquake': mostRecentEarthQuake,
  'What was the most recent earhtquake': mostRecentEarthQuake,
  'What was the most recent earthquake with a magnitude above *magnitude': recentEarthquakeAbove,
  'What was the most recent earthquake with a magnitude of *magnitude': recentEarthquakeMagnitude,
  'Convert *num meter(s) to centimeters': metreToCentimeter,
  'Give me an addition test': additionTest
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
    Speak("Evening Max");
  }
  $(".jarvis-end").css("width", "0");
  annyang.addCommands(commands);
  $(".jarvis-end").animate({
    width: "100%"
  }, 30000, "linear", function() {
    annyang.removeCommands(commands);
  });
},
'Whats up': function() {
  console.log("'sup.");
  Speak("Apart from the ceiling? Nothing much.");
  $(".jarvis-end").css("width", "0 !important");
  annyang.addCommands(commands);
  $(".jarvis-end").animate({
    width: "100%"
  }, 30000, "linear", function() {
    annyang.removeCommands(commands);
  });
}
});

annyang.start();
}
