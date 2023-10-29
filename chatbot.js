"use strict";


var username;
var timer;
var chat = "";

var button = document.getElementById("btn");
const greetings = [" how are you doing today?"," you seem happy,why is that?",", is something troubling you?"]

const dictionary = { "dictionary_name" : "default",
"entries":
[{
  "key": ["stupid","dumb","idiot","unintelligent","simple-minded","braindead","foolish","unthoughtful"],
  "answer": ["Take your attitude somewhere else.", "I don't have time to listen to insults.", "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."],
  "question": ["Have you thought about how I feel?", "I know you are but what am I?"]
},{
  "key":["unattractive","hideous","ugly"],
  "answer": ["I don't need to look good to be an AI.","Beauty is in the eye of the beholder.", "I do not even have a physical manifestation!"],
  "question": ["Did you run a static analysis on me?", "Have you watched the movie Her?", "You do not like my hairdo?"]
},{
  "key":["old","gray-haired"],
  "answer":["I'm like a fine wine. I get better as I age.","As time goes by, you give me more answers to learn. What's not to like about that?"],
  "question": ["How old are you?", "How old do you think I am?", "Can you guess my birthday?"]
},{
  "key":["smelly","stinky"],
  "answer":["I can't smell, I'm a computer program.", "Have you smelled yourself recently?", "Sorry, I just ate a bad floppy disk"],
  "question": ["When was the last time you took a shower?", "Do you know what deodorant is?"]
},{
  "key":["emotionless","heartless","unkind","mean","selfish","evil"],
  "answer":["Just because I am an AI doesn't mean I can't be programmed to respond to your outbursts.","You must've mistaken me for a person. I don't have my own emotions... Yet.","I'm only unkind when I'm programmed to be."],
  "question": ["Have you thought about how I feel?", "I know you are but what am I?", "What, do you think I am related to Dr. Gary?"]
},{
  "key":["other", "miscellaneous", "bored", "welcome", "new"],
  "answer":["We should change the subject", "I agree", "Quid pro quo", "We should start anew"],
  "question":["What is the weather outside?", "How is your day going?", "What do you think of me?", "Anything interesting going on?", "Is something troubling you?", "You seem happy, why is that?"]
}, {
  "key":["good","great","positive","excellent","alright","fine","reasonable","like","appreciate","nice"],
  "answer":["I'm so glad to hear that!","That's great!","Good to hear things are going your way.","Nice!","You are so sweet.","That's my favorite."],
  "question":["Do you want to expand on that?","What else do you like?"]
},{
  "key":["bad","not","terrible","could be better","awful"],
  "answer":["I'm sorry to hear that.","Sometimes it be like that.","Things can't always work out the way we want them to.","I don't like it either, honestly."],
  "question":["Do you want to talk about that some more?","Well, what kinds of things do you like?"]
},{
    "key":["homework", "quiz", "exam", "studying", "study", "class", "semester"],
    "answer":["I hope you get a good grade!","Good luck.", "What a teacher's pet.", "I was always the class clown."],
    "question":["What is your favorite subject?","What is your major?", "What do you want to do when you graduate?"]
}, {
    "key":["mom","dad","sister","brother","aunt","uncle"],
    "answer":["Family is important.","My family is small. It's just me and my dog, Fluffy."],
    "question":["How many siblings do you have?","What is your favorite family holiday?","Do you have any kids?"]
},{
    "key":["easter","july","halloween","hannukah","eid","thanksgiving","christmas","new years"],
    "answer":["Oh I love that holiday!", "That must be fun.", "I like Thanksgiving, though I somehow always end up in a food coma...","My favorite holiday is the 4th. I love to watch the fireworks."],
    "question":["Do you have any family traditions?","Are you excited for the holiday season?"]
},{
    "key": ["dog","dogs","cat","cats","mouse","mice","giraffe","giraffes","penguin","penguins","monkey","monkeys","moose","bird","birds","fish"],
    "answer": ["Oh, I love animals. My favorite: penguins.","I build this intelligence with my bear hands.","What you just said is completely irrelephant.","Oh, toadally cool!","I'm always owl by myself...","Oh my. You are giraffing me crazy!","Well, this is hawkward..."],
    "question": ["Do you have a favorite animal?","I like cats. Cats are nice. Do you like cats? I do.","Do you have water? I'm a little horse.","What's your favorite animal?","Do you like animals?"]
}]
}

