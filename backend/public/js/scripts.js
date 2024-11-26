// document.addEventListener("DOMContentLoaded", () => {
//     const role = sessionStorage.getItem("role") || "student"; // Default to student for now
    
//     // Dynamically show CR functionalities
//     if (role === "cr") {
//       document.getElementById("createPost").style.display = "block";
//     }
//   });


  //chats
  document.getElementById("sendChat").addEventListener("click", function() {
    const chatInput = document.getElementById("chatInput");
    const chatBox = document.getElementById("chatBox");
    
    // Get the message content
    const messageContent = chatInput.value.trim();
    
    if (messageContent !== "") {
        // Create a new message element
        const messageElement = document.createElement("div");
        messageElement.classList.add("query", "your-message");
        
        // Add message content
        messageElement.innerHTML = `
            <p><strong>You:</strong> ${messageContent}</p>
            <div class="actions">
                <button class="action-button">
                    <span class="action-icon">👍</span>
                </button>
                <button class="action-button">
                    <span class="action-icon">💬</span> 
                </button>
                <button class="action-button">
                    <span class="action-icon">⭐</span> 
                </button>
                <button class="action-button">
                    <span class="action-icon">📌</span>
                </button>
            </div>
        `;
        
        // Append the message to the chat box
        chatBox.appendChild(messageElement);
        
        // Clear the input field
        chatInput.value = "";
        
        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

particlesJS('particles-js', {
    particles: {
      number: {
        value: 120, // Increase particle count
        density: {
          enable: true,
          value_area: 1000 // Spread them wider
        }
      },
      color: {
        value: "#ffffff" // White particles
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.8, // Make them more opaque
        random: false
      },
      size: {
        value: 5, // Larger particles
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.5, // Visible connections
        width: 1
      },
      move: {
        enable: true,
        speed: 2, // Slower for a relaxed effect
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse" // React on hover
        },
        onclick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        repulse: {
          distance: 100
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
  
