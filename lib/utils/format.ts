export const formatIDR = (price: number) => {
  return "Rp" + price.toLocaleString("id-ID");
};

export const formatIDRWithSpace = (price: number) => {
  return "Rp " + price.toLocaleString("id-ID");
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};
