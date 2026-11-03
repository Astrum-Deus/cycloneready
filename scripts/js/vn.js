const backgroundPath = "../../assets/vn/backgrounds/";
const characterPath = "../../assets/vn/characters/";

const backgroundFiles = {
    livingRoom: "living-room-day.jpg",
    diningArea: "dining-area.jpg",
    loungeRoom: "lounge-room.jpg",
    stormRoom: "living-room-storm.jpg",
    street: "residential-street-storm.jpg",
    shelter: "cyclone-shelter.jpg"
};

const speakerCharacters = {
    Mother: "mom",
    Father: "dad",
    Osh: "osh",
    You: "osh"
};

const SAVE_KEY = "cycloneDecisionSimulatorSave";

let currentScene = "act1Afternoon";
let currentLine = 0;
let currentDate = "";
let playerChoices = {};
let gameStarted = false;
let transitionRunning = false;

let gameContainer;
let backgroundArea;
let characterArea;
let dialogueBox;
let speakerName;
let dialogueText;
let choiceArea;
let indicatorArrow;

let titleScreen;
let dateScreen;
let endingScreen;

function makeCharacters(osh = "idle", mom = "idle", dad = "idle") {
    return [
        { name: "osh", expression: osh },
        { name: "mom", expression: mom },
        { name: "dad", expression: dad }
    ];
}

function line(speaker, text, characters) {
    return { speaker: speaker, text: text, characters: characters };
}

