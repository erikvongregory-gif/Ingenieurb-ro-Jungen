/**
 * Rendert ein oder mehrere JSON-LD-Objekte als <script type="application/ld+json">.
 * In Server Components verwendbar. Beispiel:
 *
 *   <JsonLd data={[organizationSchema(locale), websiteSchema(locale)]} />
 */
type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON.stringify ist hier sicher: kontrollierte, serverseitige Daten.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
