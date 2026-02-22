// --- 1. The Story Database (Where you add new stories) ---
const stories = [
    {
        id: 'eli-the-elephant',
        title: "Eli the Honest Elephant",
        // මෙහි ඔබගේ කවරයේ පින්තූරයේ නම ඇත
        cover: "coverpage.jpg",
        theme: "Honesty",
        moral: "Honesty is always the best policy; telling the truth frees you from guilt and builds trust with those you love.",
        pages: [
            {
                text: "Eli the little elephant loved peanuts, but today he promised his mama he wouldn't eat any before dinner.",
                image: "page1.jpg"
            },
            {
                text: "When Mama asked if he ate the peanuts, Eli shook his head and said, 'No, a mischievous monkey must have taken them!'",
                image: "page2.jpg"
            },
            {
                text: "Later, his tummy started to rumble and grumble really loud because he had eaten too many peanuts.",
                image: "page3.jpg"
            },
            {
                text: "Eli couldn't handle the tummy ache any longer, so he found his mama and told her the truth about eating the peanuts.",
                image: "page4.jpg"
            },
            {
                text: "Mama hugged Eli and gave him some special leaves for his tummy, telling him that telling the truth always makes everything better.",
                image: "page5.jpg"
            }
        ]
    }
];

// --- 2. Country Info Data ---
const countryData = {
    'en': { flag: '🇺🇸 / 🇬🇧', animal: 'Eagle / Lion' },
    'si': { flag: '🇱🇰', animal: 'Jungle Fowl' },
    'hi': { flag: '🇮🇳', animal: 'Bengal Tiger' },
    'es': { flag: '🇪🇸', animal: 'Bull' },
    'fr': { flag: '🇫🇷', animal: 'Gallic Rooster' },
    'zh-CN': { flag: '🇨🇳', animal: 'Giant Panda' }
};

// --- Variables ---
let currentStory = null;
let currentPageIndex = 0;
const appContainer = document.getElementById('app-container');

// --- Functions ---
function renderLibrary() {
    let html = `<div class="story-grid">`;
    stories.forEach(story => {
        html += `
            <div class="story-card" onclick="openStory('${story.id}')">
                <img src="${story.cover}" alt="${story.title}" class="story-cover">
                <h2>${story.title}</h2>
                <p>A story about ${story.theme}</p>
                <button class="read-btn"><i class="fas fa-book-reader"></i> Read Story</button>
            </div>
        `;
    });
    html += `</div><div class="adsense-placeholder">[ Google AdSense Display Banner - Passive Income ]</div>`;
    appContainer.innerHTML = html;
}

window.openStory = function(storyId) {
    currentStory = stories.find(s => s.id === storyId);
    currentPageIndex = 0;
    renderStoryPage();
};

function renderStoryPage() {
    if (!currentStory) return;
    const isEndPage = currentPageIndex === currentStory.pages.length;
    let html = `<button onclick="closeStory()" style="margin-bottom: 20px; padding: 10px 20px; border-radius: 20px; border: none; cursor:pointer; background-color: #e5e7eb; font-weight: bold;"><i class="fas fa-arrow-left"></i> Back to Library</button>`;

    if (isEndPage) {
        html += `
            <div class="flipbook-container end-page">
                <i class="fas fa-check-circle" style="font-size: 5rem; color: #4ade80; margin-bottom: 20px;"></i>
                <h2 style="font-size: 3rem; color: #1f2937;" class="notranslate">The End!</h2>
                <div class="moral-box">
                    <h3><i class="fas fa-star" style="color: #f59e0b;"></i> Moral of the Story</h3>
                    <p class="moral-text">"${currentStory.moral}"</p>
                </div>
                <div class="upsell-box">
                    <h4>Parents: Support our free stories!</h4>
                    <button style="padding: 10px 20px; background: #ea580c; color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">Download High-Quality PDF ($1)</button>
                </div>
            </div>`;
    } else {
        const pageData = currentStory.pages[currentPageIndex];
        html += `
            <div class="flipbook-container">
                <div class="page-text-side">
                    <button class="read-aloud-btn" onclick="readAloud()" title="Read Out Loud"><i class="fas fa-volume-up"></i></button>
                    <p class="page-text">${pageData.text}</p>
                </div>
                <div class="page-image-side">
                    <img src="${pageData.image}" alt="Story Scene" class="page-image">
                </div>
            </div>`;
    }

    html += `
        <div class="book-controls">
            <button class="nav-btn prev" onclick="turnPage(-1)" ${currentPageIndex === 0 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> Previous</button>
            <button class="nav-btn next" onclick="turnPage(1)" ${isEndPage ? 'disabled' : ''}>Next <i class="fas fa-chevron-right"></i></button>
        </div>`;
    appContainer.innerHTML = html;
}

window.turnPage = function(direction) {
    const newPage = currentPageIndex + direction;
    if (newPage >= 0 && newPage <= currentStory.pages.length) {
        currentPageIndex = newPage;
        renderStoryPage();
    }
};

window.closeStory = function() {
    currentStory = null;
    renderLibrary();
};

window.readAloud = function() {
    if (!currentStory) return;
    const textToRead = currentStory.pages[currentPageIndex].text;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToRead);
        const htmlLang = document.documentElement.lang || 'en';
        utterance.lang = htmlLang;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support Text-to-Speech.");
    }
};

setInterval(() => {
    const infoDiv = document.getElementById('country-info');
    if(!infoDiv) return;
    const selectBox = document.querySelector('.goog-te-combo');
    if (selectBox && selectBox.value) {
        const currentLangCode = selectBox.value;
        if (countryData[currentLangCode]) {
            const data = countryData[currentLangCode];
            infoDiv.innerHTML = `${data.flag} Reading in ${currentLangCode.toUpperCase()} | Fun Fact: National Animal is ${data.animal}`;
        }
    }
}, 2000);

renderLibrary();