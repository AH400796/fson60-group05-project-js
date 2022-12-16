import throttle from 'lodash.throttle';

const btnUp = document.querySelector(".scroll-up")
document.addEventListener("scroll", throttle(hideBtn(btnUp), 333));
btnUp.addEventListener("click", goUp);

function hideBtn() {
    if (scrollY > 333) {
        btnUp.style.display = "block";
    } else {
        btnUp.style.display = "none";
    }
    return hideBtn;
}

function goUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}