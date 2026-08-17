export const STORE = {
  name: 'YousefCreationz',
  whatsappDisplay: '0758 704 993',
  whatsappIntl: '256758704993',
  city: 'Kampala, Uganda',
  imageOrigin: 'https://youseffcreationz-8dnzo8xl6-peter-wachas-projects-776b8503.vercel.app'
};

export const PRODUCTS = [
  ['sky-linen-look','Sky Linen Look','Complete Looks',165000,'sky-linen-look.jpeg','Style edit'],
  ['monochrome-knit','Monochrome Knit Set','Complete Looks',175000,'monochrome-knit.jpeg',''],
  ['terracotta-set','Terracotta Weekend Set','Complete Looks',170000,'terracotta-set.jpeg',''],
  ['sand-quarterzip','Sand Quarter-Zip Set','Complete Looks',185000,'sand-quarterzip.jpeg','New in'],
  ['neutral-daywear','Neutral Daywear Set','Complete Looks',155000,'neutral-daywear.jpeg',''],
  ['burgundy-set','Burgundy Resort Set','Complete Looks',165000,'burgundy-set.jpeg',''],
  ['black-white','Black & White Occasion Set','Complete Looks',175000,'black-white.jpeg',''],
  ['patterned-knit','Patterned Knit Set','Complete Looks',170000,'patterned-knit.jpeg',''],
  ['amber-linen','Amber Linen Set','Complete Looks',160000,'amber-linen.jpeg',''],
  ['black-joggers','Black Utility Jogger','Trousers',95000,'black-joggers.jpeg','Best seller'],
  ['stone-cargo','Stone Cargo Jogger','Trousers',105000,'stone-cargo.jpeg',''],
  ['navy-joggers','Navy Everyday Jogger','Trousers',90000,'navy-joggers.jpeg',''],
  ['congo-jersey','Congo Heritage Jersey','Jerseys',85000,'congo-jersey.jpeg','Limited look'],
  ['briefs-navy','Boxed Briefs — Navy Edit','Underwear',65000,'briefs-navy.jpeg',''],
  ['briefs-blue','Boxed Briefs — Blue Edit','Underwear',65000,'briefs-blue.jpeg',''],
  ['briefs-plum','Boxed Briefs — Plum Edit','Underwear',65000,'briefs-plum.jpeg',''],
  ['briefs-teal','Boxed Briefs — Teal Edit','Underwear',65000,'briefs-teal.jpeg',''],
  ['briefs-sand','Boxed Briefs — Sand Edit','Underwear',65000,'briefs-sand.jpeg',''],
  ['briefs-green','Boxed Briefs — Green Edit','Underwear',65000,'briefs-green.jpeg','']
].map(([id,name,category,price,image,badge])=>({id,name,category,price,image:`/api/product-image?file=${encodeURIComponent(image)}`,badge,inStock:true}));
