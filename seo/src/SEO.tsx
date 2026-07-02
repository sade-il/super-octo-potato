// קומפוננטת SEO לעמודים שונים באתר (Vite + React + React Router)
// ===================================================================
// באתר מסוג SPA (כמו אתרי Lovable) כל העמודים חולקים את אותו index.html,
// ולכן לכל עמוד יש אותה כותרת ותיאור — וזה פוגע ב-SEO.
// הקומפוננטה הזו מאפשרת לתת לכל עמוד כותרת ותיאור משלו.
//
// התקנה (פעם אחת) בתוך פרויקט Lovable / Vite:
//   npm install react-helmet-async
//
// ואז בקובץ הראשי (src/main.tsx) עוטפים את האפליקציה:
//
//   import { HelmetProvider } from "react-helmet-async";
//   createRoot(document.getElementById("root")!).render(
//     <HelmetProvider>
//       <App />
//     </HelmetProvider>
//   );
//
// שימוש בתוך כל עמוד:
//   import { SEO } from "@/components/SEO";
//   <SEO
//     title="אודות — שם העסק"
//     description="תיאור ייחודי לעמוד הזה."
//     path="/about"
//   />

import { Helmet } from "react-helmet-async";

const SITE_URL = "https://sade-il.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOProps {
  /** כותרת העמוד (50–60 תווים) */
  title: string;
  /** תיאור העמוד (150–160 תווים) */
  description: string;
  /** הנתיב היחסי של העמוד, למשל "/about". ברירת מחדל: דף הבית */
  path?: string;
  /** תמונת שיתוף מלאה (URL). ברירת מחדל: og-image.jpg */
  image?: string;
  /** האם להסתיר את העמוד ממנועי החיפוש */
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
}: SEOProps) {
  const url = new URL(path || "/", SITE_URL).toString();

  return (
    <Helmet>
      <html lang="he" dir="rtl" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="he_IL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
