export const Types = ['Regular Article', 'Listicle', 'Buying Guide', 'YMM Review'];
export const Roles = ['Writer', 'Photographer', 'Videographer', 'Illustrator'];
export const randomType = Types[Math.floor(Math.random() * Types.length)];
export const randomRole = Roles[Math.floor(Math.random() * Roles.length)];
export const randomData = {
  type: randomType,
  role: randomRole,
};

export const testData = {
  author: 'QA Automation',
  title: 'CMS Auto test - Test page',
  previewTitle: 'CMS Auto test - Preview page',
  publishTitle: 'CMS Auto test - Publish page',
  scheduleTitle: 'CMS Auto test - Schedule page',
  subtitle: 'Lots of V-Series Blackwing owners track their cars. Cadillac’s new Precision Package of chassis hardware and software mods is for them.',
  body: 'These days it’s common that high-performance “race” versions of cars are stuffed away in climate-controlled garages and treated as collectibles or investments rather than the beat-the-crap-out-of-it track weapons they were designed to be. But back in the day this wasn’t the case, and track-prepped cars were commonly thrashed on the track. Go figure. Then again, we also drank out of garden hoses and participation trophies didn’t exist.\n',
  bold: 'This 1969 COPO Camaro is one of these later examples. The Cortez Siver ’69 you see here was bought new from Huebner Chevrolet in Carrollton, Ohio, back on April 9, 1969, by Chalmer Nicholson. He bought it with the intention to drive it hard and the original 427 big-block bit the dust by July 2, 1969, with a scant 1,804 miles on the odometer! That blown mill was replaced, under warranty, with a “counter exchange” 427 engine soon afterwards.\n',
  italic: 'Rumor was the car was sold and sent off to live in California, but it was actually just squirreled away in a barn until Nicholson passed away. After his passing the Camaro was sold by the estate and now belongs to Makovich.\n',
  underline: 'The original owner kept the owner’s manual, Protect-O-Plate, Ohio registration, and a stack of receipts with the car along with items such as the original spare tire. As you can see by the documentation the X11 car had a build date of 03E, an interior color code of 711, and a paint code of 69.\n',
  strike: 'The plan is to make the Camaro as correct as possible but leave it in survivor condition. Makovich also plans on putting many miles on the forgotten COPO. “Too many people that own COPO Camaros don’t enjoy them. I plan to drive and enjoy this car to the fullest!” Makovich remarked.\n',
  numbered: 'Numbered list test 1\n Numbered list test 2\n Numbered list test 3\n',
  bullet: 'Bulleted list test 1\n Bulleted list test 2\n Bulleted list test 3\n',
  taxonomies: 'news/news',
  contributor: 'Alexander Stoklosa',
};

export const regularArticle = {
  author: 'QA Automation',
  title: 'CMS Auto test - Regular Article',
  subtitle: 'Regular article subtitle',
  body: 'These days it\’s common that high-performance “race” versions of cars are stuffed away in climate-controlled garages and treated as collectibles or investments rather than the beat-the-crap-out-of-it track weapons they were designed to be. But back in the day this wasn’t the case, and track-prepped cars were commonly thrashed on the track. Go figure. Then again, we also drank out of garden hoses and participation trophies didn’t exist.\n' +
    'This 1969 COPO Camaro is one of these later examples. The Cortez Siver ’69 you see here was bought new from Huebner Chevrolet in Carrollton, Ohio, back on April 9, 1969, by Chalmer Nicholson. He bought it with the intention to drive it hard and the original 427 big-block bit the dust by July 2, 1969, with a scant 1,804 miles on the odometer! That blown mill was replaced, under warranty, with a “counter exchange” 427 engine soon afterwards. \n' +
    'Rumor was the car was sold and sent off to live in California, but it was actually just squirreled away in a barn until Nicholson passed away. After his passing the Camaro was sold by the estate and now belongs to Makovich.\n' +
    'The original owner kept the owner’s manual, Protect- O - Plate, Ohio registration, and a stack of receipts with the car along with items such as the original spare tire.As you can see by the documentation the X11 car had a build date of 03E, an interior color code of 711, and a paint code of 69.\n' +
    'The plan is to make the Camaro as correct as possible but leave it in survivor condition.Makovich also plans on putting many miles on the forgotten COPO. “Too many people that own COPO Camaros don’t enjoy them.I plan to drive and enjoy this car to the fullest!” Makovich remarked.\n',
  taxonomies: 'news/events',
  contributor: 'John Hsu',
};

