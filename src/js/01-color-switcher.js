const start = document.querySelector("[data-start]");
const end = document.querySelector("[data-stop]");
end.setAttribute("disabled", "");
const body = document.querySelector("body");

const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

let interval = null;

start.addEventListener("click", () => {
    interval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    start.setAttribute("disabled", "");
    end.removeAttribute("disabled");
});

end.addEventListener("click", () => {
    clearInterval(interval);

    start.removeAttribute("disabled");
    end.setAttribute("disabled", "")
});
