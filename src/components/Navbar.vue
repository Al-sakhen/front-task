<template>
    <ul class="space-y-1 text-gray-500 gap-4 p-3  dark:text-gray-400 flex items-center justify-center">
        <li>
            <router-link to="/">Home</router-link>
        </li>
        <li v-if="!isAuth">
            <router-link to="/login">Sign in</router-link>
        </li>
        <li v-if="isAuth">
            <router-link to="/create_product">Create Product</router-link>
        </li>
        <li v-if="isAuth">
            <button @click="logout" type="button"
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm p-1 text-center">Logout</button>

        </li>
    </ul>
</template>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            isAuth: false
        }
    },
    methods: {
        logout() {
            // remove user from local storage
            
            localStorage.removeItem('user');
            axios.get("http://localhost:5000/logout")
            .then(res => console.log(res))
            // reload page
            window.location.reload();
        }
    },
    mounted() {
        this.isAuth = localStorage.getItem('user') ? true : false
    }
}
</script>