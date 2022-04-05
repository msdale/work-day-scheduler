// global variables
var testHour = null;
var hourParams = [
  {
    "hourId":
      "hr1",
    "hourTag":
      "9AM",
    "hourValue":
      9
  },
  {
    "hourId":
      "hr2",
    "hourTag":
      "10AM",
    "hourValue":
      10
  },
  {
    "hourId":
    "hr3",
    "hourTag":
      "11AM",
    "hourValue":
      11
  },
  {
    "hourId":
      "hr4",
    "hourTag":
      "12PM",
    "hourValue":
      12
  },
  {
    "hourId":
      "hr5",
    "hourTag":
      "1PM",
    "hourValue":
      13
  },
  {
    "hourId":
      "hr6",
    "hourTag":
      "2PM",
    "hourValue":
      14
  },
  {
    "hourId":
      "hr7",
    "hourTag":
      "3PM",
    "hourValue":
      15
  },
  {
    "hourId":
      "hr8",
    "hourTag":
      "4PM",
    "hourValue":
      16
  },
  {
    "hourId":
      "hr9",
    "hourTag":
      "5PM",
    "hourValue":
      17
  }
];

var eventsArray = [];


// FUNCTIONS


/** Save events in local storage */
var saveEvents = function () {
  localStorage.removeItem("events");
  localStorage.setItem("events", JSON.stringify(eventsArray));
}

/** Load events from local storage */
var loadEvents = function () {
  eventsArray = JSON.parse(localStorage.getItem("events"));
  testHour = parseInt(localStorage.getItem("testHour"));
  if (!eventsArray) {
    eventsArray = [];
  }

}

/** Mark daily work hours for past (grey), present (red), and future (green) */
var markPastPresentFuture = function (date) {
  var curHour;

  // for testing
  if (testHour) {
    curHour = testHour;
  } else {
    curHour = date.getHours();
  }

  for (var i = 0; i < hourParams.length; i++) {
    var hrVal = hourParams[i].hourValue;
    var idVal = "#" + hourParams[i].hourId;
    var hourId = hourParams[i].hourId;
    if (hrVal < curHour) {
      $(idVal).find("textarea").css("background-color", "#d3d3d3");
      $(idVal).find("textarea").css("border-color", "black");
      //$(idVal).find("textarea").prop("disabled", true);
    } else if (hrVal > curHour) {
      $(idVal).find("textarea").css("background-color", "#77dd77");
      //$(idVal).find("textarea").prop("disabled", false);
    } else if (hrVal === curHour) {
      $(idVal).find("textarea").css("background-color", "#ff6961");
      //$(idVal).find("textarea").prop("disabled", false);
    } else {
      throw "Data corruption...";
    }

    for (var j = 0; j < eventsArray.length; j++) {
      if (eventsArray[j].id === hourId) {
        $(idVal).find("textarea").text(eventsArray[j].text);
      }
    }
  }
};

/** Print the day and month */
var printDayMonthDDth = function (date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  var month = months[date.getMonth()];
  var monthDay = date.getDate();
  var day = days[date.getDay()];
  var endingTxt = "th";
  switch (day) {
    case 1:
    case 21:
    case 31:
      endingTxt = "st";
      break;
    case 2:
    case 22:
      endingTxt = "nd";
      break;
    case 3:
    case 23:
      endingTxt = "rd";
      break;
  }
  var textDate = day + ", " + month + " " + monthDay + endingTxt;
  $("#currentDay").text(textDate);
};

/** Catch the button click for saving event text and push to events array */
$(":button").on("click", function (event) {
  // get form values
  var eventText = $(this)
    .closest(".row")
    .find("#text")
    .find("textarea")
    .val();

  // find the hour id

  var hourId = $(this)
    .closest(".row")
    .attr("id");

  // insert/update the event text into the stored array
  if (eventsArray.find(obj => { return obj.id === hourId })) {
    var eventIdx = eventsArray.findIndex(obj => obj.id === hourId);
    eventsArray[eventIdx].text = eventText;
  } else {
    eventsArray.push({
      text: eventText,
      id: hourId
    });
  }

  saveEvents();
});

/** Start up or refresh the Work Day Scheduler */
var refresh = function () {
  var date = new Date();
  loadEvents();
  saveEvents();
  printDayMonthDDth(date);
  markPastPresentFuture(date);
}

refresh();

/** refresh/update the Work Day Scheduler */
setInterval(refresh, (10 * 1000));


