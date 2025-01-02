import { test } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';
import {
  CANONICAL_URL,
  URL,
  META_DESCRIPTION,
  TITLE,
  GENRE,
} from '../../data/homepageSEO.data';

test('Homepage - SEO', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.SEOPage().VerifyGlobalSEOValues(
    CANONICAL_URL,
    URL,
    META_DESCRIPTION,
    TITLE,
    GENRE);
});