export const listicleArticle = {
  author: 'QA Automation',
  title: 'CMS Auto test - Listicle Article',
  subtitle: 'Listicle article subtitle',
  body: 'These days it\’s common that high-performance “race” versions of cars are stuffed away in climate-controlled garages and treated as collectibles or investments rather than the beat-the-crap-out-of-it track weapons they were designed to be. But back in the day this wasn’t the case, and track-prepped cars were commonly thrashed on the track. Go figure. Then again, we also drank out of garden hoses and participation trophies didn’t exist.\n' +
    'This 1969 COPO Camaro is one of these later examples. The Cortez Siver ’69 you see here was bought new from Huebner Chevrolet in Carrollton, Ohio, back on April 9, 1969, by Chalmer Nicholson. He bought it with the intention to drive it hard and the original 427 big-block bit the dust by July 2, 1969, with a scant 1,804 miles on the odometer! That blown mill was replaced, under warranty, with a “counter exchange” 427 engine soon afterwards. \n' +
    'Rumor was the car was sold and sent off to live in California, but it was actually just squirreled away in a barn until Nicholson passed away. After his passing the Camaro was sold by the estate and now belongs to Makovich.\n' +
    'The original owner kept the owner’s manual, Protect- O - Plate, Ohio registration, and a stack of receipts with the car along with items such as the original spare tire.As you can see by the documentation the X11 car had a build date of 03E, an interior color code of 711, and a paint code of 69.\n' +
    'The plan is to make the Camaro as correct as possible but leave it in survivor condition.Makovich also plans on putting many miles on the forgotten COPO. “Too many people that own COPO Camaros don’t enjoy them.I plan to drive and enjoy this car to the fullest!” Makovich remarked.\n',
  taxonomies: 'news/events',
  contributor: 'Lisa Gove',
};

export const buyingGuideArticle = {
  author: 'QA Automation',
  title: 'CMS Auto test - Buying Guide Article',
  subtitle: 'Buying Guide article subtitle',
  body: 'These days it\’s common that high-performance “race” versions of cars are stuffed away in climate-controlled garages and treated as collectibles or investments rather than the beat-the-crap-out-of-it track weapons they were designed to be. But back in the day this wasn’t the case, and track-prepped cars were commonly thrashed on the track. Go figure. Then again, we also drank out of garden hoses and participation trophies didn’t exist.\n' +
    'This 1969 COPO Camaro is one of these later examples. The Cortez Siver ’69 you see here was bought new from Huebner Chevrolet in Carrollton, Ohio, back on April 9, 1969, by Chalmer Nicholson. He bought it with the intention to drive it hard and the original 427 big-block bit the dust by July 2, 1969, with a scant 1,804 miles on the odometer! That blown mill was replaced, under warranty, with a “counter exchange” 427 engine soon afterwards. \n' +
    'Rumor was the car was sold and sent off to live in California, but it was actually just squirreled away in a barn until Nicholson passed away. After his passing the Camaro was sold by the estate and now belongs to Makovich.\n' +
    'The original owner kept the owner’s manual, Protect- O - Plate, Ohio registration, and a stack of receipts with the car along with items such as the original spare tire.As you can see by the documentation the X11 car had a build date of 03E, an interior color code of 711, and a paint code of 69.\n' +
    'The plan is to make the Camaro as correct as possible but leave it in survivor condition.Makovich also plans on putting many miles on the forgotten COPO. “Too many people that own COPO Camaros don’t enjoy them.I plan to drive and enjoy this car to the fullest!” Makovich remarked.\n',
  taxonomies: 'how-to/how-to',
  contributor: 'Jesse Bishop',
};

export const ymmArticle = {
  author: 'QA Automation',
  title: 'CMS Auto test - YMM Article',
  subtitle: 'YMM article subtitle',
  body: 'These days it\’s common that high-performance “race” versions of cars are stuffed away in climate-controlled garages and treated as collectibles or investments rather than the beat-the-crap-out-of-it track weapons they were designed to be. But back in the day this wasn’t the case, and track-prepped cars were commonly thrashed on the track. Go figure. Then again, we also drank out of garden hoses and participation trophies didn’t exist.\n' +
    'This 1969 COPO Camaro is one of these later examples. The Cortez Siver ’69 you see here was bought new from Huebner Chevrolet in Carrollton, Ohio, back on April 9, 1969, by Chalmer Nicholson. He bought it with the intention to drive it hard and the original 427 big-block bit the dust by July 2, 1969, with a scant 1,804 miles on the odometer! That blown mill was replaced, under warranty, with a “counter exchange” 427 engine soon afterwards. \n' +
    'Rumor was the car was sold and sent off to live in California, but it was actually just squirreled away in a barn until Nicholson passed away. After his passing the Camaro was sold by the estate and now belongs to Makovich.\n' +
    'The original owner kept the owner’s manual, Protect- O - Plate, Ohio registration, and a stack of receipts with the car along with items such as the original spare tire.As you can see by the documentation the X11 car had a build date of 03E, an interior color code of 711, and a paint code of 69.\n' +
    'The plan is to make the Camaro as correct as possible but leave it in survivor condition.Makovich also plans on putting many miles on the forgotten COPO. “Too many people that own COPO Camaros don’t enjoy them.I plan to drive and enjoy this car to the fullest!” Makovich remarked.\n',
  taxonomies: 'news/events',
  contributor: 'Mike Floyd',
};
