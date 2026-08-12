import { Product } from "@/types/product";

const images = {
  burger: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=85",
  baconBurger: "https://s3.us-west-2.amazonaws.com/whatsmenu/production/lacasaburguer/products/154627/professorjpeg",
  misto: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/misto_quente.jpg",
  xSalada: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  calabresa: "https://ericos-burguer.allpedidos.com.br/_core/_uploads/208/2025/06/2324300625bd996aji3g.jpeg",
  egg: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/burger_patty_with_cheese_and_egg.jpg",
  coalho: "https://www.arise-app.com/images/dishes/pt/hamburguer-com-queijo-coalho-1jcdyi.webp",
  hotDog: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=900&q=80",
  coxinha: "https://static.wixstatic.com/media/f4cc2f_b553bfe127894fd7af9cb7867ee512bb~mv2.png/v1/fill/w_560%2Ch_560%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_auto/f4cc2f_b553bfe127894fd7af9cb7867ee512bb~mv2.png",
  pastel: "/images/produtos/salgados.png",
  acai: "https://cdn.shopify.com/s/files/1/0902/1640/files/image7.jpg?v=1526681375",
  skewer: "https://zfvkevygqjxrepkdfqte.supabase.co/storage/v1/object/public/product-photos/products/ai-bafd1b4d-8cf0-43f8-8087-a2f96dda1c84.png",
  garlicBread: "https://zfvkevygqjxrepkdfqte.supabase.co/storage/v1/object/public/product-photos/products/ai-bafd1b4d-8cf0-43f8-8087-a2f96dda1c84.png",
  juice: "https://www.saudevitalidade.com/wp-content/uploads/2023/10/suco.jpg",
  orangeJuice: "https://veja.abril.com.br/wp-content/uploads/2024/02/suco-laranja.jpg?crop=1&resize=1212%2C909",
  guaranaAmazonas: "/images/mikael/guarana-amazonas.png",
  sodaCan: "https://img.ahazou.com/platform-users/620661542bfc1200013dc02e/catalogs/catalog-banner-6bbee359-d3ca-4402-af0a-767241a4dcd3.jpeg",
  h2o: "https://tdc01z.vteximg.com.br/arquivos/ids/156453-1000-1000/8408-refri-h2oh-limoneto-pet-500ml.png?v=637897713185900000",
  beer: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=900&q=85",
  beerBottle: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&w=900&q=85",
  alcatrao: "/images/mikael/alcatrao.png"
};

const artesanalOption = {
  id: "hamburguer-artesanal",
  name: "Hamburguer artesanal",
  type: "single" as const,
  options: [
    { id: "nao", name: "Sem hamburguer artesanal", default: true },
    { id: "sim", name: "Adicionar/trocar por hamburguer artesanal", priceDelta: 7.2 }
  ]
};

const salgadoFlavor = (id: string, options: string[]) => ({
  id,
  name: "Escolha o sabor",
  type: "single" as const,
  required: true,
  options: options.map((name, index) => ({
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    default: index === 0
  }))
});

const acaiCompanions = (maxSelections: number) => ({
  id: "acompanhamentos",
  name: `Escolha ate ${maxSelections} acompanhamentos`,
  type: "multiple" as const,
  maxSelections,
  options: [
    "Leite em po",
    "Creme de amendoim",
    "Granola",
    "Chocoball",
    "Sucrilhos",
    "Jujuba",
    "Pacoca"
  ].map((name) => ({ id: name.toLowerCase().replaceAll(" ", "-"), name }))
});

const acaiCover = {
  id: "cobertura",
  name: "Escolha a cobertura",
  type: "single" as const,
  required: true,
  options: [
    { id: "leite-condensado", name: "Leite condensado", default: true },
    { id: "morango", name: "Morango" },
    { id: "chocolate", name: "Chocolate" }
  ]
};

