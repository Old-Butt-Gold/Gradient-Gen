import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
        <div class="colors">
            <input type="color" id="color-a" value="#7986cb">
            <input type="color" id="color-b" value="#1a237e">
        </div>
        <div class="buttons">
            <button id="to-top">
                <i class="fas fa-arrow-up"></i>
            </button>
            <button id="to-bottom" class="active">
                <i class="fas fa-arrow-down"></i>
            </button>
            <button id="to-right">
                <i class="fas fa-arrow-right"></i>
            </button>
            <button id="to-left">
                <i class="fas fa-arrow-left"></i>
            </button>
            <button id="to-top-right" class="rotate-icon">
                <i class="fas fa-arrow-up"></i>
            </button>
            <button id="to-bottom-left" class="rotate-icon">
                <i class="fas fa-arrow-down"></i>
            </button>
            <button id="to-bottom-right" class="rotate-icon">
                <i class="fas fa-arrow-right"></i>
            </button>
            <button id="to-top-left" class="rotate-icon">
                <i class="fas fa-arrow-left"></i>
            </button>
        </div>
        <button id="submit">Generate</button>
        <div class="output">
            <textarea id="code" rows="2"></textarea>
            <button id="copy">Copy</button>
        </div>
    </div>`;

let colorOne = document.getElementById("color-a") as HTMLInputElement;
let colorTwo = document.getElementById("color-b") as HTMLInputElement;
let outputCode = document.getElementById("code") as HTMLTextAreaElement;
let currentDirection = 'to bottom';

document.querySelectorAll(".buttons button").forEach(button => {
    button.addEventListener('click', event => {
        const target = event.currentTarget as HTMLElement;
        const direction = target.id.replace('to-', '').replace('-', ' ');
        changeActiveElement(target);
        currentDirection = `to ${direction}`;
    });

    function changeActiveElement(element: HTMLElement) {
        let directions = document.querySelectorAll(".buttons button");
        directions.forEach(button => button.classList.remove("active"));
        element.classList.add("active");
    }
});

function generateCode() {
    const backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
    outputCode.value = `background-image: ${backgroundImage}`;
    document.body.style.backgroundImage = backgroundImage;
}

document.getElementById("submit")!.addEventListener('click', generateCode);
document.getElementById("copy")!.addEventListener('click', async () => {
    outputCode.select();
    await navigator.clipboard.writeText(outputCode.value);
});

generateCode();