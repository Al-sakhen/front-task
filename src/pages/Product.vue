<template>
    <skeleton-card v-if="isLoading"></skeleton-card>
    <div v-else
        class="block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ product.title }}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{{ product.description }}</p>

        <span
            class="bg-green-100 mt-4 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{{
                product.price }} $</span>

    </div>
</template>

<script>
import axios from 'axios'
import SkeletonCard from '../components/SkeletonCard.vue'


export default {
    components: { SkeletonCard },

    data() {
        return {
            product: {},
            isLoading: false
        }
    },
    created() {
        const { id } = this.$route.params
        this.isLoading = true
        axios.get(`http://localhost:5000/products/${id}`)
            .then(res => { this.product = res.data.product, console.log(res) })
            .finally(() => this.isLoading = false)
    }
}
</script>