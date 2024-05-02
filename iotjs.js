document.addEventListener("DOMContentLoaded", function () {
    const updateInterval = 2000; // Update every 15 seconds

    function fetchData() {
        const channelID = "2511886"; // Replace with your actual Channel ID
        const apiKey = "OM7UYR2SPYNH2CDN"; // Replace with your Read API Key
        const url = `https://api.thingspeak.com/channels/${channelID}/feeds/last.json?api_key=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const turbidity = data.field1; // Assuming temperature is in field1
                var status_value = "Free Release";
                if (turbidity > 55) {
                    status_value = "Main Water Tank";
                }
                else if ((turbidity <= 55) && (turbidity > 30)){
                    status_value = "Rain Water Tank";
                }
                else {
                    status_value="Free Release"
                }
                document.getElementById('status').textContent = status_value;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('status').textContent = 'turbidity';
            });
    }

    fetchData();
    setInterval(fetchData, updateInterval); // Re-fetch data at the specified interval
});
