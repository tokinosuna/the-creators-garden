// --- DOM Element References ---
const financeScene = document.getElementById('finance-scene');
// FIXED: Changed getElementById to use 'character-sprite' to match the HTML.
const seiCharacter = document.getElementById('character-sprite');

// Dialogue System Elements
const storyOverlay = document.getElementById('story-overlay');
const dialogueBox = document.getElementById('dialogue-box');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const dialogueSprite = document.getElementById('dialogue-sprite');
const dialogueSpriteContainer = document.getElementById('dialogue-sprite-container');

// Tool & Modal Elements
const toolIcons = document.querySelectorAll('.tool-icon');
const modalBackdrops = document.querySelectorAll('.modal-backdrop');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');

// Navigation Menu Elements
const navMenu = document.getElementById('navigation-menu');
const navToggleBtn = document.getElementById('nav-toggle-btn');

// --- Dialogue & Story Data (Speaker updated to "Sei") ---
const initialStoryDialogue = [
    { speaker: "You", text: "Sei... you're from, what, a thousand years ago? Maybe more?" },
    { speaker: "Sei", text: "That is a matter of fact, not speculation. However, the flippant tone you employ is... utterly undelightful. What is your point?" },
    { speaker: "You", text: "It's just... the world is so harsh now. There's this concept called inflation that devours your savings, and you must invest simply to maintain your position, and everyone is perpetually agitated about accumulating enough for this state they call 'retirement'..." },
    { speaker: "Sei", text: "<i>He holds up a hand, silencing you.</i> I am filtering out your emotional static and cynical whining. I have isolated three key concepts: 'inflation', 'investment', and 'retirement'." },
    { speaker: "Sei", text: "These sound like mere logistical problems. Nothing more." },
    { speaker: "Sei", text: "The next time you visit, bring me academic texts on these subjects. I shall determine their validity." },
    { speaker: "Narrator", text: "(Some time later...)" },
    { speaker: "Sei", text: "Hmph. I have reviewed the primitive financial texts you provided. It is all merely applied mathematics and disciplined behavior, cloaked in the language of fear." },
    { speaker: "Sei", text: "I have forged logical instruments based on these principles. The interface is now active. Use them. Bring some semblance of order to your... frankly, chaotic existence." }
];

const seiRandomComments = [
    [{ speaker: "Sei", text: "I have constructed these tools to help you manage your... precarious financial state. Do not bother me while I am contemplating. Go, and be productive." }],
    [{ speaker: "Sei", text: "Hmph. Is it that time already? Very well, I shall prepare the afternoon tea. Do not attempt to 'help'. Simply seat yourself and remain quiet. I would appreciate the collaboration." }],
    [{ speaker: "Sei", text: "Your constant presence is a distraction, yet... the silence when you are gone is also a distraction. A paradox. How vexing." }],
    [{ speaker: "Sei", text: "You seem fatigued. ...Hmph. If you must vent about your trivialities, I suppose I can lend an ear. It may provide... anthropological insight." }],
    [{ speaker: "Sei", text: "Just because I am working late does not mean you are required to stay. ...However... if you absolutely insist, I will not be the one to send you away." }],
    [{ speaker: "Sei", text: "Are you in need of assistance? ...I suppose I have some time. State your problem clearly and concisely; I have no patience for rambling." }],
    [{ speaker: "Sei", text: "Kahaha! I acknowledge your efforts. It seems your work has some merit after all. Do not let this praise go to your head." }],
    [{ speaker: "Sei", text: "I prefer to take my meals in peace. ...However, if you insist on being here, you will do so in silence. Understood?" }],
    [{ speaker: "Sei", text: "To think I would become accustomed to the sound of your keyboard tapping... How utterly bizarre." }],
    [{ speaker: "Sei", text: "What is it now? I am in the middle of a delicate process. Unless the room is on fire, do not interrupt." }],
    [{ speaker: "Sei", text: "You must learn to take proper breaks. A tired mind produces flawed work. This applies even to... whatever it is you are doing." }],
    [{ speaker: "Sei", text: "I am going to the kitchen. Do you require anything? ...Don't look so surprised. It is inefficient for both of us to make separate trips." }],
   
];

