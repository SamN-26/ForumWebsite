const fetchLectureGroupForm = document.getElementById('fetchLecturegroupForm');
const updateCRSection = document.getElementById('updateCRSection');
const currentCRIdInput = document.getElementById('currentCRId');
const newCRIdInput = document.getElementById('newCRId');
const lecturegroupNameInput = document.getElementById('lecturegroupNameInput');
const apiPass = 'api123'

fetchLectureGroupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const lecturegroupName = lecturegroupNameInput.value;
    try {
        // Fetch the CR for the lecturegroup
        const url = `/api/lecturegroup/cr/${lecturegroupName}/${apiPass}`
        // console.log(url)
        const response = await fetch(`/api/lecturegroup/cr/${lecturegroupName}/${apiPass}`, { method: 'GET' });

        if (!response.ok) {
            throw new Error(`Error fetching CR: ${response.statusText}`);
        }

        const data = await response.json();

        // Show the current CR details
        console.log(data)
        if(data.status == 2)
            alert('Lecturegroup Not Found')
        else if(data.status == 0)
            alert('Server Error')
        else 
        {
            if(data.lecturegroup.cr == null)
                currentCRIdInput.value = 'None';
            else 
                currentCRIdInput.value = data.lecturegroup.cr
            updateCRSection.classList.remove('d-none');
            // alert('Subgroup GR fetched successfully!');
        }

    } catch (error) {
        console.error('Error fetching CR:', error);
        alert('Failed to fetch CR. Please try again.');
    }
});

// Update CR Form
const updateCRForm = document.getElementById('updateCRForm');
updateCRForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const newCrId = newCRIdInput.value
    const lecturegroupName = lecturegroupNameInput.value;

    console.log(lecturegroupName)
    console.log(newCrId)

    try {
        // Update the CR for the lecutre group
        const response = await fetch(`/api/lecturegroup/cr/${lecturegroupName}/${apiPass}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({cr: newCrId}),
        }); 

        if (!response.ok) {
            throw new Error(`Error updating CR: ${response.statusText}`);
        }

        const data = await response.json();
        if(data.status == 0)
        {
            console.log('Params not Provided Correctly')
            alert('Input not Provided')
        }
        else if(data.status == 2)
        {
            console.log('Lecture Group not Found')
            alert('Lecture Group Not Found')
        }
        else if(data.status == 3)
        {
            console.log(data.message)
            alert(data.message)
        }
        else{
            alert('CR updated successfully!');
            console.log('Updated CR:', data);

            // Optionally hide the update form after success
            updateCRSection.classList.add('d-none');
            currentCRIdInput.value = '';
            newCRIdInput.value = '';
        }
    } catch (error) {
        console.error('Error updating CR:', error);
        alert('Failed to update CR. Please try again.');
    }
});