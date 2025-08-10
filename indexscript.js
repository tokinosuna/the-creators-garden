// =================================================================
// The Curator's Garden - MASTER SCRIPT
// =================================================================
// This script controls the main story, player progress,
// and navigation logic. It uses localStorage to create a
// persistent experience for returning players.
// =================================================================

// --- 1. DOM REFERENCES ---
const preGameContainer = document.getElementById('pre-game-container');
const bookFlipper = document.getElementById('book-flipper');
const startGameBtn = document.getElementById('start-game-btn');
const gameContainer = document.getElementById('game-container');

const characterSprite = document.getElementById('character-sprite');
const chapterTitle = document.getElementById('chapter-title');
const speakerName = document.getElementById('speaker-name');
const dialogueText = document.getElementById('dialogue-text');
const choicesContainer = document.getElementById('choices-container');
const nextIndicator = document.getElementById('next-indicator');

// Navigation Links
const navLibraryLink = document.getElementById('nav-library');
const navStudyLink = document.getElementById('nav-study');

// --- 2. GAME STATE & PERSISTENCE ---
let currentState = 'start';
let isTyping = false;
let typingTimeout = null;

// The Hub is unlocked at relationship level 4.
const HUB_LEVEL = 4;

// Load relationship level from localStorage. Default to 0 for new players.
let relationshipLevel = parseInt(localStorage.getItem('relationshipLevel') || '0');

