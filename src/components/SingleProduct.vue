<template>
    <div class="border border-indigo-400 p-3 rounded-lg">
        <router-link :to="`product/${product.id}`" class="flex flex-col items-center ">
            <h1 class="text-lg">{{ product.title }}</h1>
            <h1 class="text-base">{{ product.description }}</h1>
            <span
                class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 w-fit">{{
                    product.price }} $</span>
        </router-link>
        <div class="flex gap-4 mt-3 items-center justify-center" v-if="product.user_id === userId">
            <router-link class="bg-cyan-500 p-1 rounded-lg text-sm" :to="`/edit_product/${product.id}`">Edit</router-link>
            <span @click="deleteProduct(product.id)"
                class="bg-red-500 p-1 rounded-lg text-sm hover:cursor-pointer">Delete</span>
        </div>
    </div>
</template>


<script>
export default {
    props: ["product"],
    emits: [],

    data() {
        return {
            userId: null
        }
    },
    methods: {
        deleteProduct(id) {
            this.$emit('deleteAnProduct' , id)
        }
    },
    created() {
        // get user id from storage
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.userId = user.id ?? null;
        }
    }
}
</script>