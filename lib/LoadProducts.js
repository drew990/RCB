export async function loadProducts() {
  const res = await fetch('www.rcbrilliance.com/api/productsSqu');
  const data = await res.json();

  return data;
}