// --- 3. THE COMPLETE STORY SCRIPT ---
// THIS IS YOUR FULL STORY, FULLY INTEGRATED.
const story = {
    // ================== ACT 1: THE FIRST ENCOUNTER ==================
    'start': {
        title: "An Unfamiliar Path",
        text: "The air smells of damp earth and blooming flowers. You open your eyes to a garden of impossible perfection, bathed in a soft, warm light. A manicured path leads to a grand, welcoming house.",
        next: 'observe_garden'
    },
    'observe_garden': {
        text: "You are clearly lost, but the warmth of the house beckons you forward. You follow the path to the front door, which is slightly ajar.",
        next: 'enter_house'
    },
    'enter_house': {
        text: "Inside, you find a vast living room that doubles as a library. The space is immaculate, filled with books and art. On a heavy oak table, one book lies open, its pages seeming to shimmer.",
        next: 'find_book'
    },
    'find_book': {
        text: "You draw closer. It’s ‘Cinderella’. But as you read, you see handwritten edits in stunning, crimson ink, with flourish and detail...",
        next: 'read_book'
    },
    'read_book': {
        text: "<i>'...and with a sweep of the Curator’s quill, the two wicked stepsisters were not punished, but perfected. Their envy was spun into glittering thread, their cruelty into delicate lace. They became two beautiful, silken ribbons, sparkling as they flew eternally in the grand ballroom rafters...'</i>",
        next: 'sei_appears'
    },
    'sei_appears': {
        speaker: "???",
        text: "“To enter another’s home without invitation... and to then place your hands on their life's work... is a breach of etiquette I find truly... audacious.” The voice drifts down from a grand staircase.",
        visual: { character: { visible: true } },
        next: 'confrontation'
    },
    'confrontation': {
        speaker: "Sei",
        text: "He descends the stairs, his movements graceful, his eyes cold. “This sanctuary is my canvas, and you are an unexpected, messy smudge. Explain your presence before I am forced to... revise it.”",
        choices: [
            { text: "“I'm terribly sorry, I was lost.”", target: 'response_honest' },
            { text: "“The story... it’s beautiful.”", target: 'response_compliment' },
        ]
    },
    'response_honest': { speaker: "Sei", text: "He stops, considering you. “Lost? A flimsy excuse, but one that is... plausible. This place is not on any map.”", next: 'sei_dismissal' },
    'response_compliment': { speaker: "Sei", text: "His cold expression thaws for a fraction of a second. “...You see the beauty in the revision? Hmph. A rare quality. It does not, however, forgive the trespass.”", next: 'sei_dismissal' },
    'sei_dismissal': {
        speaker: "Sei",
        text: "“Regardless, my work requires absolute silence and solitude. The door is behind you. I suggest you use it.” He turns his back, a clear dismissal.",
        next: 'scarecrow_moment'
    },
    'scarecrow_moment': {
        speaker: "Sei",
        text: "He glances over his shoulder, noticing you haven't moved, frozen by uncertainty. “Are you a scarecrow? Rooted to my floor? Do you not comprehend simple language?”",
        next: 'give_tasks_initial'
    },
    'give_tasks_initial': {
        speaker: "Sei",
        title: "A Use for a Scarecrow",
        text: "He sighs, a sound of profound exasperation. “Fine. If you insist on existing in my space, make yourself useful. The dust on those shelves is an offense to literature. And that ledger... its chaotic state pains me. Attend to one. Do not bother me further.”",
        choices: [
            { text: "Attempt to organize the bookshelf.", target: 'sim_library_start' },
            { text: "Examine the disorderly ledger on his desk.", target: 'sim_study_start' },
        ]
    },

    // --- CORRECTED: THESE ARE NOW NARRATIVE SCENES, NOT PAGE JUMPS ---
    'sim_library_start': {
        title: "In the Library",
        text: "You approach the towering bookshelves. The task feels overwhelming, but you decide to start with a small section, sorting by a system Sei might appreciate—not alphabetically, but by the emotional resonance of the titles.",
        next: 'sim_library_complete'
    },
    'sim_study_start': {
        title: "At the Desk",
        text: "You sit at the grand oak desk. The ledger is a mess of scrawled notes and numbers. You begin the painstaking process of organizing the entries, creating a clear, logical system from the chaos.",
        next: 'sim_study_complete'
    },
    // --- END OF CORRECTION ---

    'sim_library_complete': {
        text: "Hours later, one section is perfect. You step back, proud. Sei appears behind you, silent as a ghost.",
        next: 'sei_reaction_1'
    },
    'sim_study_complete': {
        text: "After what feels like an eternity, the first few pages of the ledger are balanced and clear. You hear a soft 'Hmph' from the doorway. Sei is watching you.",
        next: 'sei_reaction_1'
    },
    'sei_reaction_1': {
        action: () => {
            if (relationshipLevel < 1) relationshipLevel = 1;
            localStorage.setItem('relationshipLevel', relationshipLevel);
        },
        speaker: "Sei",
        text: "“...Adequate. You have a certain... insight for creating order. It seems you are not entirely useless.”",
        next: 'first_dismissal_revised'
    },
    'first_dismissal_revised': {
        speaker: "Sei",
        text: "“Now, for your departure. The path you stumbled in on is... temperamental. A more logical exit exists.” He doesn't look at you, instead staring at a point on the wall as if reciting from memory.",
        next: 'first_dismissal_directions'
    },
    'first_dismissal_directions': {
        speaker: "Sei",
        text: "“Follow the moss-covered stones from the garden gate. When the path splits at the old oak, take the right fork, towards the sound of running water. The air will feel cooler. Follow the stream. It is a foolproof method. Do not deviate.”",
        next: 'first_dismissal_final_word'
    },
    'first_dismissal_final_word': {
        speaker: "Sei",
        text: "He finally turns his eyes to you, the briefest flicker of... something unreadable in them. “You have served your purpose. Do not make a habit of getting lost. I require silence to work.”",
        next: 'end_first_visit'
    },
    'end_first_visit': {
        title: "The First Step",
        text: "You leave the strange, beautiful house, following the precise directions given. The curator's cold words linger, but underneath them, you sense an unexpected current of care. You have a feeling you will be welcomed back...",
        choices: [
            { text: "[Continue the story...]", target: 'return_visit_1' }
        ]
    },

    // ================== ACT 2: THE PASSAGE OF TIME ==================
    'return_visit_1': {
        title: "Several Days Later",
        text: "You find the courage to return. The door is unlocked. Sei is in the living room, reading. He looks up as you enter, but says nothing, merely watching you.",
        choices: [
            { text: "Quietly find a seat on the opposite couch.", target: 'visit_1_quiet' },
            { text: "Ask him what book he's reading.", target: 'visit_1_ask' }
        ]
    },
    'visit_1_quiet': { speaker: "Sei", text: "He watches you for a moment, then returns to his book. The silence is heavy, but not hostile. An improvement.", next: 'return_visit_2' },
    'visit_1_ask': { speaker: "Sei", text: "He closes the book, marking his page. “A study on ancient poetic structures. I doubt it would interest you.” His tone is dismissive, but he answered you. A small victory.", next: 'return_visit_2' },

    'return_visit_2': {
        action: () => {
            if (relationshipLevel < 2) relationshipLevel = 2;
            localStorage.setItem('relationshipLevel', relationshipLevel);
        },
        title: "A Month Later",
        text: "Your visits have become a strange, unspoken routine. Today, you find Sei staring thoughtfully at a canvas, a brush in his hand. The air smells of turpentine and tea.",
        choices: [
            { text: "Comment on the warmth of the colors he's using.", target: 'visit_2_art' },
            { text: "Quietly make him a fresh cup of tea.", target: 'visit_2_tea' }
        ]
    },
    'visit_2_art': { speaker: "Sei", text: "“The warmth is intentional. It must contrast the subject’s inner coldness.” He doesn’t look at you, but he’s explaining his art. The walls between you are thinning.", next: 'return_visit_3' },
    'visit_2_tea': { speaker: "Sei", text: "He notices the cup you place beside him. He says nothing, but a few minutes later, you see the steam has vanished and the cup is empty. A silent acknowledgement.", next: 'return_visit_3' },
    
    'return_visit_3': {
        action: () => {
            if (relationshipLevel < 3) relationshipLevel = 3;
            localStorage.setItem('relationshipLevel', relationshipLevel);
        },
        title: "Six Months Later",
        text: "The two of you now exist in a comfortable silence. It is no longer strange, but peaceful. You feel bold enough today to approach him not as a guest, but as a peer.",
        choices: [
            { text: "“Sei, I have a logical puzzle I can't solve.”", target: 'visit_3_finance_ask' },
            { text: "“May I look at your books today?”", target: 'visit_3_library_ask' }
        ]
    },
    'visit_3_finance_ask': {
        speaker: "Sei",
        text: "You explain a complex financial problem about future value and steady investment. He puts down his teacup, genuinely intrigued. “You speak of turning chaotic variables into a predictable future... A fascinating application of logic.”",
        next: 'sei_impressed'
    },
    'visit_3_library_ask': {
        speaker: "Sei",
        text: "He gestures to the shelves. “My library is not a playground. But... I trust you will treat them with the respect they deserve. Proceed.” He has given you his trust.",
        next: 'sei_impressed'
    },

    // ================== ACT 3: THE HUB UNLOCK ==================
    'sei_impressed': {
        action: () => {
            relationshipLevel = HUB_LEVEL; // Set to 4 to unlock hub
            localStorage.setItem('relationshipLevel', HUB_LEVEL);
            updateNavigation();
        },
        speaker: "Sei",
        text: "He looks at you, and for the first time, his eyes are not cold, but warm. “Hmph. It seems you are not a smudge, after all. You are... a welcome dissonance. You make this quiet place less lonely.”",
        next: 'hub_unlocked'
    },
    'hub_unlocked': {
        title: "The Curator's Companion",
        text: "You are no longer a guest, but a part of the house's story. Sei nods to you as you enter, a quiet acknowledgement of your shared space. The Library and the Study are now open to you. What would you like to do?",
        choices: [
            { text: "Go to the Library.", target: 'goto_library_trusted' },
            { text: "Go to the Study.", target: 'goto_study_trusted' },
            { text: "Just chat with Sei for a while.", target: 'goto_chat' },
            { text: "Start a New Story (Resets Progress).", target: 'reset_story_confirm' }
        ]
    },
    'goto_chat': {
        speaker: "Sei",
        text: "You spend the afternoon in easy conversation, talking about books, art, and the world outside these walls. It feels like coming home.",
        choices: [{text: "(Return to the main room)", target: 'hub_unlocked'}]
    },
    'goto_library_trusted': {
        action: () => { window.location.href = 'library.html'; },
        text: "Heading to the library..."
    },
    'goto_study_trusted': {
        action: () => { window.location.href = 'study.html'; },
        text: "Heading to the study..."
    },
    'reset_story_confirm': {
        title: "Reset Progress?",
        text: "Are you certain you wish to start over? All your progress with Sei will be forgotten, and you will begin a new story from the very beginning.",
        choices: [
            { text: "Yes, start a new story.", target: 'reset_story_action' },
            { text: "No, go back.", target: 'hub_unlocked' }
        ]
    },
    'reset_story_action': {
        action: () => {
            localStorage.clear();
            window.location.reload();
        },
        text: "Forgetting everything..."
    }
};

