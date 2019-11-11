var squirrels;
squirrels = ["http://img.skitch.com/20100714-d6q52xajfh4cimxr3888yb77ru.jpg", "https://img.skitch.com/20111026-r2wsngtu4jftwxmsytdke6arwd.png", "http://cl.ly/1i0s1r3t2s2G3P1N3t3M/Screen_Shot_2011-10-27_at_9.36.45_AM.png", "http://shipitsquirrel.github.com/images/squirrel.png"];

module.exports = function(robot) {
  /* Basic example of respond / send. If the user enters hi or hello the bot responds "Howdy!" */
/*
______________  Passive hearing
*/
  robot.hear(/badger/i, function(res) {
    return res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  });

  robot.hear(/I like pie/i, function(res) {
    return res.emote("makes a freshly baked pie");
  });

  robot.hear(/squirrel me/i, function(res) {
    return res.send(res.random(squirrels));
  });

  /*
______________  Responses
  */

  robot.respond(/hi|hello/i, function(msg) {
    return msg.send("Hello Dave.");
  });

  robot.respond(/open the pod bay doors/i, function(res) {
    return res.reply("I'm afraid I can't let you do that.");
  });

//_____________ Replies (@)

robot.respond(/how do i look/i, function(res) {
    return res.reply("I am programmed to provide emotional support in this situation. You look great!");
});

// close the module.exports
};
