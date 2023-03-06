<template>
    <form class="max-w-2xl m-auto mt-16" @submit.prevent="submit">
        <div class="mb-6">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input type="text" id="name" v-model="user.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
        </div>
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" v-model="user.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" v-model="user.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                password</label>
            <input type="password" id="passwordConfirm" v-model="user.passwordConfirm"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
        </div>
        <div class="mb-6">
            have an account ? <router-link class="text-cyan-900 dark:text-cyan-600" to="/login">login</router-link>
        </div>
        <button type="submit" :disabled="isLoading"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
    setup() {
        // Get toast interface
        const toast = useToast();
        // Make it available inside methods
        return { toast }
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            isLoading: false,
        }
    },
    methods: {
        submit() {
            this.isLoading = true
            axios.post("http://localhost:5000/register", this.user)
                .then(res => {
                    if (res.status === 200) {
                        const { user } = res.data
                        this.setInStorage(user)
                        window.location.reload()
                    }
                })
                .catch(err => this.toast.error(err.response.data.message))
                .finally(() => this.isLoading = false)
        },
        setInStorage(user) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
}
</script>