const scenes = {
    act1Afternoon: {
        background: "livingRoom",
        lines: [
            line("Narration", "It was an ordinary afternoon. The sky had been cloudy since morning, with occasional rain showers passing through. Nothing seemed particularly unusual."),
            line("Narration", "You were sitting in the living room when the television suddenly interrupted its usual programming."),
            line("TV Announcer", "An official cyclone warning has been issued for coastal areas. Residents in potentially affected regions are advised to monitor updates and prepare for possible evacuation."),
            line("Mother", "Did you hear that? A cyclone warning..."),
            line("Father", "Let's not panic. We don't even know if it'll come directly towards us."),
            line("Mother", "But what if it does? Is it going to hit us?"),
            line("Osh", "I don't know. But we should probably get ready."),
            line("Mother", "You're right. We shouldn't just ignore it."),
            line("Narration", "The television continues broadcasting updates as the afternoon goes on. Eventually, Mother gets up from her seat.")
        ],
        next: "act1Dinner"
    },

    act1Dinner: {
        background: "diningArea",
        lines: [
            line("Mother", "Well, anyways. It's dinnertime. Come to the table!")
        ],
        next: "act1Meeting"
    },

    act1Meeting: {
        background: "loungeRoom",
        lines: [
            line("Narration", "After dinner, the family gathers in the living room to discuss the warning. The rain outside has become more frequent, and the cyclone remains a concern."),
            line("Mother", "We should at least get our emergency supplies together."),
            line("Father", "We still have time. Let's wait for another update before doing anything."),
            line("Mother", "I'd rather not leave everything until the last minute."),
            line("Father", "There's no point in rushing if we don't even know where it's going."),
            line("Narration", "The two continue discussing what to do. You decide to speak up.")
        ],
        choices: [
            {
                text: "Agree with Mother",
                description: "We shouldn't wait. Let's start preparing now, just in case.",
                next: "act1PrepareEarly",
                set: { preparedEarly: true }
            },
            {
                text: "Agree with Father",
                description: "Maybe we should wait for more information before doing anything.",
                next: "act1PrepareLate",
                set: { preparedEarly: false }
            }
        ]
    },

    act1PrepareEarly: {
        date: "October 24",
        background: "livingRoom",
        lines: [
            line("Narration", "The family begins preparing for the approaching cyclone. Mother gathers essential supplies while Father checks the doors and windows."),
            line("Mother", "Let's get everything ready while we still can. Let's start packing."),
            line("Father", "I'll check the doors and windows. You two pack the emergency bag."),
            line("Osh", "Alright, Dad. Let's make sure we don't forget anything."),
            line("Narration", "You begin gathering the necessary supplies, placing them carefully into the emergency bag.")
        ],
        next: "act1Calm"
    },

    act1PrepareLate: {
        date: "October 26",
        background: "livingRoom",
        lines: [
            line("Narration", "Two days have passed. Another announcement comes through the television. The cyclone is approaching faster than expected."),
            line("TV Announcer", "The cyclone is continuing to move towards the coast. Residents are advised to complete their preparations and remain alert for further instructions."),
            line("Mother", "We should've started earlier. We need to hurry."),
            line("Father", "Get the essentials. I'll check the house."),
            line("Osh", "Alright, Dad."),
            line("Narration", "You quickly begin gathering supplies. There's less time to prepare than you thought.")
        ],
        next: "act1Calm"
    },

    act1Calm: {
        date: "October 27",
        background: "stormRoom",
        lines: [
            line("Narration", "The sky has grown darker, and the rain has become heavier. The family sits together, listening to the latest announcement."),
            line("TV Announcer", "Cyclone Estelle is predicted to make landfall on October 28. Residents in designated evacuation areas should follow local authorities' instructions and move to designated shelters."),
            line("Mother", "Tomorrow...", makeCharacters("idle", "sad", "idle")),
            line("Father", "We should keep listening for updates. We need to know what happens next."),
            line("Osh", "I hope it doesn't get too bad."),
            line("Narration", "Outside, the wind begins to pick up. The cyclone is getting closer.")
        ],
        next: "act2Decision"
    },

    act2Decision: {
        date: "October 28",
        background: "stormRoom",
        lines: [
            line("Narration", "Evening. The wind has begun to pick up, and rain can be heard hitting the windows."),
            line("TV Announcer", "An evacuation order has been issued for affected low-lying areas. Residents are strongly advised to proceed to designated evacuation shelters immediately."),
            line("Mother", "They're telling us to leave..."),
            line("Father", "But what about the house? We can't just leave everything behind."),
            line("Mother", "And what if the flooding reaches here? We can't take that risk."),
            line("Father", "We've lived here for years. The house has survived plenty of storms."),
            line("Osh", "This isn't just another storm, Dad. We need to do what's safest."),
            line("Mother", "I think we should go."),
            line("Father", "...")
        ],
        choices: [
            {
                text: "Evacuate",
                description: "We need to leave now. Our belongings aren't worth risking our lives.",
                next: "act2LeaveHome",
                set: { evacuated: true }
            },
            {
                text: "Stay at home",
                description: "Maybe the house will be safer. We should stay here.",
                next: "act2StayHome",
                set: { evacuated: false }
            }
        ]
    },

    act2LeaveHome: {
        background: "stormRoom",
        lines: [
            line("Narration", "The family gathers their emergency supplies and prepares to leave. Outside, the wind has grown noticeably stronger, and rain begins to fall heavily."),
            line("Mother", "Everyone got their bags?"),
            line("Father", "Let's make sure everything's locked before we go."),
            line("Mother", "We don't have much time. Come on."),
            line("Narration", "You take one last look at the house. It feels strange to leave everything behind, but you know there's a reason for it."),
            line("Osh", "Let's go.")
        ],
        next: "act2Journey"
    },

    act2Journey: {
        background: "street",
        lines: [
            line("Narration", "The journey to the designated shelter is difficult. The wind pushes against you as the rain grows heavier. Several other families are making their way towards safety."),
            line("Mother", "Stay close. Don't fall behind."),
            line("Father", "The shelter should be just ahead."),
            line("Narration", "After what feels like forever, the family finally reaches the evacuation shelter.")
        ],
        next: "act2Shelter"
    },

    act2Shelter: {
        background: "shelter",
        lines: [
            line("Narration", "The shelter is crowded, with families from nearby neighborhoods gathered inside. Some people are sitting quietly, while others are helping distribute supplies."),
            line("Mother", "Thank goodness we're here."),
            line("Father", "I hope everyone else made it safely."),
            line("Osh", "At least we're somewhere safe."),
            line("TV Announcer", "Cyclone Estelle is making landfall. Residents are reminded to remain inside designated shelters and follow instructions from emergency personnel."),
            line("Narration", "Outside, the wind begins to howl. The worst of the storm is approaching.")
        ],
        next: "act2Impact"
    },

    act2StayHome: {
        background: "stormRoom",
        lines: [
            line("Narration", "The family decides to remain at home. You can't help but feel uneasy. The warning keeps replaying in your mind."),
            line("Mother", "Are you sure about this?"),
            line("Father", "We'll be fine. We know this house."),
            line("Mother", "But they've specifically told people in our area to evacuate..."),
            line("Father", "We'll move upstairs if the water starts rising. Just make sure everything important is packed."),
            line("Osh", "I hope we're making the right decision."),
            line("Mother", "Let's just stay together, alright?")
        ],
        next: "act2Secure"
    },

    act2Secure: {
        background: "stormRoom",
        lines: [
            line("Narration", "The family moves to prepare the house for the approaching cyclone. Father checks the doors and windows while Mother gathers the remaining supplies."),
            line("Father", "Stay away from the windows. We don't want anyone getting hurt if something breaks."),
            line("Mother", "I've got the emergency bag. Is everyone ready?"),
            line("Osh", "I think so."),
            line("Narration", "The wind outside grows stronger. Suddenly, a loud crash echoes from somewhere nearby."),
            line("Mother", "WHAT WAS THAT?!", makeCharacters("idle", "shocked", "idle")),
            line("Father", "Probably something outside. Nobody goes out to check.")
        ],
        next: "act2Interior"
    },

    act2Interior: {
        background: "stormRoom",
        lines: [
            line("Narration", "The family moves to the safest available interior area, away from windows and exterior doors. The wind is now deafening."),
            line("Mother", "Stay close."),
            line("Father", "Keep the radio on. We need to hear the updates."),
            line("TV Announcer", "Cyclone Estelle is making landfall. Residents should remain in secure shelter and avoid going outdoors under all circumstances."),
            line("Osh", "It's here...")
        ],
        next: "act2Impact"
    },

    act2Impact: {
        background: "stormRoom",
        backgroundIfEvacuated: "shelter",
        lines: [
            line("Narration", "The cyclone has made landfall. The wind howls outside, and rain pounds against the building relentlessly."),
            line("Narration", "The lights flicker. Once. Twice."),
            line("Narration", "Then everything goes dark."),
            line("Mother", "The power's gone!"),
            line("Father", "Stay away from the windows. We need to stay together."),
            line("Narration", "You switch on the flashlight. Its small beam illuminates the faces of your parents."),
            line("Narration", "For a moment, nobody speaks."),
            line("Mother", "Is it going to get worse?"),
            line("Osh", "I... I don't know."),
            line("Father", "We'll get through this. Just stay close."),
            line("Narration", "Outside, the storm continues to rage. There is nothing left to do but wait, stay sheltered, and hope for the best.")
        ],
        next: "act2Eye"
    },

    act2Eye: {
        background: "stormRoom",
        backgroundIfEvacuated: "shelter",
        lines: [
            line("Narration", "Hours pass. The storm has shown no signs of stopping. Everyone is exhausted."),
            line("Narration", "Then, slowly, the wind begins to weaken."),
            line("Narration", "The rain becomes quieter."),
            line("Narration", "And eventually..."),
            line("Narration", "Silence."),
            line("Mother", "Wait... Has it stopped?"),
            line("Father", "Finally..."),
            line("Mother", "That was terrifying."),
            line("TV Announcer", "Residents are reminded that a temporary period of calm may occur as the eye of the cyclone passes. Dangerous winds may return shortly. Remain sheltered."),
            line("Osh", "The eye..."),
            line("Father", "So it's not over yet?")
        ],
        choices: [
            {
                text: "Stay sheltered",
                description: "Wait until authorities confirm that it is safe to leave.",
                next: "act2StayInside",
                set: { stayedInside: true }
            },
            {
                text: "Go outside to look",
                description: "Step outside during the temporary calm. This is dangerous.",
                next: "act2GoOutside",
                set: { stayedInside: false }
            }
        ]
    },

    act2StayInside: {
        background: "stormRoom",
        backgroundIfEvacuated: "shelter",
        lines: [
            line("Osh", "No. We need to stay inside."),
            line("Narration", "The family settles back down, waiting for the storm to pass.")
        ],
        next: "act3Over"
    },

    act2GoOutside: {
        background: "stormRoom",
        backgroundIfEvacuated: "shelter",
        lines: [
            line("Narration", "Curious about the damage, you get up and move towards the door."),
            line("Father", "Osh! Stop! Don't go outside!", makeCharacters("idle", "idle", "shocked")),
            line("Father", "The eye is only temporary. The dangerous winds could return at any moment."),
            line("Mother", "Please don't do that again. We don't know when the winds will return."),
            line("Osh", "You're right. I'm sorry. We need to stay inside."),
            line("Narration", "The family settles back down, waiting for the storm to pass.")
        ],
        next: "act3Over"
    },

    act3Over: {
        date: "October 29",
        background: "stormRoom",
        backgroundIfEvacuated: "shelter",
        lines: [
            line("Narration", "The wind has finally died down. The rain has stopped, leaving behind an unsettling silence. After hours of waiting, the family finally hears an announcement from the television."),
            line("TV Announcer", "Cyclone Estelle has moved inland and weakened. However, many affected areas are experiencing severe flooding and damage. Residents are advised to remain indoors until local authorities announce that it is safe to go outside."),
            line("Mother", "It's finally over..."),
            line("Father", "Let's hope the damage isn't too bad."),
            line("Osh", "Can we go outside now?"),
            line("Mother", "Not yet. We should wait for the official all-clear."),
            line("Narration", "The family waits a little longer, listening for further updates.")
        ],
        next: "act3Outside"
    },

    act3Outside: {
        background: "street",
        lines: [
            line("Narration", "An official announcement confirms that residents may leave their shelters, but warns everyone to remain cautious."),
            line("Narration", "The family carefully steps outside. The neighborhood looks almost unrecognizable. Fallen branches and debris are scattered across the road. Some buildings have been damaged, and water has collected in the lower areas."),
            line("Mother", "Oh my...", makeCharacters("idle", "sad", "idle")),
            line("Father", "The damage is worse than I expected."),
            line("Osh", "Look at the road. It's completely flooded."),
            line("Narration", "You notice a fallen electrical wire lying near a puddle."),
            line("Mother", "Don't go near that!"),
            line("Father", "She's right. Stay away from it. We don't know if it's still live."),
            line("Osh", "Right..."),
            line("Narration", "The family carefully makes its way back towards the house, avoiding flooded areas and damaged structures.")
        ],
        branch: {
            choice: "evacuated",
            ifTrue: "act3HomeEvacuated",
            ifFalse: "act3HomeStayed"
        }
    },

    act3HomeEvacuated: {
        background: "livingRoom",
        lines: [
            line("Narration", "The family arrives back at their neighborhood after spending the storm at the evacuation shelter. Although the house has suffered some damage, it is still standing."),
            line("Mother", "At least the house is still here."),
            line("Father", "We'll check the damage once we're sure it's safe."),
            line("Osh", "I'm just glad we're all okay.", makeCharacters("smile/idle", "idle", "idle"))
        ],
        next: "act3Damage"
    },

    act3HomeStayed: {
        background: "livingRoom",
        lines: [
            line("Narration", "The family returns to the main part of the house after spending the storm in the safest available area. Water has entered the lower floor, and several belongings have been damaged."),
            line("Mother", "All of this...", makeCharacters("idle", "sad", "idle")),
            line("Father", "We should've listened to the evacuation order.", makeCharacters("idle", "idle", "sad")),
            line("Osh", "There's nothing we can do about it now. We just need to be careful.")
        ],
        next: "act3Damage"
    },

    act3Damage: {
        background: "livingRoom",
        lines: [
            line("Narration", "The family begins looking over the damage, making sure not to touch anything that could be dangerous.")
        ],
        next: "act3WhatsNext"
    },

    act3WhatsNext: {
        background: "loungeRoom",
        lines: [
            line("Narration", "The family gathers what remains of their supplies. The television is back on, broadcasting information about the recovery efforts."),
            line("TV Announcer", "Residents are reminded to avoid floodwater, damaged buildings, and fallen power lines. Do not attempt to clean up or repair damaged electrical equipment. Continue following local authorities' instructions and wait for further safety updates."),
            line("Mother", "We should check if we still have enough clean water and food."),
            line("Father", "I'll see what can be salvaged. We should also check on the neighbors, once it's safe."),
            line("Osh", "I can help sort through the supplies."),
            line("Mother", "Alright. But don't go anywhere alone."),
            line("Narration", "The road ahead will not be easy. There is still a lot to clean up, and many people will need help recovering from the storm."),
            line("Narration", "But for now, your family is together. And that's what matters most.")
        ],
        next: "act3FinalDecision"
    },

    act3FinalDecision: {
        background: "street",
        lines: [
            line("Narration", "As the family finishes sorting through the supplies, you hear someone outside calling for help. A neighbor appears to be trying to move debris near a damaged building."),
            line("Mother", "Someone needs help..."),
            line("Father", "We should check what's happening. But we need to be careful."),
            line("Narration", "You look towards the neighbor. The area around the building is still flooded, and some debris appears unstable.")
        ],
        choices: [
            {
                text: "Help the neighbor from a safe distance",
                description: "Let's call for help and see what we can do without putting ourselves in danger.",
                next: "act3HelpSafely",
                set: { calledHelp: true }
            },
            {
                text: "Go closer to help",
                description: "They need help now. I'll go see if I can move the debris.",
                next: "act3GoCloser",
                set: { calledHelp: false }
            }
        ]
    },

    act3HelpSafely: {
        background: "street",
        lines: [
            line("Narration", "The family calls for assistance and warns the neighbor to stay away from the damaged building. Soon, other residents arrive to help coordinate the situation."),
            line("Mother", "Good thing we didn't rush in."),
            line("Father", "We can help without putting ourselves in danger."),
            line("Osh", "I hope everyone gets through this.")
        ],
        next: "act3Ending"
    },

    act3GoCloser: {
        background: "street",
        lines: [
            line("Narration", "You move towards the damaged building, but Father quickly stops you."),
            line("Father", "Stop! That area isn't safe!", makeCharacters("idle", "idle", "shocked")),
            line("Mother", "There could be more damage than we can see. We need to get help."),
            line("Narration", "You step back, realizing how dangerous the area could be."),
            line("Osh", "You're right. I shouldn't have gone closer."),
            line("Father", "Wanting to help is good. But we have to make sure we don't become victims ourselves.")
        ],
        next: "act3Ending"
    },

    act3Ending: {
        background: "street",
        lines: [
            line("Narration", "The days that follow are difficult. The neighborhood slowly begins to recover as residents help one another and local authorities coordinate relief efforts."),
            line("Narration", "You look out at the damaged streets. It will take time for things to return to normal."),
            line("Mother", "We'll get through this. One step at a time."),
            line("Father", "And next time, we'll be better prepared."),
            line("Osh", "Yeah. We will.", makeCharacters("smile/idle", "idle", "idle")),
            line("Narration", "The cyclone has passed, but its effects will remain for a long time."),
            line("Narration", "You realize that surviving a disaster is not just about what happens during the storm. It's also about the decisions made before it, during it, and after it.")
        ],
        next: "end"
    }
};

