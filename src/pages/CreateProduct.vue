<template>
    <form class="max-w-2xl m-auto mt-16" @submit.prevent="onSubmit">
        <div class="mb-6">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product title</label>
            <input type="text" id="title" v-model="product.title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
        </div>
        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                description</label>
            <input type="text" id="description" v-model="product.description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
        </div>
        <div class="mb-6">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                price</label>
            <input type="text" id="price" v-model="product.price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
        </div>
        <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
</template>


<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
export default {
    setup() {
        // Get toast interface
        const toast = useToast();
        // Make it available inside methods
        return { toast }
    },
    data() {
        return {
            product: {
                title: '',
                description: '',
                price: '',
                user_id: ''
            }
        }
    },
    methods: {
        onSubmit() {
            axios.post("http://localhost:5000/products/create", this.product)
                .then(res => {
                    if (res.status === 200) {
                        this.toast.success(res.data.message)
                        this.clearInputs()
                        this.$router.push({name: 'home'})
                    }
                })
                .catch(err => { console.log(err) })
        },
        clearInputs() {
            this.product.title = '';
            this.product.description = '';
            this.product.price = '';
            this.product.user_id = '';
        }
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.product.user_id = user.id;
    }
}
</script>