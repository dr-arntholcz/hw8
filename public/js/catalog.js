Vue.component('catalog', {

    template: `<div class="catalog" id="cat">
    
    <main>
    <div class="products center" v-show="!$root.openBasket">
        <div class="product-item itemProduct" v-for="product of $root.currentList" :key="product.id">
            <div class="itemProductImgWrap">
                <img class="itemProductImg" :src="product.imgSrc" alt="Some img">
            </div>
            <div class="descCatalog">
                <h3>{{product.title}}</h3>
                <p>{{product.price}}₽</p>
                <button class="buy-btn" @click="$root.$refs.basket.addProduct(product)">Купить</button>
            </div>
        </div>
    </div>
    <div class="productsBasket center" v-show="$root.openBasket">
        <div class="product-item itemBasket" v-for="product of $root.currentList" :key="product.id">
                <div class="itemBasketImgWrap">
                     <img class="itemBasketImg" :src="product.imgSrc" alt="Some img">
                </div>  
            <div class="descBasket">
                <h3 class="descNameProduct">{{product.title}}</h3>
                <p>Кол-во<br><input v-model.number="product.quantity" type="number" class="itemBasketInput" min="1" max="999" v-on:input="$root.$refs.basket.changeQuantity(product)"></p>
                <p>{{product.price*product.quantity}}₽</p>
                <button class="buy-btn" @click="$root.$refs.basket.remove(product)">Удалить</button>
                <!-- -->
            </div>
            <div class="info">
            <p>{{product.description}}</p>
            </div>
        </div>
        <div class="blankOrder">
                <button class="buy-btn" @click="$root.$refs.basket.toOrder">Заказать</button>
                </div>
    </div>
</main>
    
    </div>`,
}, );