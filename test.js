const response = await fetch("http://localhost:3000/employees", {
    method: "POST",
    body: {
        name: "Test"
    }
});

console.log(await response.text());