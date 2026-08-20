export const STORE = {
  name: 'YousefCreationz',
  whatsappDisplay: '0758 704 993',
  whatsappIntl: '256758704993',
  city: 'Kampala, Uganda',
  logo: '/yousef-logo-reversed-v3.png'
};

const driveImage = id => `/api/product-image?id=${encodeURIComponent(id)}`;

export const PRODUCTS = [
  {id:'classic-polos',name:'Classic Polo Shirts',category:'Polos',price:50000,image:driveImage('1HCB3D55HwiceTPe2i5c1dOOuShTTRIlZ'),badge:'New colours',desc:'Short-sleeve polo shirts in a wide range of colours. Confirm available size and colour before payment.'},
  {id:'smart-polo',name:'Smart Casual Polo',category:'Polos',price:50000,image:driveImage('1c5kIJpqxfwQE-9i7tAc8ClnnIVo2zf88'),badge:'Fresh drop',desc:'Clean polo styling for everyday and smart-casual wear.'},
  {id:'summer-polos',name:'Summer Colour Polo',category:'Polos',price:50000,image:driveImage('1sFD_Af4TzrwIGHqcJ3ug78ntZfYCc6ds'),badge:'',desc:'Bright seasonal polo colours for relaxed Kampala days.'},
  {id:'everyday-tee',name:'Everyday T-Shirts',category:'T-Shirts',price:50000,image:driveImage('1_kuul9XwT1Q3QRdDyofyubfTD_XW2nn7'),badge:'UGX 50K',desc:'Easy everyday tees in multiple colours. Ask for current size and colour options.'},
  {id:'linen-trousers',name:'Linen Drawstring Trousers',category:'Trousers',price:80000,image:driveImage('15S0nzHt8RVYgFwH4r1uwxVyt97KNcZUt'),badge:'UGX 80K',desc:'Lightweight linen-style drawstring trousers in neutral colours.'},
  {id:'white-linen-look',name:'White Linen Trouser Look',category:'Trousers',price:80000,image:driveImage('1ir4pOaEm37EGQfGx5eFjCMdKopeG0rK3'),badge:'',desc:'White linen trouser shown styled with a navy polo and sandals. Price shown is for the trouser.'},
  {id:'olive-linen-look',name:'Olive Linen Trouser Look',category:'Trousers',price:80000,image:driveImage('1M2OlKxCfv2XYe5RqYPOmOQGMPF2NCsAJ'),badge:'',desc:'Olive linen trouser styled with a white polo. Price shown is for the trouser.'},
  {id:'tailored-shorts',name:'Tailored Casual Shorts',category:'Shorts',price:50000,image:driveImage('1OUkzXSMqa8loAqBL7_oOJOJXDh5uopBx'),badge:'UGX 50K',desc:'Casual shorts in versatile colours. Confirm size and exact colour on WhatsApp.'},
  {id:'navy-shorts',name:'Navy Casual Shorts',category:'Shorts',price:50000,image:driveImage('1NXu6RW9QQNvvx5VnBT0hZaiXC54NTEpN'),badge:'',desc:'Navy shorts styled with a pink polo and sandals. Price shown is for the shorts.'},
  {id:'sandals',name:'Men’s Sandals',category:'Sandals',price:150000,image:driveImage('1lEh5HeBiMlYRiOGOldIBThqty0WOytvj'),badge:'UGX 150K',desc:'Statement men’s sandals. Confirm current colours and sizes before payment.'},
  {id:'cream-knit',name:'Textured Knit Polo',category:'Knitwear',price:null,image:driveImage('1HgFj9USSa5Sp5nIZsrMAPnF9XierFowx'),badge:'Ask price',desc:'Textured knit polo available in several stripe colourways.'},
  {id:'button-knit',name:'Textured Button Knit',category:'Knitwear',price:null,image:driveImage('1eI_gg_MxyGloL_FP2_mjgjOnReX152Mf'),badge:'',desc:'Premium textured short-sleeve knit with contrast trim.'},
  {id:'quarter-zip-knit',name:'Quarter-Zip Knit',category:'Knitwear',price:null,image:driveImage('1Doi8NKAzMVWBzi5CYZQQmc6S0h1oo0nZ'),badge:'',desc:'Smart quarter-zip knit tops in neutral and muted colours.'},
  {id:'stripe-zip-knit',name:'Striped Zip Knit',category:'Knitwear',price:null,image:driveImage('158SOYMVl6DmaZRDg8z203ZO_4Zye2J6v'),badge:'',desc:'Striped zip-neck knit tops for smart casual styling.'},
  {id:'orange-look',name:'Orange Polo Styled Look',category:'Styled Looks',price:null,image:driveImage('1qBgOurERYFPYLVLk7SSfyXJhumC8h3qz'),badge:'Shop the look',desc:'Orange polo, light trousers and sandals shown together. Ask WhatsApp for the price of each piece.'},
  {id:'black-look',name:'Black Polo Styled Look',category:'Styled Looks',price:null,image:driveImage('1_-KiyNtgjAYbHA4kYvKHwbG06s3TlQsB'),badge:'',desc:'Black polo, grey shorts and sandals. Order pieces individually or ask for the complete look.'},
  {id:'white-look',name:'White Polo Styled Look',category:'Styled Looks',price:null,image:driveImage('118bbF1HIDlpQExB-VjO56NQI8025Tmqm'),badge:'',desc:'White polo with dark trousers and sandals. Ask for current availability and item prices.'},
  {id:'rust-look',name:'Rust Shirt Weekend Look',category:'Styled Looks',price:null,image:driveImage('1wmoIX03GNXxFPEpcTGndK172tHhrBQqa'),badge:'',desc:'A coordinated rust shirt, grey trouser and footwear look for smart weekends.'},
  {id:'monochrome-look',name:'Monochrome Smart Look',category:'Styled Looks',price:null,image:driveImage('1KdTey4vLB8LmH2309cKf0v48giFjc-3z'),badge:'',desc:'Patterned shirt with black trousers and black footwear.'},
  {id:'orange-smart-look',name:'Orange Polo Smart Look',category:'Styled Looks',price:null,image:driveImage('1ZwWIawoR0omW7YULb45O9H9BV_Xr8kq3'),badge:'',desc:'Orange polo paired with neutral trousers and loafers.'}
].map(product=>({...product,inStock:true}));
