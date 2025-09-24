import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  jsonLd?: Record<string, unknown>;
}

const SEO = ({ title, description, canonicalPath, jsonLd }: SEOProps) => {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    if (canonicalPath) {
      const url = `${window.location.origin}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }

    let script = document.getElementById('jsonld') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script') as HTMLScriptElement;
        script.id = 'jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, canonicalPath, jsonLd]);

  return null;
};

export default SEO;
