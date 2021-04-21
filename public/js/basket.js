Vue.component('basket', {

    methods: {
        addProduct(product) {
            let find = this.$parent.basketList.find(el => el.id === product.id);
            if (find) {
                find.quantity++;
                this.$parent.putJson(`/api/cart/${find.id}`, { quantity: find.quantity });
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.$parent.basketList.push(prod);
                        }
                    });
            }
        },
        remove(product) {

            let find = this.$parent.basketList.find(el => el.id === product.id);
            if (find && product.quantity > 1) {
                product.quantity--;
                this.$parent.putJson(`/api/cart/${product.id}`, { quantity: product.quantity });
            } else {
                this.$parent.deleteJson(`/api/cart/${product.id}`)
                    .then(data => this.$parent.basketList.splice(this.$parent.basketList.indexOf(product), 1))
            }
        },
        changeQuantity(product) {
            //product.quantity
            if (product.quantity >= 1) { this.$parent.putJson(`/api/cart/${product.id}`, { quantity: product.quantity }) }
        },
        viewBasket() {
            if (this.$root.basketList.length === 0 && this.$root.openBasket === false) {
                alert("Вы не выбрали ни одного товара");
            };
            if (this.$root.basketList.length !== 0 && !this.$root.openBasket) {
                this.$root.currentList = this.$root.basketList;
                this.$root.openBasket = true;
            } else {
                this.$root.currentList = this.$root.products;
                this.$root.openBasket = false;
            };
        },
        toOrder() {
            alert("This link to order");
        },
    },
    template: `
    <header>
        <div class="wrapper">
                <div class="logo">Интернет-магазин<br>
                    <h4 v-show="$root.openBasket">Корзина</h4>
                </div>
            <div class="wrap">
            <p class="summaProducts" v-show="$root.openBasket">Итого: {{$root.summaBasket}}р.</p>
            </div>
            <div class="cart">
                <form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="$root.searchLine" v-on:keyup.enter="$root.$refs.search.filterGoods()">
                    <button class="btn-search" type="submit" @click="$root.$refs.search.filterGoods()">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                <button class="btn-cart" type="button" v-on:click="$root.$refs.basket.viewBasket()">Корзина</button>
                <!--////////////////////////////////////////////////////////////////////////////////////////////////////-->

            <div class="cart-block" >
                <p  v-if="!$root.basketList.length">Корзина пуста</p><!-- v-if="!$root.basketList.length"   v-show="showCart"  -->
                    <div class="cart-item"
                        v-for="product of $root.basketList" 
                        :key="product.id"
                        :cart-item="product" 
                        :img="product.imgSrc"
                        @remove="$root.$refs.basket.remove(product)"
                    >
                        <div class="product-bio">
                            <img src="https://placehold.it/50x100" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">{{product.title}}</p>
                                    <p class="product-quantity">Количество: {{product.quantity}}</p>
                                    <p class="product-single-price">{{product.price}}₽ за единицу</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">{{product.price*product.quantity}}₽</p>
                                <button class="del-btn" @click="$root.$refs.basket.remove(product)">×</button>
                            </div>
                        </div>
                    </div>
            </div>
               <!-- //////////////////////////////////////////////////////////////////////////////////////////////////-->
            </div>
        </div>
    </header>
`,
});