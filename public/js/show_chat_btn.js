(
    () =>
    {
        var lawyer_form = document.getElementById("case-details-form");

        var btn = document.createElement("button");
        btn.setAttribute('type', 'submit');
        btn.innerHTML = 'Open Chat';
        lawyer_form.appendChild(btn);
    }
)();