const seiToolComments = {
    // Inflation tool comments
    largeAmount: [{ speaker: "Sei", text: "To fantasize about such a sum is a frivolous waste of cognitive resources. Cease your daydreaming and address the reality of your meager fortune." }],
    longTime: [{ speaker: "Sei", text: "To let capital stagnate over such a vast expanse of time without investing it? That is not prudence; it is an act of profound foolishness. The value will wither into dust." }],
    
    // Monthly Ledger comments
    incomeTooHigh: [{ speaker: "Sei", text: "Such a monthly income is statistically improbable for an individual of your standing. Cease this fanciful data entry and provide a realistic figure." }],
    incomeTooLow: [{ speaker: "Sei", text: "This sum is scarcely enough for basic subsistence. Your financial situation is more... precarious than I initially perceived." }],
    spendingInDebt: [{ speaker: "Sei", text: "You are spending more than you earn. This is not merely poor planning; it is a direct path to destitution. You must rectify this imbalance immediately." }],
    needsTooHigh: [{ speaker: "Sei", text: "Your essential expenditures consume a perilous portion of your income. This leaves no room for growth or unforeseen circumstances. A fragile existence, indeed." }],
    wantsTooHigh: [{ speaker: "Sei", text: "Your discretionary spending is... profligate. Such a lack of discipline is the very root of financial ruin. You must curb these hedonistic impulses." }],
    wantsTooLow: [{ speaker: "Sei", text: "While commendable in its frugality, a life devoid of any small pleasures is unsustainable. You are not a machine. It is logical to allocate a modest sum for your own morale." }],
    
    // 'Freedom' Equation comments
    annualSpendingHigh: [{ speaker: "Sei", text: "Such opulent aspirations... It seems your grasp on reality is as tenuous as your taste. A lifestyle of such vulgar excess is the hallmark of the nouveau riche, not of true artistry." }],
    annualSpendingLow: [{ speaker: "Sei", text: "To aim for such a meager existence... Is this a testament to a commendable asceticism, or simply a lack of ambition? I find myself unable to decide which is more pitiable." }],
    investmentsHigh: [{ speaker: "Sei", text: "An impressive sum. I trust it was acquired through legitimate, if likely uninspired, means. It seems you are not entirely without resources, merely without direction." }],
    investmentsLow: [{ speaker: "Sei", text: "To begin a grand journey with naught but pocket lint... Your optimism is exceeded only by your foolishness. This starting point is, to put it mildly, pathetic." }],
    contributionHigh: [{ speaker: "Sei", text: "Aggressively diverting such a large portion of your income is a brute-force method, lacking in finesse. However... I cannot fault the discipline. It is a necessary, if graceless, endeavor." }],
    contributionLow: [{ speaker: "Sei", text: "This paltry monthly contribution is like attempting to fill the ocean with a teaspoon. The gesture is so insignificant, it borders on the absurd. Do you truly expect to achieve anything?" }],
    fireReasonable: [{ speaker: "Sei", text: "...At least you are formulating a plan in a manner befitting a sensible person. It is nothing to be lauded, of course... but for you..." }, { speaker: "Sei", text: "<i>He sighs audibly.</i> ...A commendable effort. Well done." }]
};

// --- State Variables ---
let activeDialogueSequence = [];
let dialogueIndex = 0;
let isDialogueActive = false;
let pendingSeiCommentKey = null;

// --- Core Dialogue Functions ---
function showCharacterDialogue(dialogueArray) {
    if (isDialogueActive || !dialogueArray || dialogueArray.length === 0) return;
    activeDialogueSequence = dialogueArray;
    dialogueIndex = 0;
    isDialogueActive = true;
    storyOverlay.style.display = 'flex';
    requestAnimationFrame(() => storyOverlay.style.opacity = '1');
    displayNextDialogueLine();
}

