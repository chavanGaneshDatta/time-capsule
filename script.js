const form = document.getElementById("capsuleForm");
const capsuleGrid = document.getElementById("capsuleGrid");

const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const dateInput = document.getElementById("unlockDate");
const timeInput = document.getElementById("unlockTime");
const imageInput = document.getElementById("image");

const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

const totalCapsules = document.getElementById("totalCapsules");
const lockedCount = document.getElementById("lockedCount");
const unlockedCount = document.getElementById("unlockedCount");
const publicCount = document.getElementById("publicCount");

const themeBtn = document.getElementById("themeBtn");

// View Modal

const viewModal = document.getElementById("viewModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalVisibility = document.getElementById("modalVisibility");
const modalDate = document.getElementById("modalDate");

const closeBtn = document.querySelector(".close");

// Delete Modal

const deleteModal = document.getElementById("deleteModal");

const cancelDelete =
document.querySelector(".cancel");

const confirmDelete =
document.querySelector(".confirm-delete");

// ----------------------------

let capsules =
JSON.parse(localStorage.getItem("capsules")) || [];

let uploadedImage = "";

let editingId = null;

let deleteId = null;

// ----------------------------
// Minimum Date
// ----------------------------

dateInput.min =
new Date().toISOString().split("T")[0];

// ----------------------------
// Theme
// ----------------------------

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});

// ----------------------------
// Image Upload
// ----------------------------

imageInput.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file){

        uploadedImage="";

        return;

    }

    const reader = new FileReader();

    reader.onload=(event)=>{

        uploadedImage=event.target.result;

    }

    reader.readAsDataURL(file);

});

// ----------------------------
// Save LocalStorage
// ----------------------------

function saveCapsules(){

    localStorage.setItem(

        "capsules",

        JSON.stringify(capsules)

    );

}

// ----------------------------
// Clear Form
// ----------------------------

function clearForm(){

    form.reset();

    uploadedImage="";

    editingId=null;

}

// ----------------------------
// Is Unlocked
// ----------------------------

function isUnlocked(capsule){

    return new Date() >=
    new Date(capsule.unlockDate);

}

// ----------------------------
// Countdown
// ----------------------------

function getCountdown(date){

    const now = new Date();

    const unlock =
    new Date(date);

    const diff =
    unlock-now;

    if(diff<=0){

        return "Unlocked";

    }

    const days =
    Math.floor(diff/(1000*60*60*24));

    const hours =
    Math.floor(
        (diff%(1000*60*60*24))
        /(1000*60*60)
    );

    const minutes =
    Math.floor(
        (diff%(1000*60*60))
        /(1000*60)
    );

    const seconds =
    Math.floor(
        (diff%(1000*60))
        /1000
    );

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;

}

// ----------------------------
// Create / Edit Capsule
// ----------------------------

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const title =
    titleInput.value.trim();

    const message =
    messageInput.value.trim();

    const unlockDate =
    `${dateInput.value}T${timeInput.value}`;

    const visibility =
    document.querySelector(
    "input[name='visibility']:checked"
    ).value;

    if(!title){

        alert("Enter title");

        return;

    }

    if(editingId){

        const capsule =
        capsules.find(
        c=>c.id===editingId
        );

        capsule.title=title;

        capsule.message=message;

        capsule.unlockDate=unlockDate;

        capsule.visibility=visibility;

        if(uploadedImage){

            capsule.image=
            uploadedImage;

        }

    }

    else{

        capsules.push({

            id:Date.now(),

            title,

            message,

            unlockDate,

            visibility,

            image:uploadedImage,

            createdAt:new Date()

        });

    }

    saveCapsules();

    clearForm();

    renderCapsules();

});

// ================================
// PART 2
// ================================