function findOrMake(selector, parent) {
    let element = document.querySelector(selector);

    if (!element) {
        element = document.createElement("div");
        element.className = selector.replace(".", "");
        parent.appendChild(element);
    }

    return element;
}

function setupElements() {
    gameContainer = document.querySelector(".game-container") || document.body;
    backgroundArea = findOrMake(".background", gameContainer);
    characterArea = findOrMake(".character-area", gameContainer);
    dialogueBox = findOrMake(".dialogue-box", gameContainer);
    speakerName = findOrMake(".speaker-name", dialogueBox);
    dialogueText = findOrMake(".dialogue-text", dialogueBox);
    choiceArea = findOrMake(".choice-area", gameContainer);
    indicatorArrow = findOrMake(".indicator-arrow", dialogueBox);
}

function makeTitleScreen() {
    titleScreen = document.createElement("div");
    titleScreen.className = "vn-title-screen";

    titleScreen.innerHTML = `
        <div class="vn-title-content">
            <h1>Cyclone Decision Making Simulator</h1>
            <p>A story about preparation, safety, and decision-making.</p>
            <button id="startGame">Start</button>
            <button id="continueGame">Continue</button>
            <button id="newGame">New Game</button>
        </div>
    `;

    gameContainer.appendChild(titleScreen);

    document.getElementById("startGame").addEventListener("click", confirmNewGame);
    document.getElementById("continueGame").addEventListener("click", continueGame);
    document.getElementById("newGame").addEventListener("click", confirmNewGame);
}

