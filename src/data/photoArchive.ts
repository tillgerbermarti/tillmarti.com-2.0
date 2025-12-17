// Photo Archive Configuration
// Analog photography archive - film scans with scan codes

export interface Photo {
  id: string;
  url: string;
  title?: string;
  location?: string;
  year?: string;
}

// List of all analog photography filenames in /public/images/photography-archive/
const photoFilenames: string[] = [
  '000001030007.webp',
  '000009060002.webp',
  '000009060003.webp',
  '000009060004.webp',
  '000010430001.webp',
  '000015520003.webp',
  '000015520011.webp',
  '000015520053.webp',
  '000015530005.webp',
  '000015530008.webp',
  '000035180005.webp',
  '000035180006.webp',
  '000038840005.webp',
  '000042540029.webp',
  '000042540030.webp',
  '000042540034.webp',
  '000042540036.webp',
  '000064260001.webp',
  '000064260002.webp',
  '000064260004.webp',
  '000087550003.webp',
  '000087550015.webp',
  '000087550021.webp',
  '000087550032.webp',
  '000087910001.webp'
];

// Auto-generate photo objects from filenames
export const generatePhotoArchive = (): Photo[] => {
  return photoFilenames.map((filename, index) => ({
    id: `photo-${index + 1}`,
    url: `/images/photography-archive/${filename}`,
    title: filename.replace('.webp', ''),
    location: 'Film Archive'
  }));
};