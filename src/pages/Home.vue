<template>
    <div class="container bg-re">
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <skeleton-card v-for="(_, idx) in 10" :key="idx" />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <single-product v-for="(product, idx) in products" :key="idx" :product="product"
                @deleteAnProduct="deleteAnProduct($event)" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SingleProduct from '../components/SingleProduct.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import { useToast } from 'vue-toastification'

export default {
    components: { SingleProduct, SkeletonCard },
    setup() {
        // Get toast interface
        const toast = useToast();
        // Make it available inside methods
        return { toast }
    },
    data() {
        return {
            isLoading: false,
            products: []
        }
    },
    methods: {
        deleteAnProduct(id) {
            axios.delete(`http://localhost:5000/products/delete/${id}`)
                .then(res => {
                    this.toast.success(res.data.message)
                }).then(()=> {
                    this.products = this.products.filter(p => p.id !== id)
                })

        },
    },
    created() {
        this.isLoading = true
        axios.get('http://localhost:5000/products')
            .then(res => { this.products = res.data.products })
            .catch(err => { console.log(err) })
            .finally(() => this.isLoading = false)
    }
}

</script>