async function joinToUnlock(productId, username) {
    try {
      const response = await fetch('http://localhost:3000/api/unlockqueue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, productId: productId })
      });
  
      const data = await response.json();
  
      alert(data.message);
  
      if (data.queueLength !== undefined) {
        const queueElement = document.getElementById('queue-size');
        if (queueElement) {
          queueElement.textContent = `🔥 Current queue size: ${data.queueLength}`;
        }
      }
  
    } catch (err) {
      console.error('Error joining unlock queue:', err);
      alert('Something went wrong. Please try again later.');
    }
  }
  