// Render Capsules
function renderCapsules() {

    let filtered = [...capsules];

    // Search
    const keyword = searchInput.value.toLowerCase();

    if (keyword !== "") {
        filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(keyword) ||
            c.message.toLowerCase().includes(keyword)
        );
    }

    // Sort
    switch (sortSelect.value) {

        case "Newest":
            filtered.sort((a, b) => b.id - a.id);
            break;

        case "Oldest":
            filtered.sort((a, b) => a.id - b.id);
            break;

        case "Unlock Date":
            filtered.sort(
                (a, b) =>
                    new Date(a.unlockDate) -
                    new Date(b.unlockDate)
            );
            break;

        case "Locked First":
            filtered.sort(
                (a, b) =>
                    isUnlocked(a) - isUnlocked(b)
            );
            break;

        case "Unlocked First":
            filtered.sort(
                (a, b) =>
                    isUnlocked(b) - isUnlocked(a)
            );
            break;
    }

    capsuleGrid.innerHTML = "";

    let locked = 0;
    let unlocked = 0;
    let publicCapsules = 0;

    if (filtered.length === 0) {

        capsuleGrid.innerHTML =
            "<h3>No Capsules Found</h3>";

    }

    filtered.forEach(capsule => {

        if (isUnlocked(capsule))
            unlocked++;
        else
            locked++;

        if (capsule.visibility === "public")
            publicCapsules++;

        const card = document.createElement("div");

        card.className = "capsule-card";

        card.innerHTML = `

        <div class="capsule-image">

            <img src="${
                capsule.image ||
                'https://picsum.photos/500/300'
            }">

        </div>

        <div class="capsule-content">

            <h3>${capsule.title}</h3>

            <span class="status ${
                isUnlocked(capsule)
                ? "unlocked"
                : "locked"
            }">

            ${
                isUnlocked(capsule)
                ? "🔓 Unlocked"
                : "🔒 Locked"
            }

            </span>

            <p class="countdown">

            ${
                isUnlocked(capsule)

                ? "Ready to Open"

                : `Unlocks in <strong>${getCountdown(capsule.unlockDate)}</strong>`
            }

            </p>

            <p class="date">

            <i class="fa-solid fa-calendar-days"></i>

            ${new Date(capsule.unlockDate).toLocaleString()}

            </p>

            <div class="actions">

                <button class="view">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="edit">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

        // View
        card.querySelector(".view").onclick = () => {

            if (!isUnlocked(capsule)) {

                alert("This capsule is still locked.");

                return;

            }

            modalImage.src =
                capsule.image ||
                "https://picsum.photos/500/300";

            modalTitle.textContent =
                capsule.title;

            modalMessage.textContent =
                capsule.message;

            modalVisibility.textContent =
                capsule.visibility;

            modalDate.textContent =
                new Date(
                    capsule.unlockDate
                ).toLocaleString();

            viewModal.classList.add("active");

        };

        // Edit
        card.querySelector(".edit").onclick = () => {

            if (isUnlocked(capsule)) {

                alert(
                    "Unlocked capsules cannot be edited."
                );

                return;

            }

            editingId = capsule.id;

            titleInput.value =
                capsule.title;

            messageInput.value =
                capsule.message;

            dateInput.value =
                capsule.unlockDate.split("T")[0];

            timeInput.value =
                capsule.unlockDate
                .split("T")[1]
                .substring(0,5);

            document.querySelector(

                `input[value="${capsule.visibility}"]`

            ).checked = true;

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        };

        // Delete
        card.querySelector(".delete").onclick = () => {

            deleteId = capsule.id;

            deleteModal.classList.add("active");

        };

        capsuleGrid.appendChild(card);

    });

    // Statistics

    totalCapsules.textContent =
        capsules.length;

    lockedCount.textContent =
        locked;

    unlockedCount.textContent =
        unlocked;

    publicCount.textContent =
        publicCapsules;

}

// Delete Modal

cancelDelete.onclick = () => {

    deleteModal.classList.remove("active");

};

confirmDelete.onclick = () => {

    capsules = capsules.filter(

        c => c.id !== deleteId

    );

    saveCapsules();

    deleteModal.classList.remove("active");

    renderCapsules();

};

// Close View Modal

closeBtn.onclick = () => {

    viewModal.classList.remove("active");

};

window.onclick = (e) => {

    if (e.target === viewModal)

        viewModal.classList.remove("active");

    if (e.target === deleteModal)

        deleteModal.classList.remove("active");

};

// Search

searchInput.addEventListener(

    "input",

    renderCapsules

);

// Sort

sortSelect.addEventListener(

    "change",

    renderCapsules

);

renderCapsules();