const apiPass = 'api123'



//handling query upvotes
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners for both upvote and remove upvote actions
  document.querySelectorAll('.upvote-btn, .upvoted-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const queryId = button.getAttribute('data-id');
      if(!queryId)
      {
        console.log("none")
        return
      }
      const upvoteSpan = document.getElementById(`upvotes-${queryId}`);
      const isUpvoted = button.classList.contains('upvoted-btn');
      const endpoint = isUpvoted ? '/query/removeUpvote' : '/query/upvote'; // Determine the endpoint

      // Send POST request to the server
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: queryId }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (data.status === 0) {
            alert('Action failed. Please try again later.'); // Display alert
          } else {
            // Update the upvote count in the DOM
            upvoteSpan.textContent = `${data.newUpvoteCount} Upvotes`;

            // Toggle button classes and text
            if (isUpvoted) {
              button.classList.remove('upvoted-btn');
              button.classList.add('upvote-btn');
              button.textContent = '▲ Upvote';
            } else {
              button.classList.remove('upvote-btn');
              button.classList.add('upvoted-btn');
              button.textContent = '▲ Upvoted';
            }
          }
        } else {
          console.error('Failed to update the upvote count on the server.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
});

//handling query comments
document.addEventListener('DOMContentLoaded', () => {
  // Toggle comment section visibility
  document.querySelectorAll('.comment-btn').forEach(button => {
    button.addEventListener('click', () => {
      const queryId = button.getAttribute('data-id');
      const commentSection = document.getElementById(`comments-${queryId}`);
      commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
      const url = `/query/comments/${queryId}`;
      const commentList = document.getElementById(`comment-list-${queryId}`)
      //fetching data
      fetch(url)
      .then( response =>{
        if(!response.ok){
          // Create a new child element
          const messageElement = document.createElement("p"); // You can change 'p' to 'div', 'span', etc.

          // Add the text content to the child element
          messageElement.textContent = "Couldn't load comments";

          // Optionally style the message element (if needed)
          messageElement.style.color = "red"; // Example: Set text color
          messageElement.style.fontStyle = "italic"; // Example: Italicize text
          commentList.appendChild(messageElement)
          throw new Error(`HTTP error! status : ${response.status}`)
        }

        const contentType = response.headers.get("Content-Type");
        console.log("Content-Type of response:", contentType);

        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Response is not JSON.");
        }
      })
      .then(data => {
        // console.log(data.comments)
        data.comments.forEach(comment =>{
          const commentItem = document.createElement("li");
          // commentItem.className 
          const authorElement = document.createElement("strong");
          authorElement.innerHTML = comment.postedBy.name
          commentItem.appendChild(authorElement)
          // console.log(commentItem)
          const bodyText = document.createTextNode(`${comment.content.body}`);
          commentItem.appendChild(bodyText);  
          commentList.appendChild(commentItem)
        })
      })
      .catch(error => {
        console.log('Error in fetching data : ', error)
        // Create a new child element
        const messageElement = document.createElement("p"); // You can change 'p' to 'div', 'span', etc.

        // Add the text content to the child element
        messageElement.textContent = "Couldn't load comments";

        // Optionally style the message element (if needed)
        messageElement.style.color = "red"; // Example: Set text color
        messageElement.style.fontStyle = "italic"; // Example: Italicize text
        commentList.appendChild(messageElement)
      })
  });
  });

  // Add new comment functionality
  document.querySelectorAll('.add-comment-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const queryId = button.getAttribute('data-id');
      const commentInput = document.getElementById(`comment-input-${queryId}`);
      const commentText = commentInput.value.trim();
      const commentList = document.querySelector(`#comment-list-${queryId}`);

      if (!commentText) {
        alert('Comment cannot be empty!');
        return;
      }

      try {
        const response = await fetch(`/query/comments/${queryId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: commentText, rollNo: user.rollNo }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          if (data.status === 1) {
            // Append the new comment to the list
            console.log('cleared')
            const newComment = document.createElement('li');
            newComment.innerHTML = `<strong>You:</strong> ${commentText}`;
            commentList.appendChild(newComment);
            commentInput.value = ''; // Clear the input field
          } else if(data.status == 2){
            alert('Failed to add comment. Please try again.');
          }
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
});

document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const queryId = button.getAttribute('data-id');
    const confirmed = confirm('Are you sure you want to delete this query?');
    if (!confirmed) return;

    console.log(queryId)
    try {
      const response = await fetch(`/api/query-delete/${queryId}`, {
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
          // Optionally, remove the query card from the DOM
          document.querySelector(`#comments-${queryId}`).closest('.announcement-query-card').remove();
        }
        else if(data.status == 1)
        {
          alter(data.message)
        }
      } else {
        alert('Failed to delete query. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
});