function makeDateScreen() {
    dateScreen = document.createElement("div");
    dateScreen.className = "vn-date-screen";
    dateScreen.innerHTML = `<h2></h2>`;
    document.body.appendChild(dateScreen);
}

function makeEndingScreen() {
    endingScreen = document.createElement("div");
    endingScreen.className = "vn-ending-screen";

    endingScreen.innerHTML = `
        <div class="vn-ending-content">
            <p class="vn-ending-label">CYCLONE DECISION MAKING SIMULATOR</p>
            <h1 class="vn-ending-title"></h1>
            <p class="vn-ending-description"></p>
            <p class="vn-ending-rating"></p>
            <button id="endingReturn">Return to Title Screen</button>
        </div>
    `;

    gameContainer.appendChild(endingScreen);

    document.getElementById("endingReturn").addEventListener("click", function () {
        localStorage.removeItem(SAVE_KEY);
        showTitleScreen();
    });
}

function setupTitleScreen() {
    makeTitleScreen();
    makeDateScreen();
    makeEndingScreen();
    showTitleScreen();
}

function hasSavedGame() {
    return localStorage.getItem(SAVE_KEY) !== null;
}

function showTitleScreen() {
    gameStarted = false;
    transitionRunning = false;

    titleScreen.style.display = "flex";
    endingScreen.style.display = "none";
    dateScreen.style.display = "none";

    dialogueBox.style.display = "none";
    backgroundArea.style.display = "none";
    characterArea.style.display = "none";
    choiceArea.innerHTML = "";

    updateTitleButtons();
}

