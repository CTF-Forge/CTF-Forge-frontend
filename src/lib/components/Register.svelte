<script>
  let username = '';
  let email = '';
  let password = '';
  let errorMessage = '';
  let successMessage = '';

  async function handleRegister() {
    errorMessage = '';
    successMessage = '';
    try {
      const response = await fetch('https://ctf-forge-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        successMessage = 'Registration successful! You can now log in.';
      } else {
        const errorData = await response.json();
        errorMessage = errorData.error || 'Registration failed';
      }
    } catch (error) {
      errorMessage = 'An error occurred during registration.';
    }
  }
</script>

<div class="register-container">
  <h2>Register</h2>
  <form on:submit|preventDefault={handleRegister}>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" bind:value={username} required>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} required>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password} required>
    </div>
    <button type="submit">Register</button>
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
    {#if successMessage}
      <p class="success">{successMessage}</p>
    {/if}
  </form>
</div>

<style>
  .register-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  .success {
    color: green;
    margin-top: 1rem;
  }
</style>
