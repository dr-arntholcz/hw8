// const API = 'https://raw.githubusercontent.com/dr-arntholcz/online-store-api/master/responses';
const API = 'http://localhost:8080';

const app = new Vue({
    el: '#app',
    data: {
        // catalogUrl: '/listProducts.json',
        catalogUrl: '/api/products',
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        products: [],
        basketList: [],
        openBasket: false,
        currentList: [],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                // .catch(error => {
                //     this.$refs.error.setError(error);
                // });
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                // .catch(error => {
                //     this.$refs.error.setError(error);
                // });
        },
        deleteJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                // .catch(error => {
                //     this.$refs.error.setError(error);
                // });
        },
    },
    computed: {
        summaBasket() {
            let summaProducts = 0;
            this.basketList.forEach(element => {
                summaProducts += element.price * element.quantity;
            });
            return summaProducts;
        },

    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        this.getJson(`${this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.currentList = this.products;
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('beforeDestroy');
    }
});