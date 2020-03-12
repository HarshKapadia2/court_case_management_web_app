(
    () =>
    {
        var lawyer_form = document.getElementById("lawyer-details-form");

        var btn = document.createElement("button");
        btn.setAttribute('type', 'submit');
        btn.innerHTML = 'View Lawyer Details';
        lawyer_form.appendChild(btn);
    }
)();