// --- 4. NAVIGATION LOGIC ---
function updateNavigation() {
    if (relationshipLevel >= HUB_LEVEL) {
        navLibraryLink.classList.remove('disabled');
        navLibraryLink.title = "Go to the Library";
        navLibraryLink.href = 'library.html';
        navStudyLink.classList.remove('disabled');
        navStudyLink.title = "Go to the Study";
        navStudyLink.href = 'study.html';
    } else {
        navLibraryLink.classList.add('disabled');
        navLibraryLink.title = "Your bond with Sei is not yet strong enough.";
        navLibraryLink.href = 'javascript:void(0);';
        navStudyLink.classList.add('disabled');
        navStudyLink.title = "Your bond with Sei is not yet strong enough.";
        navStudyLink.href = 'javascript:void(0);';
    }
}

// --- 5. GAME ENGINE LOGIC ---
function typeWriter(text, i = 0) {
    clearTimeout(typingTimeout);
    isTyping = true;
    if (i < text.length) {
        dialogueText.innerHTML = text.substring(0, i + 1);
        typingTimeout = setTimeout(() => typeWriter(text, i + 1), 25);
    } else {
        isTyping = false;
        const scene = story[currentState];
        if (scene.next) {
            nextIndicator.classList.remove('hidden');
        } else if (scene.choices) {
            renderChoices(scene.choices);
        }
    }
}

