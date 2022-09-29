//grab dom elements, seedColor, schemeMode, form
//add submit event listener to form
//create global fetch and trigger fetch

const form = document.getElementById('form');
const colorPicker = document.getElementById('colorPicker');
const modePicker = document.getElementById('modePicker');
const colorScheme = document.getElementById('colorScheme');

let html = '';

const copyColorAndCodes = () => {
    const displayedColor = document.querySelectorAll('.color');
    const displayedColorCodes = document.querySelectorAll('.color-code');

    displayedColor.forEach((e) => {
        e.addEventListener('click', () => {
            navigator.clipboard.writeText(e.style.backgroundColor);
        });
    });

    displayedColorCodes.forEach((e) => {
        e.addEventListener('click', () => {
            navigator.clipboard.writeText(e.textContent);
        });
    });
};

const getColorScheme = () => {
    let seedColor = colorPicker.value.replace('#', '');
    let schemeMode = modePicker.value;

    fetch(
        `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}`
    )
        .then((res) => res.json())
        .then((data) => {
            let colors = '';
            data.colors.forEach((e) => {
                colors += `
                <div class="bg-color">
                    <div class="color" style="background-color:${e.hex.value}"></div>
                    <p class="color-code">${e.hex.value}</p>
                </div>
            `;
            });

            html = colors;

            colorScheme.innerHTML = html;

            copyColorAndCodes();
        });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getColorScheme();
});
