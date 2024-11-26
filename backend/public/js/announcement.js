const apiPass = "api123"

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const announcementId = button.getAttribute('data-id');
      const confirmed = confirm('Are you sure you want to delete this announcement?');
      if (!confirmed) return;
  
      console.log(announcementId)
      try {
        const response = await fetch(`/api/announcement-delete/${announcementId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body : JSON.stringify({pass : apiPass})
        });
  
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          if(data.status == 0)
          {
            alert(data.message);
            // Optionally, remove the announcement card from the DOM
            console.log(document.getElementById(`#announcement-${announcementId}`))
            // document.querySelector(`#announcement-${announcementId}`)
          }
          else if(data.status == 1)
          {
            alter(data.message)
          }
        } else {
          alert('Failed to delete announcement. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  });
  