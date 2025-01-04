
document.getElementById("fetchButton").addEventListener("click", () => {
    const handle = document.getElementById("handle").value.trim();
    const userInfoDiv = document.getElementById("userInfo");

    // Clear previous results
    userInfoDiv.innerHTML = "";

    if (!handle) {
        userInfoDiv.innerHTML = "<p>Please enter a handle.</p>";
        return;
    }

    const url = `https://codeforces.com/api/user.info?handles=${handle}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "OK") {
                const user = data.result[0];
                userInfoDiv.innerHTML = `
                    <h3>User Info</h3>
                    <p><strong>Handle:</strong> ${user.handle}</p>
                    <p><strong>Rank:</strong> ${user.rank}</p>
                    <p><strong>Rating:</strong> ${user.rating}</p>
                    <p><strong>Max Rank:</strong> ${user.maxRank}</p>
                    <p><strong>Max Rating:</strong> ${user.maxRating}</p>
                `;
            } else {
                userInfoDiv.innerHTML = `<p>Error: ${data.comment}</p>`;
            }
        })
        .catch((error) => {
            userInfoDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
});
