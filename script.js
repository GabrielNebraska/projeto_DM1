const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const cart = ref(0); // Contador de itens no carrinho
        const cartItems = ref(JSON.parse(localStorage.getItem("cart")) || []); // Itens do carrinho

        // Função para adicionar um produto ao carrinho
        const addToCart = (product) => {
            const existingItem = cartItems.value.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1; // Incrementa a quantidade se o item já estiver no carrinho
            } else {
                cartItems.value.push({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                });
            }

            cart.value += 1; // Incrementa o contador de itens no carrinho
            localStorage.setItem("cart", JSON.stringify(cartItems.value)); // Atualiza o localStorage
        };

        // Função para remover um produto do carrinho
        const removeFromCart = (id) => {
            const itemIndex = cartItems.value.findIndex((item) => item.id === id);

            if (itemIndex !== -1) {
                cart.value -= cartItems.value[itemIndex].quantity; // Decrementa o contador de itens
                cartItems.value.splice(itemIndex, 1); // Remove o item do carrinho
                localStorage.setItem("cart", JSON.stringify(cartItems.value)); // Atualiza o localStorage
            }
        };

        // Lista de produtos
        const products = ref([
            {
                id: 1,
                title: "Boné do chaves",
                image: "assets/images/bonechaves.jpeg",
                inStock: 0,
                price: "R$150,00",
            },
            {
                id: 2,
                title: "Boneco Chaves",
                image: "assets/images/boneco_chaves.webp",
                inStock: 0,
                price: "R$120,00",
            },
            {
                id: 3,
                title: "Chaves no Barril",
                image: "assets/images/bonecochavesbarriu.webp",
                inStock: 30,
                price: "R$230,00",
            },
            {
                id: 4,
                title: "Boneco Chaves",
                image: "assets/images/boneco_chaves1.webp",
                inStock: 2,
                price: "R$190,00",
            },
            {
                id: 5,
                title: "Boné do Seu Madruga",
                image: "assets/images/boneseumadruga.jpeg",
                inStock: 30,
                price: "R$160,00",
            },
            {
                id: 6,
                title: "Boneco Kiko",
                image: "assets/images/kikoboneco.jpeg",
                inStock: 3,
                price: "R$200,00",
            },
            {
                id: 7,
                title: "Funko NhoNho",
                image: "assets/images/nhonhofunko.jpeg",
                inStock: 10,
                price: "R$190,00",
            },
            {
                id: 8,
                title: "Boneco Seu Barriga",
                image: "assets/images/seubarrigaboneco.jpeg",
                inStock: 0,
                price: "R$180,00",
            },
            {
                id: 9,
                title: "Boneco Seu Madruga",
                image: "assets/images/seumadrugaboneco.jpeg",
                inStock: 0,
                price: "R$250,00",
            },
            {
                id: 10,
                title: "Camisa Seu Madruga",
                image: "assets/images/camisaMadruga.webp",
                inStock: 0,
                price: "R$150,00",
            },
            {
                id: 11,
                title: "Boneco Chapolin Colorado",
                image: "assets/images/chapolin_boneco.jpeg",
                inStock: 7,
                price: "R$170,00",
            },
            {
                id: 12,
                title: "Boneca Dona Florinda",
                image: "assets/images/boneca_florinda.jpeg",
                inStock: 20,
                price: "R$50,00",
            },
        ]);

        // Controle do carrossel
        const currentIndex = ref(0);
        const itemsPerSlide = 4;

        const visibleProducts = computed(() => {
            return products.value.slice(currentIndex.value, currentIndex.value + itemsPerSlide);
        });

        const nextSlide = () => {
            if (currentIndex.value + itemsPerSlide < products.value.length) {
                currentIndex.value += itemsPerSlide; // Avança um grupo de produtos por vez
            }
        };

        const prevSlide = () => {
            if (currentIndex.value > 0) {
                currentIndex.value -= itemsPerSlide; // Retrocede um grupo de produtos por vez
            }
        };

        return {
            cart,
            cartItems,
            addToCart,
            removeFromCart,
            products,
            visibleProducts,
            nextSlide,
            prevSlide,
        };
    }
}).mount('#app');