function hideDialogue() {
    storyOverlay.style.opacity = '0';
    setTimeout(() => {
        storyOverlay.style.display = 'none';
        isDialogueActive = false;
    }, 500);
}

function displayNextDialogueLine() {
    if (dialogueIndex >= activeDialogueSequence.length) {
        hideDialogue();
        if (activeDialogueSequence === initialStoryDialogue) {
             localStorage.setItem('studyIntroSeen', 'true');
             setTimeout(() => financeScene.classList.add('visible'), 500);
        }
        return;
    }

    const { speaker, text } = activeDialogueSequence[dialogueIndex];
    if (speaker === "Narrator") {
        characterName.style.display = 'none';
        dialogueText.innerHTML = `<span class="narrator-text">${text}</span>`;
        dialogueSpriteContainer.style.opacity = '0';
    } else {
        // FIXED: Updated sprite source to your desired dialogue image
        dialogueSprite.src = 'imgs/seidia.png'; 
        characterName.style.display = 'block';
        characterName.innerText = speaker;
        dialogueText.innerHTML = text;
        dialogueSpriteContainer.style.opacity = '1';
    }
    dialogueIndex++;
}

// --- Event Listeners ---
dialogueBox.addEventListener('click', displayNextDialogueLine);

// This check ensures the script doesn't crash if the element is missing for any reason.
// With the corrected ID, this 'if' block will now execute properly.
if (seiCharacter) {
    seiCharacter.addEventListener('click', () => {
        if (isDialogueActive) return; // Prevent new dialogue while one is active
        const randomIndex = Math.floor(Math.random() * seiRandomComments.length);
        showCharacterDialogue(seiRandomComments[randomIndex]);
    });
} else {
    console.error("CRITICAL ERROR: The character element with id 'character-sprite' was not found. The page will not function correctly. Check the ID in study.html.");
}


navToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
});

// --- Modal & Tool Logic ---
toolIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if (isDialogueActive) return;
        const toolId = icon.dataset.tool;
        document.getElementById(`${toolId}-modal`).style.display = 'flex';
    });
});

function closeModal(modal) {
    modal.style.display = 'none';
    if (pendingSeiCommentKey && seiToolComments[pendingSeiCommentKey]) {
        showCharacterDialogue(seiToolComments[pendingSeiCommentKey]);
        pendingSeiCommentKey = null;
    }
}

closeModalBtns.forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal-backdrop'))));
modalBackdrops.forEach(modal => modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); }));

// --- Individual Tool Calculation Logic ---

// --- Budget Tool Logic ---
const calculateBudgetBtn = document.getElementById('calculate-budget');
let budgetChart;
calculateBudgetBtn.addEventListener('click', () => {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const needs = parseFloat(document.getElementById('needs').value) || 0;
    const wants = parseFloat(document.getElementById('wants').value) || 0;
    const savings = income - needs - wants;

    document.getElementById('savings-value').textContent = `€${savings.toFixed(2)}`;
    
    if (income > 15000) {
        pendingSeiCommentKey = 'incomeTooHigh';
    } else if (income > 0 && income < 1200) {
        pendingSeiCommentKey = 'incomeTooLow';
    } else if (savings < 0) {
        pendingSeiCommentKey = 'spendingInDebt';
    } else if (income > 0 && (needs / income) > 0.70) {
        pendingSeiCommentKey = 'needsTooHigh';
    } else if (income > 0 && (wants / income) > 0.50) {
        pendingSeiCommentKey = 'wantsTooHigh';
    } else if (income > 0 && wants < 100) {
        pendingSeiCommentKey = 'wantsTooLow';
    } else {
        pendingSeiCommentKey = null;
    }

    const data = {
        labels: ['Needs', 'Wants', 'Savings'],
        datasets: [{ 
            data: [needs, wants, savings > 0 ? savings : 0], 
            backgroundColor: ['#a3b8c3', '#e7b2c4', '#5d6e5a'], // Thematic colors: Dusty Blue, Pink Accent, Sage Green
            borderColor: 'var(--page-color)', 
            borderWidth: 3 
        }]
    };

    const chartEl = document.getElementById('budget-chart');
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'var(--text-color)', // Thematic text color
                    font: { family: "'Lora', serif" }
                }
            }
        }
    };

    if (budgetChart) { 
        budgetChart.data = data; 
        budgetChart.update(); 
    } else { 
        budgetChart = new Chart(chartEl, { type: 'doughnut', data: data, options: chartOptions }); 
    }
});