function hideTitleScreen() {
    titleScreen.style.display = "none";
    endingScreen.style.display = "none";

    dialogueBox.style.display = "block";
    backgroundArea.style.display = "block";
    characterArea.style.display = "flex";
}

function updateTitleButtons() {
    const hasSave = hasSavedGame();

    document.getElementById("continueGame").disabled = !hasSave;
    document.getElementById("newGame").disabled = !hasSave;
}

function startNewGame() {
    currentScene = "act1Afternoon";
    currentLine = 0;
    currentDate = "";
    playerChoices = {};
    gameStarted = true;
    transitionRunning = false;

    saveGame();
    hideTitleScreen();
    displayScene();
}

function confirmNewGame() {
    if (hasSavedGame() && !confirm("Start a new game? Your existing autosave will be overwritten.")) {
        return;
    }

    startNewGame();
}

function continueGame() {
    const savedGame = localStorage.getItem(SAVE_KEY);

    if (!savedGame) {
        return;
    }

    try {
        const saveData = JSON.parse(savedGame);
        const scene = scenes[saveData.currentScene];

        if (!scene) {
            throw new Error("Invalid saved scene");
        }

        let savedLine = Number(saveData.currentLine) || 0;
        let lastLine = scene.choices ? scene.lines.length : scene.lines.length - 1;

        if (savedLine < 0) {
            savedLine = 0;
        }

        if (savedLine > lastLine) {
            savedLine = lastLine;
        }

        currentScene = saveData.currentScene;
        currentLine = savedLine;
        currentDate = saveData.currentDate || "";
        playerChoices = saveData.playerChoices || {};
        gameStarted = true;
        transitionRunning = false;

        hideTitleScreen();
        displayScene();
    } catch (error) {
        alert("The saved game could not be loaded.");
    }
}

