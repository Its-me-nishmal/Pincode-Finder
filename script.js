document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const pincodeInput = document.getElementById('pincodeInput');
    const detailsDiv = document.getElementById('details');
    const resultsDiv = document.getElementById('results');
    const totalFoundSpan = document.getElementById('totalFound');
    const nextButton = document.getElementById('nextButton');
    const ser = document.getElementById('pincodeInput');
    const back = document.getElementById('backButton')
    const now = document.getElementById("now")

    let currentIndex = 0;
    let filteredData = [];

    toggleButton.addEventListener('click', () => {
        pincodeInput.style.display = 'block';
        toggleButton.style.display = 'none';
    });

    

    ser.addEventListener('input', async () => {
        const searchTerm = ser.value.trim();
        if (searchTerm.length === 6) {
            detailsDiv.style.display = 'block';
            try {
                const response = await fetch('https://its-me-nishmal.github.io/India-Pincode-Lookup/pincodes.json');
                data = await response.json();
                filteredData = data.filter(item => item.pincode.toString() === searchTerm);
                currentIndex = 0;
                displayResults(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            resultsDiv.innerHTML = '';
        }
    });

    function displayResults(data) {
        resultsDiv.innerHTML = '';
        totalFoundSpan.textContent = `Total Found: ${data.length}`;
        now.textContent = currentIndex+1;

        if (data.length === 0) {
            document.getElementById('ok').style.display = 'none'
            resultsDiv.textContent = 'No results found.';
            now.textContent = currentIndex
            return;
        }
        document.getElementById('ok').style.display = 'block'
        const currentItem = data[currentIndex];

        document.getElementById('officeName').textContent = currentItem.officeName;
        document.getElementById('pincode').textContent = currentItem.pincode;
        document.getElementById('taluk').textContent = currentItem.taluk;
        document.getElementById('districtName').textContent = currentItem.districtName;
        document.getElementById('stateName').textContent = currentItem.stateName;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < filteredData.length - 1) {
            currentIndex++;
            displayResults(filteredData);
            now.textContent = currentIndex+1;
        }
    });
    back.addEventListener('click', () => {
        if(currentIndex > 0 ) {
            currentIndex--;
            displayResults(filteredData)
            now.textContent = currentIndex+1;
        }
    })
});