function skipTyping() {
    if (!isTyping) return;
    clearTimeout(typingTimeout);
    isTyping = false;
    const scene = story[currentState];
    dialogueText.innerHTML = scene.text || "";
    if (scene.next) {
        nextIndicator.classList.remove('hidden');
    } else if (scene.choices) {
        renderChoices(scene.choices);
    }
}

function renderChoices(choices) {
    choicesContainer.innerHTML = '';
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.innerHTML = choice.text;
        button.dataset.target = choice.target;
        button.style.animationDelay = `${index * 0.1}s`;
        button.addEventListener('click', handleChoice);
        choicesContainer.appendChild(button);
    });
}

function handleChoice(event) {
    const targetState = event.currentTarget.dataset.target;
    renderScene(targetState);
}

function renderScene(state) {
    if (!story[state]) {
        console.error(`ERROR: Story state "${state}" is not defined!`);
        return;
    }

    currentState = state;
    const scene = story[state];

    if (scene.action) {
        scene.action();
        // Stop execution if the action is a page redirect
        if (state === 'goto_library_trusted' || state === 'goto_study_trusted' || state === 'reset_story_action') {
            return;
        }
    }

    choicesContainer.innerHTML = '';
    nextIndicator.classList.add('hidden');

    if (scene.visual && scene.visual.character) {
        characterSprite.classList.toggle('visible', scene.visual.character.visible);
    }

    chapterTitle.innerText = scene.title !== undefined ? scene.title : chapterTitle.innerText;
    speakerName.innerText = scene.speaker || '';

    dialogueText.innerHTML = '';
    if (scene.text) {
        typeWriter(scene.text);
    } else {
        if (scene.choices) {
            renderChoices(scene.choices);
        }
    }
}

// --- 6. INITIALIZATION & EVENT LISTENERS ---
function handleInteraction() {
    if (isTyping) {
        skipTyping();
    } else if (story[currentState] && story[currentState].next) {
        renderScene(story[currentState].next);
    }
}

bookFlipper.addEventListener('click', (e) => {
    if (e.target.id !== 'start-game-btn') {
        bookFlipper.classList.toggle('is-flipped');
    }
});

startGameBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    preGameContainer.style.opacity = '0';

    setTimeout(() => {
        preGameContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
        requestAnimationFrame(() => gameContainer.style.opacity = '1');

        if (relationshipLevel >= HUB_LEVEL) {
            renderScene('hub_unlocked');
        } else {
            // A more robust save system could be added here, but for now,
            // we start from the beginning if the hub isn't unlocked.
            // This allows replaying the full story.
            renderScene('start');
        }
    }, 800);
});

dialogueText.addEventListener('click', handleInteraction);
nextIndicator.addEventListener('click', handleInteraction);

const navMenu = document.getElementById('navigation-menu');
const navToggleBtn = document.getElementById('nav-toggle-btn');

navToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
});

document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});
