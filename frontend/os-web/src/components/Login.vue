
<script setup>
import { ref } from 'vue'
import api from '../services/api'

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })

    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    alert('Login realizado com sucesso')
    // depois vamos redirecionar para dashboard
  } catch (err) {
    error.value = 'Email ou senha inválidos'
  }
}
</script>


<template>
  <div class="login-container">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <input
        type="email"
        placeholder="Email"
        v-model="email"
        required
      />

      <input
        type="password"
        placeholder="Senha"
        v-model="password"
        required
      />

      <button type="submit">Entrar</button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 8px;
}

button {
  padding: 8px;
}

.error {
  color: red;
}
</style>
