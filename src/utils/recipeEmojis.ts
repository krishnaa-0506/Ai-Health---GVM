export const getRecipeEmoji = (recipeName: string, category: string, region?: string): string => {
  const name = recipeName.toLowerCase();
  
  // Specific recipe mappings
  if (name.includes('butter chicken') || name.includes('chicken curry')) return '🍛';
  if (name.includes('dal') || name.includes('lentil')) return '🍲';
  if (name.includes('biryani')) return '🍚';
  if (name.includes('dosa') || name.includes('uttapam')) return '🥞';
  if (name.includes('idli')) return '⚪';
  if (name.includes('samosa')) return '🥟';
  if (name.includes('naan') || name.includes('roti') || name.includes('paratha')) return '🫓';
  if (name.includes('paneer')) return '🧀';
  if (name.includes('fish')) return '🐟';
  if (name.includes('chicken') && !name.includes('curry')) return '🍗';
  if (name.includes('mutton') || name.includes('lamb')) return '🥩';
  if (name.includes('rice')) return '🍚';
  if (name.includes('kheer') || name.includes('pudding')) return '🍮';
  if (name.includes('gulab jamun')) return '🍮';
  if (name.includes('jalebi')) return '🌀';
  if (name.includes('rasgulla')) return '⚪';
  if (name.includes('sambar')) return '🍜';
  if (name.includes('rasam')) return '🍅';
  if (name.includes('vada')) return '🍩';
  if (name.includes('dhokla')) return '🟡';
  if (name.includes('pani puri') || name.includes('golgappa')) return '🫧';
  if (name.includes('bhel puri')) return '🥗';
  if (name.includes('vada pav')) return '🍔';
  if (name.includes('chole')) return '🫘';
  if (name.includes('rajma')) return '🫘';
  if (name.includes('aloo') && name.includes('gobi')) return '🥔';
  if (name.includes('palak')) return '🥬';
  if (name.includes('saag')) return '🥬';
  if (name.includes('tikka')) return '🍢';
  if (name.includes('kebab')) return '🍢';
  if (name.includes('tandoori')) return '🍗';
  if (name.includes('korma')) return '🍛';
  if (name.includes('vindaloo')) return '🌶️';
  if (name.includes('masala')) return '🌶️';
  
  // Category-based mappings
  switch (category.toLowerCase()) {
    case 'breakfast':
      return '🌅';
    case 'main course':
      return '🍽️';
    case 'dessert':
      return '🍰';
    case 'snacks':
      return '🍿';
    case 'street food':
      return '🛒';
    case 'bread':
      return '🍞';
    case 'soup':
      return '🍲';
    default:
      break;
  }
  
  // Region-based mappings
  switch (region?.toLowerCase()) {
    case 'north indian':
      return '🏔️';
    case 'south indian':
      return '🥥';
    case 'bengali':
      return '🐟';
    case 'gujarati':
      return '🟡';
    case 'punjabi':
      return '🌾';
    case 'maharashtrian':
      return '🌶️';
    default:
      return '🍛';
  }
};

export default getRecipeEmoji;