// --- Inflation Tool Logic (Currency Updated) ---
const calculateInflationBtn = document.getElementById('calculate-inflation');
calculateInflationBtn.addEventListener('click', () => {
    const currentAmount = parseFloat(document.getElementById('current-amount').value) || 0;
    const years = parseFloat(document.getElementById('years').value) || 0;
    const futureValue = currentAmount / Math.pow(1 + 0.03, years); 
    document.getElementById('future-value').textContent = `€${futureValue.toFixed(2)}`;

    if (currentAmount > 10000000) {
        pendingSeiCommentKey = 'largeAmount';
    } else if (years > 40) {
        pendingSeiCommentKey = 'longTime';
    } else {
        pendingSeiCommentKey = null;
    }
});

// --- FIRE Tool Logic ---
const calculateFireBtn = document.getElementById('calculate-fire');
calculateFireBtn.addEventListener('click', () => {
    const annualExpenses = parseFloat(document.getElementById('annual-expenses').value) || 0;
    const currentSavings = parseFloat(document.getElementById('current-savings').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 0;
    const annualRate = 0.07;
    const fireNumber = annualExpenses * 25;
    document.getElementById('fire-number').textContent = `€${fireNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    if (annualExpenses > 100000) {
        pendingSeiCommentKey = 'annualSpendingHigh';
    } else if (annualExpenses > 0 && annualExpenses < 25000) {
        pendingSeiCommentKey = 'annualSpendingLow';
    } else if (monthlyContribution > 0 && monthlyContribution < 150) {
        pendingSeiCommentKey = 'contributionLow';
    } else if (monthlyContribution > 2500) {
        pendingSeiCommentKey = 'contributionHigh';
    } else if (currentSavings > 0 && currentSavings < 5000) {
        pendingSeiCommentKey = 'investmentsLow';
    } else if (currentSavings > 250000) {
        pendingSeiCommentKey = 'investmentsHigh';
    } else {
        pendingSeiCommentKey = 'fireReasonable';
    }

    let yearsToFire = 'N/A';
    if (annualExpenses > 0) {
        const annualContribution = monthlyContribution * 12;
        if (currentSavings >= fireNumber) {
            yearsToFire = '0 (Achieved!)';
        } else if (annualRate > 0 && annualContribution > 0) {
            const numerator = Math.log((fireNumber * annualRate + annualContribution) / (currentSavings * annualRate + annualContribution));
            const denominator = Math.log(1 + annualRate);
            if(denominator > 0 && numerator > 0) { yearsToFire = (numerator / denominator).toFixed(1); } 
            else { yearsToFire = 'Effectively never'; }
        } else if (currentSavings < fireNumber && annualContribution <= 0) {
            yearsToFire = 'Never at this rate';
        }
    }
    document.getElementById('years-to-fire').textContent = `${yearsToFire} years`;
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const relationshipLevel = parseInt(localStorage.getItem('relationshipLevel') || '0');
    const HUB_LEVEL = 4; // This value should be consistent with the main story script

    if (relationshipLevel < HUB_LEVEL) {
        document.querySelectorAll('#nav-library, #nav-story').forEach(link => {
            link.classList.add('disabled');
            link.href = 'javascript:void(0);';
            link.title = "Your bond with Sei is not yet strong enough.";
        });
    }

    const studyIntroSeen = localStorage.getItem('studyIntroSeen') === 'true';

    if (!studyIntroSeen) {
        showCharacterDialogue(initialStoryDialogue);
    } else {
        financeScene.classList.add('visible');
    }
});