export const products: Product[] = [
  {
    id: "hamburguer",
    categoryId: "sanduiches",
    name: "Hamburguer",
    description: "Pao bola, hamburguer, salada, cheddar e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Salada", "Cheddar", "Barbecue"],
    price: 9.25,
    image: images.burger
  },
  {
    id: "misto-quente",
    categoryId: "sanduiches",
    name: "Misto Quente",
    description: "Pao de caixa, queijo e presunto na chapa.",
    ingredients: ["Pao de caixa", "Queijo", "Presunto"],
    price: 9.25,
    image: images.misto
  },
  {
    id: "x-salada",
    categoryId: "sanduiches",
    name: "X-Salada",
    description: "Pao de caixa, salada, queijo e presunto na chapa.",
    ingredients: ["Pao de caixa", "Salada", "Queijo", "Presunto"],
    price: 10.8,
    image: images.xSalada
  },
  {
    id: "x-burguer",
    categoryId: "sanduiches",
    name: "X-Burguer",
    description: "Pao bola, hamburguer, queijo, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Queijo", "Presunto", "Salada", "Barbecue"],
    price: 15.4,
    image: images.burger
  },
  {
    id: "x-calabresa",
    categoryId: "sanduiches",
    name: "X-Calabresa",
    description: "Pao bola, hamburguer, calabresa, queijo, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Calabresa", "Queijo", "Presunto", "Salada", "Barbecue"],
    price: 18.9,
    image: images.calabresa
  },
  {
    id: "x-bacon",
    categoryId: "sanduiches",
    name: "X-Bacon",
    description: "Pao bola, hamburguer, bacon, queijo, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Bacon", "Queijo", "Presunto", "Salada", "Barbecue"],
    price: 18.9,
    image: images.baconBurger,
    featured: true
  },
  {
    id: "x-egg",
    categoryId: "x-egg",
    name: "X-Egg",
    description: "Pao bola, hamburguer, ovo, queijo, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Ovo", "Queijo", "Presunto", "Salada", "Barbecue"],
    price: 18.9,
    image: images.egg
  },
  {
    id: "x-egg-dog",
    categoryId: "x-egg",
    name: "X-Egg Dog",
    description: "Pao bola, hamburguer, ovo, salsicha, queijo, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Ovo", "Salsicha", "Queijo", "Presunto", "Salada", "Barbecue"],
    price: 19.9,
    image: images.egg
  },
  {
    id: "x-egg-calabresa",
    categoryId: "x-egg",
    name: "X-Egg Calabresa",
    description: "Pao bola, hamburguer, ovo, calabresa, queijo, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Ovo", "Calabresa", "Queijo", "Presunto", "Salada", "Barbecue"],
    price: 19.9,
    image: images.calabresa
  },
  {
    id: "x-egg-bacon",
    categoryId: "x-egg",
    name: "X-Egg Bacon",
    description: "Pao bola, hamburguer, ovo, bacon, queijo, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Ovo", "Bacon", "Queijo", "Presunto", "Salada", "Barbecue"],
    price: 19.9,
    image: images.baconBurger,
    featured: true
  },
  {
    id: "x-coalho",
    categoryId: "sanduiches-especiais",
    name: "X-Coalho",
    description: "Pao bola, hamburguer, queijo coalho, presunto, salada e barbecue.",
    ingredients: ["Pao bola", "Hamburguer", "Queijo coalho", "Presunto", "Salada", "Barbecue"],
    price: 19.9,
    image: images.coalho,
    optionGroups: [artesanalOption]
  },
  {
    id: "x-tudo",
    categoryId: "sanduiches-especiais",
    name: "X-Tudo",
    description: "Pao bola grande, hamburguer, ovo, queijo, presunto, bacon, salsicha, calabresa, salada e barbecue.",
    ingredients: ["Pao bola grande", "Hamburguer", "Ovo", "Queijo", "Presunto", "Bacon", "Salsicha", "Calabresa", "Salada", "Barbecue"],
    price: 24.9,
    image: images.burger,
    optionGroups: [artesanalOption],
    featured: true
  },
  {
    id: "x-mikael",
    categoryId: "sanduiches-especiais",
    name: "X-Mikael",
    description: "Pao bola grande, duas carnes de hamburguer, ovo, queijo, presunto, bacon, salsicha, calabresa, milho, ervilha, salada e barbecue.",
    ingredients: ["Pao bola grande", "2 hamburgueres", "Ovo", "Queijo", "Presunto", "Bacon", "Salsicha", "Calabresa", "Milho", "Ervilha", "Salada", "Barbecue"],
    price: 30.9,
    image: images.burger,
    optionGroups: [artesanalOption],
    featured: true
  },
  {
    id: "cachorro-quente",
    categoryId: "cachorro-quente",
    name: "Cachorro Quente",
    description: "Pao, salsicha, carne moida, tomate, cebola, milho, ervilha, batata palha, ketchup, maionese, cheddar e queijo ralado.",
    ingredients: ["Pao", "Salsicha", "Carne moida", "Tomate", "Cebola", "Milho", "Ervilha", "Batata palha", "Ketchup", "Maionese", "Cheddar", "Queijo ralado"],
    price: 10.8,
    image: images.hotDog,
    featured: true
  },
  {
    id: "enroladinho-salsicha",
    categoryId: "salgados",
    name: "Enroladinho de Salsicha",
    description: "Enroladinho de salsicha.",
    ingredients: ["Salsicha", "Massa"],
    price: 6.15,
    image: images.pastel
  },
  {
    id: "coxinha-frango",
    categoryId: "salgados",
    name: "Coxinha de Frango",
    description: "Coxinha de frango.",
    ingredients: ["Frango", "Massa"],
    price: 6.15,
    image: images.coxinha
  },
  {
    id: "coxinha-frango-catupiry",
    categoryId: "salgados",
    name: "Coxinha de Frango com Catupiry",
    description: "Coxinha de frango com catupiry.",
    ingredients: ["Frango", "Catupiry", "Massa"],
    price: 6.15,
    image: images.coxinha
  },
  {
    id: "coxinha-charque",
    categoryId: "salgados",
    name: "Coxinha de Charque",
    description: "Coxinha de charque.",
    ingredients: ["Charque", "Massa"],
    price: 7.7,
    image: images.coxinha
  },
  {
    id: "pastel-forno",
    categoryId: "salgados",
    name: "Pastel de Forno",
    description: "Pastel de forno com escolha de frango ou queijo.",
    ingredients: ["Massa de forno", "Recheio a escolher"],
    price: 7.7,
    image: images.pastel,
    optionGroups: [salgadoFlavor("sabor-pastel", ["Frango", "Queijo"])]
  },
  {
    id: "pao-forno",
    categoryId: "salgados",
    name: "Pao de Forno",
    description: "Pao de forno com escolha de pizza ou frango com catupiry.",
    ingredients: ["Massa", "Recheio a escolher"],
    price: 7.7,
    image: images.pastel,
    optionGroups: [salgadoFlavor("sabor-pao-forno", ["Pizza", "Frango com Catupiry"])]
  },
  {
    id: "acai-300ml",
    categoryId: "acai",
    name: "Copo 300ml",
    description: "Direito a 2 acompanhamentos + banana + cobertura.",
    ingredients: ["Acai", "Banana", "Cobertura", "2 acompanhamentos"],
    price: 10.8,
    image: images.acai,
    optionGroups: [acaiCompanions(2), acaiCover]
  },
  {
    id: "acai-400ml",
    categoryId: "acai",
    name: "Copo 400ml",
    description: "Direito a 3 acompanhamentos + banana + cobertura.",
    ingredients: ["Acai", "Banana", "Cobertura", "3 acompanhamentos"],
    price: 15.4,
    image: images.acai,
    optionGroups: [acaiCompanions(3), acaiCover],
    featured: true
  },
  {
    id: "acai-500ml",
    categoryId: "acai",
    name: "Embalagem 500ml",
    description: "Direito a 4 acompanhamentos + banana + cobertura.",
    ingredients: ["Acai", "Banana", "Cobertura", "4 acompanhamentos"],
    price: 20,
    image: images.acai,
    optionGroups: [acaiCompanions(4), acaiCover]
  },
  {
    id: "acai-700ml",
    categoryId: "acai",
    name: "Embalagem 700ml",
    description: "Direito a 6 acompanhamentos + banana + cobertura.",
    ingredients: ["Acai", "Banana", "Cobertura", "6 acompanhamentos"],
    price: 24.9,
    image: images.acai,
    optionGroups: [acaiCompanions(6), acaiCover]
  },
  {
    id: "salsichao",
    categoryId: "espetinhos",
    name: "Salsichao",
    description: "Espetinho de salsichao.",
    ingredients: ["Salsichao"],
    price: 7.99,
    image: images.skewer
  },
  {
    id: "espetinho-frango",
    categoryId: "espetinhos",
    name: "Frango",
    description: "Espetinho de frango.",
    ingredients: ["Frango"],
    price: 12.99,
    image: images.skewer
  },
  {
    id: "espetinho-carne",
    categoryId: "espetinhos",
    name: "Carne",
    description: "Espetinho de carne.",
    ingredients: ["Carne"],
    price: 15.99,
    image: images.skewer,
    featured: true
  },
  {
    id: "carne-sol-queijo",
    categoryId: "espetinhos",
    name: "Carne de Sol c/ Queijo",
    description: "Espetinho de carne de sol com queijo.",
    ingredients: ["Carne de sol", "Queijo"],
    price: 18.99,
    image: images.skewer
  },
  {
    id: "frango-bacon",
    categoryId: "espetinhos",
    name: "Frango c/ Bacon",
    description: "Espetinho de frango com bacon.",
    ingredients: ["Frango", "Bacon"],
    price: 18.99,
    image: images.skewer
  },
  {
    id: "frango-queijo",
    categoryId: "espetinhos",
    name: "Frango c/ Queijo",
    description: "Espetinho de frango com queijo.",
    ingredients: ["Frango", "Queijo"],
    price: 18.99,
    image: images.skewer
  },
  {
    id: "costela-carneiro",
    categoryId: "espetinhos",
    name: "Costela de Carneiro",
    description: "Espetinho de costela de carneiro.",
    ingredients: ["Costela de carneiro"],
    price: 18.99,
    image: images.skewer
  },
  {
    id: "queijo-oregano-mel",
    categoryId: "espetinhos",
    name: "Queijo c/ Oregano e Mel",
    description: "Espetinho de queijo com oregano e mel.",
    ingredients: ["Queijo", "Oregano", "Mel"],
    price: 15.99,
    image: images.skewer
  },
  {
    id: "pao-alho",
    categoryId: "espetinhos",
    name: "Pao de Alho",
    description: "Pao de alho no espeto.",
    ingredients: ["Pao de alho"],
    price: 9.9,
    image: images.garlicBread
  },
  {
    id: "suco-fruta",
    categoryId: "bebidas",
    name: "Suco da Fruta",
    description: "Suco da fruta com escolha de tamanho.",
    ingredients: ["Suco da fruta"],
    price: 3.1,
    image: images.juice,
    optionGroups: [
      {
        id: "tamanho",
        name: "Escolha o tamanho",
        type: "single",
        required: true,
        options: [
          { id: "pequeno", name: "Pequeno", default: true },
          { id: "grande", name: "Grande", priceDelta: 3.05 }
        ]
      }
    ]
  },
  {
    id: "h2o",
    categoryId: "bebidas",
    name: "H2O",
    description: "H2O gelada.",
    ingredients: ["H2O"],
    price: 10.8,
    image: images.h2o
  },
  {
    id: "refrigerante",
    categoryId: "bebidas",
    name: "Refrigerante",
    description: "Refrigerante.",
    ingredients: ["Refrigerante"],
    price: 3.85,
    image: images.sodaCan
  },
  {
    id: "coca-cola-250ml",
    categoryId: "bebidas",
    name: "Coca-Cola 250ml",
    description: "Coca-Cola 250ml.",
    ingredients: ["Coca-Cola", "250ml"],
    price: 6.15,
    image: images.sodaCan
  },
  {
    id: "refrigerante-lata",
    categoryId: "bebidas",
    name: "Refrigerante Lata",
    description: "Refrigerante em lata.",
    ingredients: ["Refrigerante", "Lata"],
    price: 9.9,
    image: images.sodaCan
  },
  {
    id: "coca-cola-1l",
    categoryId: "bebidas",
    name: "Coca-Cola 1L",
    description: "Coca-Cola 1 litro.",
    ingredients: ["Coca-Cola", "1L"],
    price: 13.99,
    image: images.sodaCan
  },
  {
    id: "refrigerante-1l",
    categoryId: "bebidas",
    name: "Refrigerante 1L",
    description: "Refrigerante 1 litro.",
    ingredients: ["Refrigerante", "1L"],
    price: 12.99,
    image: images.sodaCan
  },
  {
    id: "guarana-amazonas",
    categoryId: "bebidas",
    name: "Guarana do Amazonas",
    description: "Guarana do Amazonas.",
    ingredients: ["Guarana do Amazonas"],
    price: 12.99,
    image: images.guaranaAmazonas
  },
  {
    id: "vitamina-acai",
    categoryId: "bebidas",
    name: "Vitamina de Acai",
    description: "Vitamina de acai.",
    ingredients: ["Acai"],
    price: 12.3,
    image: images.acai
  },
  {
    id: "guaracai",
    categoryId: "bebidas",
    name: "Guaracai",
    description: "Guaracai.",
    ingredients: ["Guarana", "Acai"],
    price: 15.4,
    image: images.acai
  },
  {
    id: "itaipava-550ml",
    categoryId: "bebidas",
    name: "Itaipava 550ml",
    description: "Itaipava 550ml.",
    ingredients: ["Itaipava", "550ml"],
    price: 10.99,
    image: images.beer
  },
  {
    id: "brahma-550ml",
    categoryId: "bebidas",
    name: "Brahma 550ml",
    description: "Brahma 550ml.",
    ingredients: ["Brahma", "550ml"],
    price: 12.99,
    image: images.beer
  },
  {
    id: "budweiser-473ml",
    categoryId: "bebidas",
    name: "Budweiser 473ml",
    description: "Budweiser 473ml.",
    ingredients: ["Budweiser", "473ml"],
    price: 12.99,
    image: images.beer
  },
  {
    id: "heineken-330ml",
    categoryId: "bebidas",
    name: "Heineken 330ml",
    description: "Heineken 330ml.",
    ingredients: ["Heineken", "330ml"],
    price: 15.99,
    image: images.beerBottle
  },
  {
    id: "alcatrao-1-4",
    categoryId: "bebidas",
    name: "Alcatrao 1/4",
    description: "Alcatrao 1/4.",
    ingredients: ["Alcatrao", "1/4"],
    price: 15.99,
    image: images.alcatrao
  }
];
