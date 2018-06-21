let ideas = [
"Take a power nap",
"Get rid of 3 things you never use",
"Write down 3 things you're grateful for",
"Stop watching/reading the news for a week",
"Write a journal entry",
"Meditate",
"Practice yoga",
"Go to your local coffee shop and order a latte",
"Clean out your closet",
"Take a walk outside without distractions",
"Bake chocolate chip cookies",
"Have a dance party by yourself",
"Take 3 deep breaths",
"Facetime a friend",
"Write down 3 things you've always wanted to do, and then do one",
"Draw a picture from your imagination",
"Power down your laptop, phone, and TV",
"Write a letter to yourself",
"Go on a run",
"Start a personal project",
"Go to your local art store, buy a watercolor kit, and paint",
"Make avocado toast",
"Bake sweet potato fries",
"Organize your bedroom",
"Find an event to attend this week",
"Sing at the top of your lungs",
"Join the Dogspotting group on Facebook",
"Make a DIY face mask",
"Learn how to code and build a website",
"Bake banana bread",
"Tell someone you love them",
"Listen to Leon Bridges",
"Make a new playlist on Spotify",
"Delete your Snapchat/Instagram/Facebook for the day",
"Sit outside",
"Read a book",
"Find a new recipe online and prepare it for dinner tonight",
"Make a smoothie from scratch",
"Buy a potted plant and name it",
"Learn a new language",
"Rearrange the furniture in your room",
"Smile at the next person you make eye contact with"
];

let usedNums = [];

function generateIdea() {
    if (usedNums.length == ideas.length) {
        document.getElementById('idea-container').innerHTML = "We are out of ideas... Send us an idea at admin@pursuitofhappy.me";
    } else {
        let randInt = 0;
        while (usedNums.includes(randInt)) {
            randInt = Math.floor(Math.random() * ideas.length);
        }
        usedNums.push(randInt);
        document.getElementById('idea-container').innerHTML = ideas[randInt];
    }
}
