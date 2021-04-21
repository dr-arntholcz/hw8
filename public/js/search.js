Vue.component('search', {

    methods: {
        filterGoods() {
            event.preventDefault();
            if (this.$root.searchLine !== '') {
                console.log(this.$root.searchLine);
                let regexp = new RegExp(this.$root.searchLine, 'i');
                this.filtered = this.$root.products.filter(el => regexp.test(el.title));
                console.log(this.$root.filtered);
                this.$root.currentList = this.filtered;
            } else {
                this.$root.currentList = this.$root.products;
            }
        },
    },
    template: `<div></div>`,
});