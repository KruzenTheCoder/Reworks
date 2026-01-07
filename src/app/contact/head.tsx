const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://reworkssolutions.com'

export default function Head() {
  return (
    <>
      <title>Contact — Book a Call | ReWorks Solutions</title>
      <meta
        name="description"
        content="Book a call to hire vetted, native English-speaking professionals with proactive management and support. Get started today."
      />
      <link rel="canonical" href={`${SITE_URL}/contact`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Contact — Book a Call | ReWorks Solutions" />
      <meta property="og:description" content="Hire vetted professionals with proactive management and support. Book a call." />
      <meta property="og:url" content={`${SITE_URL}/contact`} />
    </>
  );
}
