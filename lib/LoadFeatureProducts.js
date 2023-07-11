export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.rcbrilliance.com/';

  return base_url;
};

export async function loadFeatureProducts() {
  const res = await fetch(checkEnvironment().concat('/api/featureProducts'));
  const data = await res.json();

  return data;
}
