document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    const requestData = {
        name: name,
        email: email
    };
    
    fetch('https://api.example.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You have been successfully registered!',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'There was an error with your registration. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error with your registration. Please try again.',
            confirmButtonText: 'OK'
        });
    });
});