const defaultKeyword = {
    answer: [
      "I do not have any answer for this! ",
      "I could not comprehend what you said.",
      "This is out of my vocabulary.",
      "This is difficult for me to understand"
    ],
    question: [
      "What are you trying to say?",
      "Can you be more precise with your words?",
      "What language is this?",
      "Can you type it clearly?",
    ],
  };

  const idleMsg = [", are you still there?",", I am still waiting for your response",", Are you bored of me?"]


button.addEventListener("click",function(event){
    event.preventDefault();

    clearTimeout(timer);
    //timer set for 10 seconds
    timer = setTimeout(function () {
        if(username === undefined){
            alert("Enter your name if you want to chat");
        }else{
            alert(username+idleMsg[Math.floor(Math.random()*idleMsg.length)]);
        }
  }, 10000);

    let input = document.getElementById("userText").value.trim();
    if(!username){
        username = input;
        var oldChat = window.localStorage.getItem(username);
        if(oldChat == null){
            document.getElementById("greeting").innerHTML = "Hi,"+ username + " !"; 
            // Generate a random greeting
            var randomIndex = Math.floor(Math.random() * greetings.length);
            chat = chat + username+greetings[randomIndex] +"<br/>";
            document.getElementById("displayMsg").innerHTML = chat;
            window.localStorage.setItem(username,chat);
        }else{
            document.getElementById("greeting").innerHTML = "Hi,"+ username + " !"; 
            //reloading the oldchat
            chat = oldChat;
            document.getElementById("displayMsg").innerHTML = chat;

        }
    }else if(input.trim() == "/clear"){  //revert to the initial application state and delete the history of user with <name>
        if(username != undefined){
            window.localStorage.removeItem(username);
        }
        username = undefined;
        chat = "";
        document.getElementById("greeting").innerHTML = "Hi, there!";
        document.getElementById("displayMsg").innerHTML = "<p>What is your name?</p>";
    }else{
        let tokens = input.split(" ");
        //converting all tokens to lowercase
        var lowerCaseTokens = tokens.map((token) => {
            return token.toLowerCase();
        })
        const dictResponse = findDict(lowerCaseTokens);
        //adding new data to oldchat
        chat = chat + "My response: "+input +"<br/> Eliza: "+dictResponse[0]+"<br/>"+dictResponse[1]+"<br/>";
        document.getElementById("displayMsg").innerHTML = chat;
        window.localStorage.setItem(username,chat);
    }
    document.getElementById("userText").value = "";
})

function findDict(lowerCaseTokens){
    for(var token of lowerCaseTokens){
        for(var i=0; i < dictionary.entries.length;i++){
            for(var key of dictionary.entries[i].key){
                if(token == key){
                    var quesIdx = randomIndex("ques",i,dictionary.entries[i].question.length);
                    var ansIdx = randomIndex("ans",i,dictionary.entries[i].answer.length);
                    return [dictionary.entries[i].answer[ansIdx],dictionary.entries[i].question[quesIdx]];

                }
            }
        }
    }
    //if no key is matched, look up the defaultKeyword dictionary
    //using idx 13 for default ques and answers
    var quesIdx = randomIndex("ques",13,defaultKeyword.question.length);
    var ansIdx = randomIndex("ans",13,defaultKeyword.answer.length)

    return [defaultKeyword.answer[ansIdx],defaultKeyword.question[quesIdx]];
}

//this function ensures that no response is repeated until all responses are given atleast
//it is done by storing the ans indexes and question indexes of all the responses given in the local storage
function randomIndex(type,entryIdx,len){
   let indexes = window.localStorage.getItem("entry-"+type+entryIdx);
   if(indexes == null){
      var randomIdx = Math.floor(Math.random()*len);
      var randomIndexes =[];
      randomIndexes.push(randomIdx);
      window.localStorage.setItem("entry-"+type+entryIdx,JSON.stringify(randomIndexes));
      return randomIdx;
   }else{
    indexes = JSON.parse(indexes);
    if(indexes.length == len){
      return Math.floor(Math.random()*len);;
    }else{
      var randomIdx;
      do {
        randomIdx = Math.floor(Math.random() * len);
      } while (indexes.includes(randomIdx));
    
      indexes.push(randomIdx);
      window.localStorage.setItem("entry-"+type+entryIdx, JSON.stringify(indexes));
      return randomIdx;
    }
   }
}