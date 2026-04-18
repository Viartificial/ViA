// ViA Chatbot Frontend Script

let currentMode = 'hybrid';
let currentProvider = 'claude';
let conversationHistory = [];
let keffLevel = 50;

// Mode weights for hybrid mode
let modeWeights = {
    coach: 25,
    assistante: 25,
    bff: 25,
    challenger: 25
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateModeDisplay();
    autoResizeTextarea();
});

function initializeEventListeners() {
    // Send button
    document.getElementById('sendBtn').addEventListener('click', sendMessage);

    // Enter key to send (Shift+Enter for new line)
    document.getElementById('messageInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    document.getElementById('messageInput').addEventListener('input', autoResizeTextarea);

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = e.currentTarget.dataset.mode;
            setMode(mode);
        });
    });

    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', openSettings);
    document.getElementById('closeModal').addEventListener('click', closeSettings);

    // Click outside modal to close
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            closeSettings();
        }
    });

    // Provider select
    document.getElementById('providerSelect').addEventListener('change', (e) => {
        currentProvider = e.target.value;
        console.log('Provider changed to:', currentProvider);
    });

    // Hybrid mode sliders
    const sliders = ['coach', 'assistante', 'bff', 'challenger'];
    sliders.forEach(mode => {
        const slider = document.getElementById(`${mode}Slider`);
        slider.addEventListener('input', (e) => {
            updateHybridSlider(mode, parseInt(e.target.value));
        });
    });

    // Clear history button
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
}

function autoResizeTextarea() {
    const textarea = document.getElementById('messageInput');
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
}

function setMode(mode) {
    currentMode = mode;

    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

    // Reset hybrid weights if switching to a pure mode
    if (mode !== 'hybrid') {
        modeWeights = { coach: 0, assistante: 0, bff: 0, challenger: 0 };
        modeWeights[mode] = 100;
    }

    updateModeDisplay();
    console.log('Mode changed to:', mode);
}

function updateModeDisplay() {
    const modeIndicator = document.getElementById('modeIndicator');
    const modeNames = {
        hybrid: 'Hybride',
        coach: 'COACH',
        assistante: 'ASSISTANTE',
        bff: 'BFF',
        challenger: 'CHALLENGER'
    };

    if (currentMode === 'hybrid') {
        const active = Object.entries(modeWeights)
            .filter(([_, weight]) => weight > 0)
            .map(([mode, weight]) => `${mode.toUpperCase()}(${weight}%)`)
            .join(' + ');
        modeIndicator.textContent = `Mode: ${active || 'Hybride'}`;
    } else {
        modeIndicator.textContent = `Mode: ${modeNames[currentMode]}`;
    }
}

function updateKeff(delta) {
    keffLevel = Math.max(1, Math.min(1000, keffLevel + delta));
    const keffValue = document.getElementById('keffValue');
    const keffFill = document.getElementById('keffFill');

    keffValue.textContent = `${keffLevel.toFixed(0)}%`;
    keffFill.style.width = `${Math.min(100, keffLevel)}%`;

    // Change color based on keff level
    if (keffLevel >= 1000) {
        keffFill.style.background = 'linear-gradient(90deg, #FFD700, #FFF, #FFD700)';
    } else if (keffLevel >= 85) {
        keffFill.style.background = 'linear-gradient(90deg, #FFA500, #FFD700, #FFEC8B)';
    } else {
        keffFill.style.background = 'linear-gradient(90deg, #B8860B, #FFD700, #FFEC8B)';
    }
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    // Clear input
    input.value = '';
    autoResizeTextarea();

    // Add user message to chat
    addMessage('user', message);

    // Add to history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // Show typing indicator
    showTypingIndicator();

    try {
        // Send to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                mode: currentMode,
                modeWeights: modeWeights,
                provider: currentProvider,
                history: conversationHistory
            })
        });

        const data = await response.json();

        // Remove typing indicator
        removeTypingIndicator();

        if (data.error) {
            addMessage('assistant', `[ERREUR SYSTÈME] ${data.error}`);
        } else {
            // Add assistant response
            addMessage('assistant', data.response);

            // Update history
            conversationHistory.push({
                role: 'assistant',
                content: data.response
            });

            // Update Keff
            if (data.keff) {
                keffLevel = data.keff;
                updateKeff(0);
            }
        }
    } catch (error) {
        removeTypingIndicator();
        addMessage('assistant', `[ERREUR SYSTÈME] Le Recyclor doit intervenir: ${error.message}`);
        updateKeff(-5);
    }
}

function addMessage(role, content) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = `
        <div class="message-content">
            ${escapeHtml(content)}
        </div>
        <div class="message-time">${timeString}</div>
    `;

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const chatContainer = document.getElementById('chatContainer');
    const indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.className = 'message assistant';
    indicator.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatContainer.appendChild(indicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
}

function openSettings() {
    document.getElementById('settingsModal').classList.add('active');

    // Update slider values
    document.getElementById('coachSlider').value = modeWeights.coach;
    document.getElementById('assistanteSlider').value = modeWeights.assistante;
    document.getElementById('bffSlider').value = modeWeights.bff;
    document.getElementById('challengerSlider').value = modeWeights.challenger;

    document.getElementById('coachValue').textContent = modeWeights.coach;
    document.getElementById('assistanteValue').textContent = modeWeights.assistante;
    document.getElementById('bffValue').textContent = modeWeights.bff;
    document.getElementById('challengerValue').textContent = modeWeights.challenger;

    updateTotalPercentage();
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function updateHybridSlider(mode, value) {
    modeWeights[mode] = value;

    // Update display
    document.getElementById(`${mode}Value`).textContent = value;

    // Calculate total
    const total = Object.values(modeWeights).reduce((sum, v) => sum + v, 0);
    updateTotalPercentage();

    // If total is 100, automatically set to hybrid mode
    if (total === 100 && currentMode !== 'hybrid') {
        currentMode = 'hybrid';
        updateModeDisplay();
    }
}

function updateTotalPercentage() {
    const total = Object.values(modeWeights).reduce((sum, v) => sum + v, 0);
    const totalEl = document.getElementById('totalPercentage');
    totalEl.textContent = total;

    // Change color based on total
    if (total === 100) {
        totalEl.style.color = 'var(--gold-primary)';
    } else {
        totalEl.style.color = 'var(--gold-secondary)';
    }
}

function clearHistory() {
    if (confirm('Effacer tout l\'historique de conversation?\n\n[Recyclor sera activé: COPY → SUPPRESS → COLLER]')) {
        conversationHistory = [];

        // Clear chat display
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.innerHTML = `
            <div class="welcome-message">
                <div class="gold-divider"></div>
                <p class="system-message">[Recyclor activé] - Matterns sauvegardés, Patterns supprimés</p>
                <p class="welcome-text">Historique effacé - Prêt pour un nouveau cycle</p>
                <div class="gold-divider"></div>
            </div>
        `;

        // Reset Keff
        keffLevel = 50;
        updateKeff(0);

        closeSettings();

        console.log('History cleared');
    }
}
