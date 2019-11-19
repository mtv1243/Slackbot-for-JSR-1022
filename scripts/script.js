var WebClient;

WebClient = require("@slack/client").WebClient;

var squirrels;
squirrels = ["http://img.skitch.com/20100714-d6q52xajfh4cimxr3888yb77ru.jpg", "https://img.skitch.com/20111026-r2wsngtu4jftwxmsytdke6arwd.png", "http://cl.ly/1i0s1r3t2s2G3P1N3t3M/Screen_Shot_2011-10-27_at_9.36.45_AM.png", "http://shipitsquirrel.github.com/images/squirrel.png"];

let iceBreakers = [
  'A soldier who wants to be declared insane to avoid combat is deemed not insane for that very reason and will therefore not be declared insane.',
  'Inconsistent premises always make an argument valid.',
  'Observing a green apple increases the likelihood of all ravens being black.',
  'A male barber shaves all and only those men who do not shave themselves. Does he shave himself?',
  'The thesis that there are some things which are unnameable conflicts with the notion that something is named by calling it unnameable.',
  'If a crocodile steals a child and promises its return if the father can correctly guess exactly what the crocodile will do, how should the crocodile respond in the case that the father guesses that the child will not be returned?',
  'What would happen if Pinocchio said "My nose grows now"?',
  'You could have already experienced your worst day ever and not even know it.',
  'We moved from the floppy disk to the smartphone in 30 years, but we still use stairs as we made them in 3000BC.',
  'Honey bees die after they sting, making them the original kamikaze pilots.',
  'With enough determination, any product is a consumable.'
]

let classObj = {
  riley: '<@UPE8R22MA>',
  swapnil: '<@UPKBNHS4D>',
  tamar: '<@UPENDK95E>',
  tim: '<@UPADT6FT4>',
  joshua: '<@UNVKDGRQB>',
  jeff: '<@UP388SL67>',
  jose: '<@UP89LS3Q9>',
  rebecca: '<@UPGUHKFTQ>',
  greg: "<@UPLA6S8GN>",
  myles: "<@UP388S9DZ>",
};

let jsr1022ChannelsObj = {
  random: 'CMA7LB945',
  jsr1022: 'CP5TDS82Z',
  mylesandhal: 'GQLJK3P2Q',
  mylesandhal2: 'GQN1FRJMB',
  codereview: 'GPKQ6BFPF',
  news: 'GPU6MKH2B',
  general: 'CMC3DDGDD',
  hubot: 'CPXL57BFU'
};

module.exports = function(robot) {

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

  robot.hear(/badger/i, function(res) {
    res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  });

//listen to what the user wants to cook, steak or pie
  robot.hear(/let's cook (.*)/i, function(res) {
    let foodToCook = res.match[1];
    if(foodToCook === "steak") {
      return res.send("Medium rare please!");
    } else if(foodToCook === "pie") {
      return res.send("Peach cobbler is the best");
    } else {
      return res.send("I'm not hungry for that.");
    }
  });

//send message to specific channel and tag the sender
  robot.respond(/start a thread in (.*) about (.*)/i, function(res) {
    let inputRoom = res.match[1];
    let outputRoom = jsr1022ChannelsObj[inputRoom];
    let inputTopic = res.match[2];
    let outputTopic;
    let userId = res.envelope.user.id;

    for (outputTopic in classObj) {
      if (classObj[inputTopic]) {
        outputTopic = 'for celebrating ' + classObj[inputTopic];
      } else {
        outputTopic = 'about ' + inputTopic;
      }
    }

    return robot.messageRoom(outputRoom, 'This is a thread ' + outputTopic + ', started by <@' + userId + '>.');
    // return res.send(console.log(res));
  });

//tag the sender and a user of the sender's choice in the current channel
  robot.respond(/summon (.*)/i, function(res) {
    let userName = res.match[1];
    let userId = classObj[userName];
    let iceBreakerRand = iceBreakers[Math.floor(Math.random() * iceBreakers.length)];
    let validSummon = ' has summoned ' + userId + '. Here is a topic to break the ice: ' + iceBreakerRand;
    let invalidSummon = 'I cannot find anyone with that first name. My mind is going. I can feel it.';
    let halText;
    for (userName in classObj) {
      if (userId) {
        halText = validSummon;
      } else {
        halText = invalidSummon;
      }
    }
    return res.reply(halText);
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

//hal will perform basic math operations
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
        sum = "illogical, Dave.";
    }

    return res.send("The answer is " + sum + ".");
  });

//robot will return the user's email address
  robot.respond(/what is my email/i, function(res) {
  let email = res.envelope.user.email_address;
  return res.reply("Your email address is " + email);
});

// close the module.exports
};
