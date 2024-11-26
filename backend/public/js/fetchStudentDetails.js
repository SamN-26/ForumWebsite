document.getElementById('fetchSubgroupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get subgroup name from input
    const subgroup = document.getElementById('subgroupNameInput').value;

    // Fetch students data from the server
    try {
        const response = await fetch(`/admin/get-student/${subgroup}`);
        const data = await response.json();

        // Check if subgroup exists
        console.log(data)
        if (response.ok && data.students.length > 0) {
            // Populate student list
            const studentsList = document.getElementById('studentsList');
            studentsList.innerHTML = ''; // Clear existing list
            if(!data.students);
            else {
                data.students.forEach(student => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = `${student.name} (Roll Number : ${student.rollNo})`;
                studentsList.appendChild(listItem);
                });
            }
            // Show the students list section
            document.getElementById('subgroupDetailsSection').classList.remove('d-none');
        } else {
            alert('No students found for the specified subgroup.');
        }
    } catch (error) {
        console.error('Error fetching Students details:', error);
        alert('An error occurred while fetching the student details. Please try again.');
    }
});
