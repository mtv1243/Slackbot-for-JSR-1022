var WebClient;

WebClient = require("@slack/client").WebClient;

var squirrels;
squirrels = ["http://img.skitch.com/20100714-d6q52xajfh4cimxr3888yb77ru.jpg", "https://img.skitch.com/20111026-r2wsngtu4jftwxmsytdke6arwd.png", "http://cl.ly/1i0s1r3t2s2G3P1N3t3M/Screen_Shot_2011-10-27_at_9.36.45_AM.png", "http://shipitsquirrel.github.com/images/squirrel.png"];

let classObj = {
  greg: "UPLA6S8GN",
  myles: "'UP388S9DZ"
};

module.exports = function(robot) {
  /* Basic example of respond / send. If the user enters hi or hello the bot responds "Howdy!" */
  var web;
  web = new WebClient(robot.adapter.options.token);

  //slack API test
  robot.hear(/api test/i, function(res) {
  return web.api.test().then(function() {
    return res.send("Your connection to the Slack API is working!");
  })["catch"](function(error) {
    return res.send("Your connection to the Slack API failed :(");
  });
});

/*
______________  Passive hearing
*/
  robot.hear(/badger/i, function(res) {
    res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  });

  robot.hear(/I like pie/i, function(res) {
    return res.emote("makes a freshly baked pie");
  });

//listen to what the user wants to cook
  robot.hear(/let's cook (.*)/i, function(res) {
    let foodToCook = res.match[1];
    console.log(res);
    if(foodToCook === "steak") {
      return res.send("Medium rare please!");
    } else if(foodToCook === "pie") {
      return res.send("Peach cobbler is the best");
    } else {
      return res.send("I'm not hungry for that.");
    }
  });


  /*
______________  Responses
  */

  robot.respond(/summon (.*)/i, function(res) {
    let userName = res.match[1];
    let userId = classObj.userName;
    
  });

  //return results of thispersondoesnotexist.com
  robot.respond(/generate a friend for me/i, function(res) {
    return res.reply("www.thispersondoesnotexist.com");
  });

  robot.respond(/hi|hello/i, function(msg) {
    return msg.send("Hello Dave.");
  });

  robot.respond(/open the pod bay doors/i, function(res) {
    return res.reply("I'm afraid I can't let you do that.");
  });


  robot.respond(/math quiz: (.*) (.*) (.*) (.*)/i, function(res) {
    let operation = res.match[1];
    let num1 = Number(res.match[2]);
    let num2 = Number(res.match[4]);
    let sum;

    switch (operation) {
      case "add":
        sum = num1 + num2;
        break;
      case "subtract":
        sum = num1 - num2;
        break;
      case "multiply":
        sum = num1 * num2;
        break;
      case "divide":
        sum = num1 / num2;
        break;
      default:
        sum = "illogical, Dave."
    }

    return res.send("The answer is " + sum + ".");
  });

//_____________ Replies (@)

//robot will return the user's email address
  robot.hear(/what is my email/i, function(res) {
  let email = res.envelope.user.email_address;
  return res.send("Your email address is " + email);
});

// console.log res in case you need it
// robot.hear(/email test/i, function(res) {
// return res.send(console.log(res.envelope.user.email_address));
// });

//_____________keep track of how many times someone has been thanked

  var thank_scores;
  thank_scores = {};
  robot.hear(/thanks/i, function(res) {
    var i, id, len, mention, response_text, user_mentions;
    user_mentions = (function() {
      var i, len, ref, results;
      ref = res.message.mentions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        mention = ref[i];
        if (mention.type === "user") {
          results.push(mention);
        }
      }
      return results;
    })();
    if (user_mentions.length > 0) {
      response_text = "";
      for (i = 0, len = user_mentions.length; i < len; i++) {
        id = user_mentions[i].id;
        thank_scores[id] = thank_scores[id] != null ? thank_scores[id] + 1 : 1;
        response_text += "<@" + id + "> has been thanked " + thank_scores[id] + " times!\n";
      }
      return res.send(response_text);
    }
  });

// close the module.exports
};
