// Sign In
document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const signInData = {
        userName: this.userName.value,
        password: this.password.value,
    };

    try {
        const response = await fetch('http://localhost:6410/api/user/signin', {
            method: 'POST',
            credentials: 'include', // withCredentials yerine kullanılır
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signInData)
        });

        const data = await response.json();
        console.log(`Response -->`, data);

        if (data.isSuccess) {
            window.location.href = '/page/home';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(`Error -->`, error);
    }
});
