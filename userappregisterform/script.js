document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const profile = {
        first_name: name,
        email: email
    };

    const data = {
        email,
        profile,
    };

    const ENCRYPTION_SECRET_KEY = 'o~HR\xe72\xb4\xa4\xe9\xc4R&-`\xb0om\xca\xa5\x0494\xc7\xed\xce8/"V\xa0\xfcG';
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_SECRET_KEY).toString();

    fetch('http://demo3932735.mockable.io/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: encryptedData })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Se ha registrado exitosamente.'
        });

        emailjs.send('service_xyintba', 'template_vhsxwgl', {
            email: email,
            name: name
        })
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
        }, function(error) {
            console.error('Failed to send email:', error);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema con el registro. Inténtalo nuevamente.'
        });
    });
});
