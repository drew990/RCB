export async function loadFeatureProducts() {
  const res = await fetch('www.rcbrilliance.com/api/featureProducts');
  const data = await res.json();

  return data;
}
