document.addEventListener('DOMContentLoaded', () => {

    const proceedClick = document.querySelector('.proceed-button');
    const introDiv = document.querySelector('.intro');
    const mainDiv = document.querySelector('.main-container');


    proceedClick.addEventListener('click', function () {
        introDiv.style.display = 'none';
        mainDiv.classList.remove('hidden');
        mainDiv.classList.add('show');

    });

    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');
    const counterDisplay = document.getElementById('counter-value');

    let count = 0;
    decreaseButton.style.visibility = 'hidden';
    
    function updateCounterDisplay() {
        counterDisplay.textContent = count;


        if (minLimit !== null && count <= minLimit) {
            count = minLimit;
            decreaseButton.style.visibility = 'hidden';
        } else {
            decreaseButton.style.visibility = 'visible';
        }


        if (!disableMaxLimit && maxLimit !== null && count >= maxLimit) {
            count = maxLimit;
            increaseButton.style.visibility = 'hidden';
        } else {
            increaseButton.style.visibility = 'visible';
        }


        const availableText = document.querySelector('.available');
        const remainingDisplay = document.getElementById('remaining');

        if (!disableMaxLimit && maxLimit !== null) {
            const remaining = maxLimit - count;
            availableText.style.display = 'block';
            remainingDisplay.textContent = `${remaining}`;
            remainingDisplay.style.display = 'block';
        } else {
            availableText.style.display = 'none';
            if (remainingDisplay) remainingDisplay.style.display = 'none';
        }
    }

    let minLimit = null;
    let maxLimit = null;
    let disableMaxLimit = true;

    increaseButton.addEventListener('click', () => {
        count++;
        updateCounterDisplay();
    });
    
    
    decreaseButton.addEventListener('click', () => {
        count--;
        updateCounterDisplay();
    });

    const settingsButton = document.querySelector('.settings');
    const settingsBox = document.querySelector('.settings-modal');

    function saveSettingsInfo() {
        const saveButton = document.getElementById('save-settings');
        const minInput = document.getElementById('min-input');
        const maxInput = document.getElementById('max-input');
        const disableCheckbox = document.getElementById('disable-max-checkbox');

        saveButton.addEventListener('click', () => {
            minLimit = parseInt(minInput.value) || 0;
            maxLimit = parseInt(maxInput.value) || 1000000; 
            disableMaxLimit = disableCheckbox.checked;

            if (count < minLimit) count = minLimit;
            if (!disableMaxLimit && count > maxLimit) count = maxLimit;

            updateCounterDisplay();
            settingsBox.classList.add('hidden');
        });
    }
    settingsButton.addEventListener('click', () => {
        settingsBox.classList.remove('hidden');
        saveSettingsInfo();
    });

    const resetBox = document.querySelector('.reset-modal');
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', () => {
        resetBox.classList.remove('hidden');
    });

    const yesButton = document.getElementById('yes');
    const noButton = document.getElementById('no');

    yesButton.addEventListener('click', () => {
        count = 0;
        updateCounterDisplay();
        resetBox.classList.add('hidden');
    });

    noButton.addEventListener('click', () => {
        resetBox.classList.add('hidden');
    });

    const infoButton = document.querySelector('.info');

});
