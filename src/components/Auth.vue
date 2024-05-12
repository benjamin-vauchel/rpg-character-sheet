<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../supabase'
import Button from './Button.vue'

const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="wrapper">
    <h1>RPG Character Sheet</h1>
    <form class="row flex-center flex" @submit.prevent="handleLogin">
      <Button type="submit" >
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
          xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
          <path fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
          </path>
          <path fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
          </path>
          <path fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
          </path>
          <path fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
          </path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
        <span>Log with Google</span>
      </Button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-row-gap: 1rem;
  align-content: center;
  justify-content: center;
}

h1 {
  font-weight: 300;
  font-size: 3rem;
  text-align: center;
}

form {
  text-align: center;
}
/*
button {
  display: grid;  
  grid-template-columns: 1rem auto;
  grid-gap: 1rem;
  border: solid 1px #000;
  border-radius: 1rem;
  padding: 1rem 2rem;
  background: none;
  color: #000;
  cursor: pointer;
  margin: auto;
}*/
:deep(.button) {
  display: inline-block;
  width: auto;
}
:deep(.button svg) {
  max-height: 1rem;
}
:deep(.button .content) {
  grid-template-columns: 1rem auto;
  grid-gap: 1rem;
}
</style>