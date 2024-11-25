document.getElementById("searchStudentForm")
.addEventListener("submit", async (event) => {
    event.preventDefault();
    const rollNo = studentSearchInput.value.trim();
    console.log(rollNo)
    const url = `/student/${rollNo}`
    fetch(url)
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the JSON from the response
    })
    .then(data => {
    console.log('Data received:', data); // Handle the data
    if(data == null)
        alert('No Student by that Roll Number')
    else{
        // Populate the form with fetched student data
        document.getElementById("studentName").value = data.name;
        document.getElementById("studentID").value = data.rollNo;
        document.getElementById("studentGroup").value = data.subgroup
        // Show the update form
        document.getElementById("updateStudentForm").classList.remove("d-none");
    }
    })
    .catch(error => {
    console.error('Error fetching data:', error); // Handle errors
    });
});

// Select the form element
const updateStudentForm = document.getElementById('updateStudentForm');

// Add an event listener for form submission
updateStudentForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form data
  const studentName = document.getElementById('studentName').value;
  const studentID = document.getElementById('studentID').value;
  const studentGroup = document.getElementById('studentGroup').value;

  try {
    // Send POST request using fetch
    const response = await fetch(`/student/${studentID}`, { // Replace with your route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content type
      },
      body: JSON.stringify({
        studentName,
        studentID,
        studentGroup,
      }), // Convert data to JSON string
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Student updated successfully:', responseData);

    // Optionally, show a success message
    alert('Student details updated successfully!');

    // Hide the update form
    updateStudentForm.classList.add('d-none');

    // Optionally clear the form fields
    document.getElementById('studentName').value = '';
    document.getElementById('studentID').value = '';
    document.getElementById('studentGroup').value = '';
  } catch (error) {
    console.error('Error updating student details:', error);
    alert('Failed to update student details. Please try again.');
  }
});

