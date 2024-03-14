const reviewBtn = document.getElementById("submit-button");
const reviewForm = document.forms.reviewForm;

reviewBtn?.addEventListener("click", function() {
    console.log("click");

    const data = new FormData(reviewForm);
    data = Object.fromEntries(data);
    console.log(data);
});