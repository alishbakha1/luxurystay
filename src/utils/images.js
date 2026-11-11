// Finds every image in src/assets/images automatically.
// A missing file never breaks the app — it falls back to a placeholder.
const modules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const imageMap = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split('/').pop(), url]),
)

const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1067">
    <rect width="1600" height="1067" fill="#dde4ef"/>
    <text x="800" y="545" font-family="Georgia,serif" font-size="56" fill="#8ca1c3" text-anchor="middle">LuxuryStay</text>
    <text x="800" y="600" font-family="Arial,sans-serif" font-size="22" letter-spacing="8" fill="#b08d52" text-anchor="middle">HOSPITALITY</text>
  </svg>`,
)}`

export const hasImage = (name) => Object.hasOwn(imageMap, name)
export const getImage = (name) => (hasImage(name) ? imageMap[name] : PLACEHOLDER)

export function getImages(names = []) {
  const found = names.filter(hasImage).map(getImage)
  return found.length ? found : [PLACEHOLDER]
}