// Fetch Subgroup GR Form
const fetchSubgroupForm = document.getElementById('fetchSubgroupForm');
const updateGRSection = document.getElementById('updateGRSection');
const currentGRIdInput = document.getElementById('currentGRId');
const newGRIdInput = document.getElementById('newGRId');
const subgroupNameInput = document.getElementById('subgroupNameInput');
const apiPass = 'api123'

fetchSubgroupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const subgroupName = subgroupNameInput.value;
    try {
        // Fetch the GR for the subgroup
        const url = `/api/subgroup/gr/${subgroupName}/${apiPass}`
        // console.log(url)
        const response = await fetch(`/api/subgroup/gr/${subgroupName}/${apiPass}`, { method: 'GET' });

        if (!response.ok) {
            throw new Error(`Error fetching GR: ${response.statusText}`);
        }

        const data = await response.json();

        // Show the current GR details
        console.log(data)
        if(data.status == 2)
            alert('Subgroup Not Found')
        else if(data.status == 0)
            alert('Server Error')
        else 
        {
            if(data.subgroup.gr == null)
                currentGRIdInput.value = 'None';
            else 
                currentGRIdInput.value = data.subgroup.gr
            updateGRSection.classList.remove('d-none');
            // alert('Subgroup GR fetched successfully!');
        }

    } catch (error) {
        console.error('Error fetching GR:', error);
        alert('Failed to fetch GR. Please try again.');
    }
});

// Update GR Form
const updateGRForm = document.getElementById('updateGRForm');
updateGRForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const newGrId = newGRIdInput.value
    const subgroupName = subgroupNameInput.value;

    console.log(subgroupName)
    console.log(newGrId)

    try {
        // Update the GR for the subgroup
        const response = await fetch(`/api/subgroup/gr/${subgroupName}/${apiPass}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({gr: newGrId}),
        }); 

        if (!response.ok) {
            throw new Error(`Error updating GR: ${response.statusText}`);
        }

        const data = await response.json();
        if(data.status == 0)
        {
            console.log('Params not Provided Correctly')
            alert('Input not Provided')
        }
        else if(data.status == 2)
        {
            console.log('Subgroup not Found')
            alert('Subgroup Not Found')
        }
        else if(data.status == 3)
        {
            console.log(data.message)
            alert(data.message)
        }
        else{
            alert('GR updated successfully!');
            console.log('Updated GR:', data);

            // Optionally hide the update form after success
            updateGRSection.classList.add('d-none');
            currentGRIdInput.value = '';
            newGRIdInput.value = '';
        }
    } catch (error) {
        console.error('Error updating GR:', error);
        alert('Failed to update GR. Please try again.');
    }
});