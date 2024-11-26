document.getElementById('fetchSubgroupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get subgroup name from input
    const lecturegroup = document.getElementById('subgroupNameInput').value;

    // Fetch students data from the server
    try {
        const response = await fetch(`/admin/get-subgroup/${lecturegroup}`);
        const data = await response.json();

        // Check if subgroup exists
        console.log(data)
        if (response.ok && data.groups.length > 0) {
            // Populate student list
            const studentsList = document.getElementById('studentsList');
            studentsList.innerHTML = ''; // Clear existing list
            if(!data.groups);
            else {
                data.groups.forEach(group => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = `${group}`;
                studentsList.appendChild(listItem);
                });
            }
            // Show the students list section
            document.getElementById('subgroupDetailsSection').classList.remove('d-none');
        } else {
            alert('No subgroups found for the specified lecture group.');
        }
    } catch (error) {
        console.error('Error fetching subgroup details:', error);
        alert('An error occurred while fetching the subgroup details. Please try again.');
    }
});