function saveGame() {
    const saveData = {
        currentScene,
        currentLine,
        currentDate,
        playerChoices
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    updateTitleButtons();
}

function showBackground(scene) {
    let backgroundName = scene.background;

    if (scene.backgroundIfEvacuated && playerChoices.evacuated === true) {
        backgroundName = scene.backgroundIfEvacuated;
    }

    const fileName = backgroundFiles[backgroundName];

    if (!fileName) {
        return;
    }

    backgroundArea.style.backgroundImage = `url("${backgroundPath}${fileName}")`;
}

function showCharacters(characters, speaker) {
    characterArea.innerHTML = "";

    const speakingCharacter = speakerCharacters[speaker];

    characters.forEach(character => {
        const image = document.createElement("img");
        const fileName = `[${character.name}]_[${character.expression}].png`;

        image.src = `${characterPath}${fileName}`;
        image.alt = character.name;

        if (!speakingCharacter) {
            image.classList.add("not-speaking-nobody");
        } else if (character.name === speakingCharacter) {
            image.classList.add("speaking");
        } else {
            image.classList.add("not-speaking");
        }

        image.onerror = function () {
            console.error("Could not load character image:", image.src);
            image.style.display = "none";
        };

        characterArea.appendChild(image);
    });
}

function displayScene() {
    const scene = scenes[currentScene];

    if (!scene) {
        finishGame();
        return;
    }

    if (scene.date && scene.date !== currentDate) {
        showDateTransition(scene.date);
        return;
    }

    showSceneContent(scene);
}

function showSceneContent(scene) {
    if (scene.date) {
        currentDate = scene.date;
    }

    showBackground(scene);
    displayCurrentLine();
}

function displayCurrentLine() {
    const scene = scenes[currentScene];
    const characters = scene.characters || makeCharacters();

    choiceArea.innerHTML = "";

    if (currentLine < scene.lines.length) {
        const currentText = scene.lines[currentLine];

        speakerName.textContent = currentText.speaker;
        dialogueText.textContent = currentText.text;
        showCharacters(currentText.characters || characters, currentText.speaker);
        indicatorArrow.style.display = "block";
    } else {
        speakerName.textContent = "Narration";
        dialogueText.textContent = "";
        showCharacters(characters, "Narration");
        indicatorArrow.style.display = "none";
        showChoices(scene.choices);
    }

    saveGame();
}

function showChoices(choices) {
    choiceArea.innerHTML = "";

    choices.forEach(choice => {
        const button = document.createElement("button");
        button.className = "vn-choice-button";
        button.innerHTML = `
            <strong>${choice.text}</strong>
            <span>${choice.description}</span>
        `;

        button.addEventListener("click", function (event) {
            event.stopPropagation();

            if (transitionRunning) {
                return;
            }

            Object.assign(playerChoices, choice.set);

            currentScene = choice.next;
            currentLine = 0;

            saveGame();
            displayScene();
        });

        choiceArea.appendChild(button);
    });
}

function getNextScene(scene) {
    if (scene.branch) {
        if (playerChoices[scene.branch.choice] === true) {
            return scene.branch.ifTrue;
        }

        return scene.branch.ifFalse;
    }

    return scene.next;
}

function advanceDialogue() {
    if (!gameStarted || transitionRunning) {
        return;
    }

    const scene = scenes[currentScene];

    if (!scene) {
        return;
    }

    if (currentLine < scene.lines.length - 1) {
        currentLine++;
        displayCurrentLine();
        return;
    }

    if (scene.choices) {
        if (currentLine === scene.lines.length - 1) {
            currentLine++;
            displayCurrentLine();
        }

        return;
    }

    const nextScene = getNextScene(scene);

    if (nextScene === "end") {
        finishGame();
        return;
    }

    currentScene = nextScene;
    currentLine = 0;
    displayScene();
}

function showDateTransition(newDate) {
    transitionRunning = true;

    dateScreen.querySelector("h2").textContent = newDate;
    dateScreen.style.display = "flex";
    dateScreen.style.opacity = "0";

    requestAnimationFrame(() => {
        dateScreen.style.opacity = "1";
    });

    setTimeout(() => {
        showSceneContent(scenes[currentScene]);

        setTimeout(() => {
            dateScreen.style.opacity = "0";

            setTimeout(() => {
                dateScreen.style.display = "none";
                transitionRunning = false;
            }, 700);
        }, 1000);
    }, 700);
}

function getEnding() {
    if (
        playerChoices.preparedEarly === true &&
        playerChoices.evacuated === true &&
        playerChoices.stayedInside === true &&
        playerChoices.calledHelp === true
    ) {
        return {
            title: "Through the Storm",
            description: "Your family prepared early, followed the evacuation order, stayed sheltered, and made safe decisions during recovery.",
            rating: "BEST ENDING"
        };
    }

    if (
        playerChoices.evacuated === true &&
        playerChoices.stayedInside === true
    ) {
        return {
            title: "Safe Together",
            description: "Your family made some mistakes, but the most important decisions helped keep everyone safe.",
            rating: "GOOD ENDING"
        };
    }

    if (
        playerChoices.evacuated === false &&
        (playerChoices.stayedInside === false || playerChoices.preparedEarly === false)
    ) {
        return {
            title: "The Cost of Ignoring Warnings",
            description: "Ignoring important safety advice, including the evacuation order, led to greater risks and consequences for your family.",
            rating: "RISKY ENDING"
        };
    }

    return {
        title: "A Difficult Recovery",
        description: "Some decisions made the situation harder, and your family now faces a more difficult recovery.",
        rating: "ALTERNATE ENDING"
    };
}

function finishGame() {
    gameStarted = false;

    const ending = getEnding();

    endingScreen.querySelector(".vn-ending-title").textContent = ending.title;
    endingScreen.querySelector(".vn-ending-description").textContent = ending.description;
    endingScreen.querySelector(".vn-ending-rating").textContent = ending.rating;

    dialogueBox.style.display = "none";
    backgroundArea.style.display = "none";
    characterArea.style.display = "none";
    choiceArea.innerHTML = "";

    titleScreen.style.display = "none";
    endingScreen.style.display = "flex";

    localStorage.removeItem(SAVE_KEY);
    updateTitleButtons();
}

function startProgram() {
    setupElements();
    dialogueBox.addEventListener("click", advanceDialogue);
    setupTitleScreen();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startProgram);
} else {
    startProgram();
}