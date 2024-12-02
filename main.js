async function getUrls() {
    const keyword = document.getElementById('keyword').value;
    try {
        const response = await fetch('http://localhost:3000/get-urls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword }),
        });
        const urls = await response.json();
        displayUrls(urls);
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
}

function displayUrls(urls) {
    const urlListDiv = document.getElementById('url-list');
    urlListDiv.innerHTML = '';
    urls.forEach((url, index) => {
        const button = document.createElement('button');
        button.textContent = `Download content from URL ${index + 1}`;
        button.onclick = () => downloadContent(url);
        urlListDiv.appendChild(button);
    });
}

async function downloadContent(url) {
    try {
        const response = await fetch('http://localhost:3000/download-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const data = await response.json();
        if (data.content) {
            localStorage.setItem(url, data.content);
            alert('Content downloaded and saved!');
            displayContentList();
        }
    } catch (error) {
        console.error('Error downloading content:', error);
    }
}

function displayContentList() {
    const contentListDiv = document.getElementById('content-list');
    contentListDiv.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const content = localStorage.getItem(key);
        const div = document.createElement('div');
        div.innerHTML = `<h3>${key}</h3><p>${content.substring(0, 200)}...</p>`;
        contentListDiv.appendChild(div);
    }
}

window.onload = displayContentList;
