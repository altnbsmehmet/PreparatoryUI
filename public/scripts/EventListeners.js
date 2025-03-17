
// global toggle listener
let sidebar = document.getElementById('sidebar');
const nav = document.getElementById('nav');
const navSidebarBtn = document.getElementById('nav-sidebar-btn');
document.body.addEventListener('click', (event) => {
    if (event.target.matches('[data-toggle="sidebar-btn"]')) {
        if (sidebar.classList.contains('left-[-20%]')) {
            sidebar.classList.remove('left-[-20%]');
            nav.classList.remove('w-full');
            nav.classList.add('w-4/5');
            navSidebarBtn.classList.add('hidden');
        }
        else {
            sidebar.classList.add('left-[-20%]');
            nav.classList.remove('w-4/5');
            nav.classList.add('w-full');
            navSidebarBtn.classList.remove('hidden');
        }
    } else if (event.target.matches('[data-toggle=""]')) {

    }
});




// uploadForm
const fileInput = document.getElementById('fileInput');
const fileNameInput = document.getElementById('fileNameInput');
document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("submitted");
    if (!fileInput.files.length) {
        alert("select a file");
        return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('fileName', fileNameInput.value);

    try {
        const result = await fetch('/document/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        const response = await result.json();

        alert(response.message);

        let sidebarButton = document.createElement('button');
        sidebarButton.textContent = response.document.FileName;
        sidebarButton.classList.add('text-white');
        sidebarButton.dataset.documentId = response.document.Id;
        sidebar.appendChild(sidebarButton);
    } catch (error) {
        console.error(`Error --> ${error}`);
    }
});